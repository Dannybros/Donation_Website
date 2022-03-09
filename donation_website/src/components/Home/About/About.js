import React from 'react'
import './About.scss'
import {useHistory} from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function About() {
    const history = useHistory();
    const {t} =useTranslation(); 

    const buttonHandle=()=>{
        localStorage.setItem('about', `${t('About_Us.tab3.title')}`)
        history.push('/aboutus')
    }

    return (
        <div className="about-section">
            <div className="About-msg-box">
                <div className="about-title">
                    <span>{t('About_Us.heading')}</span>
                    <button onClick={buttonHandle}>{t('About_Us.tab3.title')}</button>
                </div>
                <div className='about__context'>
                    {t('About_Us.tab1.para')}
                </div>
            </div>
        </div>
    )
}

export default About
