import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { registerUser } from '../../../_actions/user_actions.js'

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
          width: '100%', height:'100vh'
      }}>
          <form style={{display:'flex', flexDirection:'column'}}
          onSubmit={onSubmitHandler}>
              <label>이메일</label>
              <input type="text" value={Email} onChange={onEmailHandler}/>
              <label>이름</label>
              <input type="text" value={Name} onChange={onNameHandler}/>
              <label>패스워드</label>
              <input type="password" value={Password} onChange={onPasswordHandler}/>
              <label>패스워드 확인</label>
              <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
              <br/>
              <button type="submit">
                  회원가입
              </button>
          </form>
      </div>
  )
}

export default RegisterPage