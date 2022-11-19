const express = require('express');
const app = express();
const port=5000;

const config=require('./config/key');
const {User} = require("./models/User");
const bodyParser = require('body-parser');
//bodyParser는 client에서 받아오는 정보를 서버에서 분석해서 가져올 수 있게 해주는 용도
//apllication/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.listen(port, function(){console.log(`${port} listening on 5000.`)});

const mongoose=require('mongoose');
mongoose
    .connect(config.mongoURI,
        {
          //useNewUrlPaser: true,useUnifiedTofology: true,useCreateIndex: true,useFindAndModify: false,
        })
      .then(() => console.log('MongoDB conected.....'))
      .catch((err) => {
        console.log(err);});

app.get('/signup', function(req, res){
    res.sendFile(__dirname+'/signup.html');
});

app.post('/register',(req,res)=>{
    //회원가입시 필요한 정보들을 client에서 가져오면
    //이것들을 DB에 넣어준다.
    const user=new User(req.body)

    user.save((err,doc)=>{
        if(err) return res.json({success:false,err})
        return res.status(200).json({
            success:true
        })
    })
})

app.get('/', function(req, res){res.send('Hello!')});
//res.sendFile(__dirname+'/test2.html');