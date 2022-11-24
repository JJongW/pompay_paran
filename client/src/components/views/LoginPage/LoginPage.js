import React,{useState} from 'react';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { loginUser } from '../../../_actions/user_actions.js';

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
            display:'flex', justifyContent: 'center', alignItems:'center',
            width: '100%', height:'100vh'
        }}>
            <form style={{display:'flex', flexDirection:'column'}}
            onSubmit={onSubmitHandler}>
                <label>이메일</label>
                <input type="text" value={Email} onChange={onEmailHandler}/>
                <label>패스워드</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <br/>
                <button type="submit">
                    로그인
                </button>
            </form>
        </div>
    )
}

export default LoginPage