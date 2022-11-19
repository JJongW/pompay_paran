const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { nextTick } = require('process');
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
        maxlength: 12
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

userSchema.pre("save"),function(next){
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
        })
    })
    }else{
        next();
    }
}
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
    var token = jwt.sign(user._id, 'secretToken')
    //user._id+'secretToken'= token
    user.token= token
    user.save(function(err,user){
        if(err)return cb(err);
        cb(null, user)
    })
}

const User = mongoose.model('User',userSchema)

module.exports={User}