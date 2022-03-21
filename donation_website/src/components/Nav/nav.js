import React, {useState} from 'react'
import './nav.css'
import logo from '../../img/logo/logo3.png'
import ToggleButton from './SideBar/ToggleButton'
import SideBar from './SideBar/SideBar';
import Backdrop from './Backdrop/Backdrop';
import {useHistory, NavLink} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import { useStateValue } from '../../Reducer/StateProvider';

function Nav() {

    const history = useHistory();
    const [{language}, dispatch] = useStateValue();

    const {t, i18n} = useTranslation();
    const [isToggleOpen, setIsToggleOpen] = useState(false);

    const toggleHandler=()=>{
       setIsToggleOpen(!isToggleOpen);
    }
    const backHandler=()=>{
       setIsToggleOpen(false);
    }
    const changeLang=(e)=>{
        const lng = e.target.value;
        dispatch({
            type:'Set_Lang',
            lang: lng,
        });
        localStorage.setItem('lang', lng);
        i18n.changeLanguage(lng)
    }

    const goToAboutUs=()=>{
        localStorage.setItem('about', 'OverView')
    }

    const lang = localStorage.getItem('lang');

    return (
        <div className="nav">
            <img src={logo} className="logoImg" alt="logo" onClick={()=>history.replace('/')}/>
            <ul className="nav-list">
                <li>
                    <NavLink to="/Home" className="nav__li" activeClassName='active'>
                        {t('Home.nav.list1')}
                    </NavLink>
                    </li>
                <li onClick={goToAboutUs}>
                    <NavLink to="/aboutUs" className="nav__li" activeClassName='activeLink'>
                        {t('Home.nav.list2')}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/news" className="nav__li" activeClassName='activeLink'>
                        {t('Home.nav.list3')}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/discover" className="nav__li" activeClassName='activeLink'>
                        {t('Home.nav.list4')}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/Benefits" className="nav__li" activeClassName='activeLink'>
                        {t('Benefits.title')}
                    </NavLink>
                </li>
                
            </ul>
            <div className="LangSelector-box" key ={language}>
                <select className="LangSelector" value={lang? lang: "en"} onChange={changeLang}>
                    <option value="en" >English</option>
                    <option value="zh" >中文</option>
                    <option value="ko" >조선어</option>
                </select>
            </div>
            <ToggleButton click={toggleHandler}/>
            <SideBar show={isToggleOpen}/>
            {isToggleOpen &&
                <>
                    <Backdrop click={backHandler}/>
                </>
            }
        </div>
    )
}

export default Nav
