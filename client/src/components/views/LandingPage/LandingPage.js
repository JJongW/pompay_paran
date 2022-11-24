//import React, {useEffect} from 'react';
//import axios from 'axios';

import {useNavigate} from 'react-router-dom';
import {logoutUser} from '../../../_actions/user_actions';
import {useDispatch} from 'react-redux';

 
function LandingPage(){
    let navigate=useNavigate();
    const dispatch = useDispatch();
    const onClickHandler=()=>{
        dispatch(logoutUser())
        .then((response)=>{
            console.log(response);
            if(response.payload.success){
                navigate('/login')
            }else{
                alert('Failed to logout!')
            }
        }).catch((err)=>console.log(err))
    }
    return (
        <div style={{display: 'flex',
                    justifyContent:'center', 
                    alignItems: 'center',
                    width: '100%',
                    height:'100vh'}}>
            <h1>시작페이지</h1>
            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default LandingPage