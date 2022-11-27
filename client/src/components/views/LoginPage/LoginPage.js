import React,{useState} from 'react';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { loginUser } from '../../../_actions/user_actions.js';
import styled from 'styled-components';

const Loginbutton=styled.button`
    background-color: #79CEE1;
    color: #ffffff;
    border-radius: 5px;
    height: 40px;
    width: 150px;
    justifyContent: 'center';
    border-width: 0;
    font-weight: bold;
`;
const LoginInput=styled.input`
    border: 2px solid lightgray;
    border-radius: 5px;
    height: 30px;
    width: 170px;
`;
const LoginLabel=styled.label`
    color: #79CEE1;
    font-weight: bold;
`;

function LoginPage(props){
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler=(event)=>{
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler=(event)=>{
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler=(event)=>{
        event.preventDefault();

        let body={
            email: Email,
            password: Password
        }
        dispatch(loginUser(body))
            .then(response=>{
                if(response.payload.loginSuccess){
                    navigate('/')
                }else{
                    alert('Error')
                }
            })

        Axios.post('/api/users/login',body)
        .then(response=>{

        })
    }

    return (
        <div style={{
            display:'flex', justifyContent: 'center', alignItems:'center',alignContent:'center',
            width: '100%', height:'100vh', backgroundColor:'#ececec'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems:'center', 
                width: '460px', 
                backgroundColor:'#ffffff', 
                height:'400px',
                borderRadius:'20px'}}>
                <form style={{display:'flex', flexDirection:'column',justifyContent: 'center', alignItems:'center'}}
                onSubmit={onSubmitHandler}>
                    <h1>폼페이</h1>
                    <LoginLabel>이메일</LoginLabel>
                    <LoginInput type="text" value={Email} onChange={onEmailHandler}/>
                    <br/>
                    <LoginLabel>패스워드</LoginLabel>
                    <LoginInput type="password" value={Password} onChange={onPasswordHandler}/>
                    <br/>
                    <Loginbutton type="submit">
                        로그인
                    </Loginbutton>
                </form>
            </div>
        </div>
    )
}

export default LoginPage