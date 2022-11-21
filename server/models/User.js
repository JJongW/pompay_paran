const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds=12;
const jwt = require('jsonwebtoken');
const { createVerify } = require('crypto');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true, //스페이스를 없애주는 역할
        unique: 1,
    },
    password: {
        type: String,
    },
    role:{
        type: Number,
        default: 0,
    },
    image: String,
    token:{
        type: String
    },
    tokenExp: {
        type: Number,
    },

})

userSchema.pre("save",function(next){
    var user = this;
    //패스워드가 변환될때만 비번을 암호화  
    if(user.isModified('password')){
    //비밀번호 암호화
    bcrypt.genSalt(saltRounds,function(err,salt){
        if(err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);
            user.password=hash;
            next();
        });
    });
    }else{
        next();
    }
});
userSchema.methods.comparePassword= function(plainPassword,cb){
    //plainPassword 1234567 암호화된 비밀번호
    bcrypt.compare(plainPassword, this.password,function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch)
    })
}
userSchema.methods.generateToken=function(cb){
    var user = this;
    // jsonwebtoken을 이용해서 token을 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    //user._id+'secretToken'= token
    user.token= token;
    user.save(function(err,user){
        if(err)return cb(err);
        cb(null, user)
    });
}

userSchema.statics.findByToken = function (token, cb){
    var user = this;
    //user._id + "" = token;
    jwt.verify(token, 'secretToken',function(err, decoded){
        //유저 아이디를 통해 유저를 찾기
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id":decoded, "token":token},function(err, user){
            if (err) return cb(err);
            cb(null, user)
        })
    });
}

const User = mongoose.model('User',userSchema)
module.exports={User}