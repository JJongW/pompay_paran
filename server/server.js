const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const config=require('./config/key');
const {auth} = require("./middleware/auth");
const {User} = require("./models/User");
const bodyParser = require('body-parser');
//bodyParser는 client에서 받아오는 정보를 서버에서 분석해서 가져올 수 있게 해주는 용도
//apllication/x-www-form-urlencoded

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());


const mongoose=require('mongoose');
const { userInfo } = require('os');
const { equal } = require('assert');
mongoose
    .connect(config.mongoURI,
        {
          //useNewUrlPaser: true,
          //useUnifiedTofology: true,
          //useCreateIndex: true,
          //useFindAndModify: false,
        })
    .then(() => console.log('MongoDB conected.....'))
    .catch((err) => console.log(err));
/*
app.get('/api/users/signin', function(req, res){
   res.sendFile(__dirname+'/paran_login.html');
});
*/
//app.get('/', function(req, res){res.send('Hello~')});

app.get('/api/hello',function(req,res){
    res.send("안녕하세요~")})


app.post('/api/users/register',(req,res)=>{
    //회원가입시 필요한 정보들을 client에서 가져오면
    //이것들을 DB에 넣어준다.
    const user=new User(req.body)

    user.save((err,doc)=>{
        if(err) return res.json({success:false,err})
        return res.status(200).json({
            success:true
        });
    });
});

app.post('/api/users/login',(req,res)=>{
    
    //요청된 이메일을 데이터베이스에서 있는지 찾음
    User.findOne({email:req.body.email},(err,user)=>{
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "제공된 학번에 해당하는 유저가 없습니다."
            });
        }
        console.log(user);
    //이메일이 있다면 비번이 있는지 확인
        user.comparePassword(req.body.password , (err, isMatch)=>{
            if(!isMatch){
                return res.json({loginSuccess:false, message:"비밀번호가 틀렸습니다."})};
            //비밀번호까지 같다면 토큰 생성
            user.generateToken((err,user)=>{
                if(err) {return res.status(400).send(err)};
                // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
                res
                    .cookie("x_auth", user.token)
                    .status(200)
                    .json({loginSuccess: true, userId: user._id})
            })
        })
    })
})

app.get('/api/users/auth',auth,(req,res)=>{
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0? false:true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role:req.user.role
    })
})

app.get('/api/users/logout',auth,(req,res)=>{
    User.findOneAndUpdate({_id:req.user._id},
        {token:""},
        (err,user)=>{
            if (err) return res.json({success:false,err});
            return res.status(200).send({
                success: true
            })
        })
})
const PORT=5000;
app.listen(PORT, function(){console.log(`${PORT} listening on 5000.`)});