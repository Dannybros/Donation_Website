import React from 'react'
import './LangSwitch.css'
import i18n from '../../i18n'

function LangSwitch() {

    const changeLang=(lng)=>{
        i18n.changeLanguage(lng)
    }

    return (
        <div className="switch">
            <ul>
                <li onClick={()=>changeLang('en')}>
                    English
                </li>
                <li onClick={()=>changeLang('ko')}>
                    조선어
                </li>
                <li onClick={()=>changeLang('zh')}>
                    中国
                </li>
            </ul>
        </div>
    )
}

export default LangSwitch
