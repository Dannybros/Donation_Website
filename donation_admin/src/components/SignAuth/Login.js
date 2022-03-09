import React, {useState} from 'react'
import './login.scss'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from '../backendSiteName'
import {useHistory} from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import {Button, CircularProgress } from "@material-ui/core";

function Login() {

    const history = useHistory();

    const [t]= useTranslation('translation');

    const initials = {username:"", password:""}
    const [showPass, setShowPass] = useState(false);
    const [btnLoadng, setBtnLoading] = useState(false);
    const [formData, setFormData] = useState(initials);

    const handleOnChange=(e)=>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const AuthUser =async(e)=>{
        e.preventDefault();
      
        setBtnLoading(true)

        if(formData.username==="" || formData.password===""){
            alert("please fill in every field")
            setBtnLoading(false)
        }else{
            await axios.post('/signIn', formData)
            .then(res=>{
                localStorage.setItem('AuthToken', res.data.token);
                history.replace('/Home')
            })
            .catch((error)=>{
                alert(`Error Please connect to Internet`)
            })
            setBtnLoading(false)
        }

    }

    return (
        <div className="login_page">

            <div className="bg-img"/>
            
            <div className="form-box">

                <h2>{t('sign.title')}</h2>

                <form>
                    <input type="text" placeholder={t('sign.username')} name="username" value={formData.username} onChange={handleOnChange}/>
                    
                    <div className="password-box">
                        
                        <input type={showPass?"text" : "password"} placeholder={t('sign.password')} name="password"
                         value={formData.password} onChange={handleOnChange}/>
                        
                        <div onClick={()=>setShowPass(!showPass)}>{showPass?<VisibilityOff/> : <Visibility/>}</div>
                    
                    </div>

                    <Button 
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={AuthUser}
                        disabled={btnLoadng}
                    >
                       {btnLoadng? <CircularProgress size={24} style={{color:'white'}}/> : <>{t('sign.button')}</>} 
                    </Button>

                </form>

            </div>

        </div>
    )
}

export default Login
