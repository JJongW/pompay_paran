import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { registerUser } from '../../../_actions/user_actions.js';
import styled from 'styled-components';

const Registerbutton=styled.button`
    background-color: #79CEE1;
    color: #ffffff;
    border-radius: 5px;
    height: 40px;
    width: 150px;
    justifyContent: 'center';
    border-width: 0;
    font-weight: bold;
`;
const RegisterInput=styled.input`
    border: 2px solid lightgray;
    border-radius: 5px;
    height: 30px;
    width: 170px;
`;
const RegisterLabel=styled.label`
    color: #79CEE1;
    font-weight: bold;
`;


function RegisterPage(props){
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [Name, setName] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  const onEmailHandler=(event)=>{
    setEmail(event.currentTarget.value)
  }
  const onPasswordHandler=(event)=>{
    setPassword(event.currentTarget.value)
  }
  const onNameHandler=(event)=>{
    setName(event.currentTarget.value)
  }
  const onConfirmPasswordHandler=(event)=>{
    setConfirmPassword(event.currentTarget.value)
  }
  const onSubmitHandler=(event)=>{
      event.preventDefault();

      if(Password !== ConfirmPassword){
        return alert('비밀번호와 비밀번호 확인은 같아야합니다.')
      }

      let body={
          email: Email,
          password: Password,
          name: Name,
      }

      dispatch(registerUser(body))
          .then(response=>{
              if(response.payload.success){
                  navigate('/login')
              }else{
                  alert('Failed to signup')
              }
          })
  }

  return (
      <div style={{
          display:'flex', justifyContent: 'center', alignItems:'center',
          width: '100%', height:'100vh',backgroundColor:'#ececec'
      }}>
        <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems:'center', 
                width: '500px', 
                backgroundColor:'#ffffff', 
                height:'450px',
                borderRadius:'20px'}}>
          <form style={{display:'flex', flexDirection:'column',justifyContent: 'center', alignItems:'center'}}
          onSubmit={onSubmitHandler}>
            <h1>회원가입</h1>
            <RegisterLabel>이메일</RegisterLabel>
            <RegisterInput type="text" value={Email} onChange={onEmailHandler}/>
            <br/>
            <RegisterLabel>이름</RegisterLabel>
            <RegisterInput type="text" value={Name} onChange={onNameHandler}/>
            <br/>
            <RegisterLabel>패스워드</RegisterLabel>
            <RegisterInput type="password" value={Password} onChange={onPasswordHandler}/>
            <br/>
            <RegisterLabel>패스워드 확인</RegisterLabel>
            <RegisterInput type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
            <br/>
            <Registerbutton type="submit">
                회원가입
            </Registerbutton>
          </form>
          </div>
      </div>
  )
}

export default RegisterPage