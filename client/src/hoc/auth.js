import React, {useEffect} from 'react';
import { Axios } from 'axios';
import { useDispatch } from 'react-redux';
import {auth} from '../_actions/user_actions';
import { Navigate } from 'react-router-dom';
 
export default function (SpecificComponent, option, adminRoute=null){
    //null = 아무나 출입 가능
    //true = 로그인한 유저만 출입 가능
    //false = 로그인한 유저는 출입 불가능
    function AuthenticationCheck(props){
        const dispatch= useDispatch();
        useEffect(()=>{
            
            dispatch(auth()).then(response=>{
                //로그인 안한 상태
                if(!response.payload.isAuth){
                    if(option)
                        Navigate('/login')
                }else{
                //로그인한 상태
                    if(adminRoute && !response.payload.isAdmin){
                        Navigate('/')
                    }else{
                        if(option==false){
                            Navigate('/')
                        }
                    
                    }
                }
            })
        }, [])
        return(
            <SpecificComponent/>
        )
    }
    return AuthenticationCheck
}