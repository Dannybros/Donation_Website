import React from 'react'
import './Benefits.scss'
import travel from '../../img/tourism.jpg'
import { useTranslation } from 'react-i18next';
import {Helmet} from 'react-helmet-async';
import beer from '../../img/beer.jpg'

function Benefits() {

    const {t} = useTranslation();
    
    return (
        <div className="benefit_page">
            <Helmet>
                <title>Donor Benefits Page</title>
            </Helmet>
            <div className="benfits_page___hero">
                <h3>
                    {t('Benefits.title')}
                </h3>
            </div>
            <div className='benefits_page___list'>
                <h4>{t('Benefits.heading')}</h4>
                <ul>
                    <li>
                        <h3>{t('Benefits.benefit_1')}</h3>
                        <div>
                            <img src={travel} alt=""/>
                            <div className="benefits__description">
                                <p> 
                                    {t('Benefits.benefit_1_bullet_1')}
                                </p>
                                <p> 
                                    {t('Benefits.benefit_1_bullet_2')}
                                </p>
                            </div>
                        </div>
                    </li>
            
                    <li>
                        <h3>{t('Benefits.benefit_2')}</h3>
                        <div>
                            <img src={beer} alt="beer"/>
                            <div className="benefits__description">
                                <p>
                                    {t('Benefits.benefit_2_bullet_1')}
                                </p>
                            </div>
                        </div>
                    </li>

                    <li>
                        <h3>{t('Benefits.benefit_3')}</h3>
                        <div>
                            <div className="benefits__description">
                                <p>
                                    {t('Benefits.benefit_3_bullet_1')}
                                </p>
                            </div>
                        </div>
                    </li>
                    <p> 
                     <u>{t('Benefits.contactEmail', {email:"youremail@gmail.com"})} </u>
                    </p>
                </ul>
            </div>
        </div>
    )
}

export default Benefits
