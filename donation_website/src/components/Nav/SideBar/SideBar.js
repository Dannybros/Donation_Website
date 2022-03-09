import React from 'react'
import './sideBar.css'
import logo from '../../../img/logo/ReLogo.png'
import {useHistory} from 'react-router-dom';
import {useTranslation} from "react-i18next";

function SideBar(props) {
    const history = useHistory();

    const {t, i18n}= useTranslation()

    const lang = localStorage.getItem('lang');

    let sidebarclass = 'side-bar';

    if(props.show){
        sidebarclass='side-bar open'
    }

    const changeLang=(e)=>{
        const lng = e.target.value;
        i18n.changeLanguage(lng)
    }
    
    const goToAboutUs=()=>{
        history.push('/aboutus');
        localStorage.setItem('about', 'OverView')
    }

    return (
        <nav className={sidebarclass}>
            <img src={logo} alt="logo" onClick={()=>history.replace('/')}/>
            
            <ul>
                <li onClick={()=>history.replace('/')}>{t('Home.nav.list1')}</li>
                <li onClick={goToAboutUs}>{t('Home.nav.list2')}</li>
                <li onClick={()=>history.push('/news')}>{t('Home.nav.list3')}</li>
                <li onClick={()=>history.push('/discover')}>{t('Home.nav.list4')}</li>
                <li onClick={()=>history.push('/benefits')}>{t('Benefits.title')}</li>
            </ul>
            <div className="LangSelect-box">
                <select className="LangSelect" value={lang? lang: "en"} onChange={changeLang}>
                    <option value="en" >English</option>
                    <option value="zh" >Chinese</option>
                    <option value="ko" >Korean</option>
                </select>
            </div>
            
        </nav>
    )
}

export default SideBar
