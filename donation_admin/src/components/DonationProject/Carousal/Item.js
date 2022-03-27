import React from 'react'
import './Item.css'
import {useHistory} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n'

function Item({img, title, des, goal, current, id, del, delClicked}) {

    const history = useHistory();

    const {t} = useTranslation()
     
    let percentage = parseInt(current/goal * 100)

    if(percentage ===0){
        percentage = 1;
    }

    if(percentage > 100){
        percentage =100
    }

    const goToDetail =()=>{
        history.push(`/project-detail/${id}`)
    }

    return (
        <div className="box__item" >
            <img src={img} className="imgItem" alt="" onClick={goToDetail}/>
            <div className="item__info" onClick={goToDetail}>
                <div className="item__title">
                    {title[i18n.language]}
                </div>
                <div className="item__des">
                    {des[i18n.language]}
                </div>
            </div>
            <div className="itemGoal_percentage" onClick={goToDetail}>
                <div className="progress-bar">
                    <div className="progress-line" style={{width:`${percentage}%`}}/>
                </div>
                
                <div className="progress-teller" style={{marginLeft:`calc(${percentage}% - 28px)`}}>{percentage}%</div>
                <div className="goal__target">
                    <h3>{t('project-form.reach')}: {current.toLocaleString()}</h3>
                    <h3>{t('project-form.goal')}: {goal.toLocaleString()}</h3>
                </div>
            </div>
            <div className="group-buttons">
                <button onClick={goToDetail} style={{width: !del? '40%' : '80%' }}>
                    {t('project.viewDetail')}
                </button>
                {!del &&
                    
                    <button onClick={()=>delClicked(id, img)} style={{background:'rgb(255, 118, 118)', width:"40%"}}>
                        {t('project.del')}
                    </button>
                }
            </div>
        </div>
    )
}

export default Item
