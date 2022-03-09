import React, {useEffect} from 'react'
import Tabs from "./Tabs"; 
import './ABout.scss'
import { useTranslation } from 'react-i18next';
import {Helmet} from 'react-helmet-async';

function AboutUs() {

    const {t, i18n} = useTranslation();

    const breakText=(text, lines)=>{
        let content='';
        let array =[];

        if(i18n.language==="zh"){
            const contentComma =text.replace(/，/ig, `,`)
            content = contentComma.replace(/。/ig, '.')
        }else{
            content = text;
        }

        const para =content?.match(/([^\\.!\\?]+[\\.!\\?]+)|([^\\.!\\?]+$)/g);
        const paraLength = para.length
        const totalSection = parseInt(paraLength / lines);

        for(let j=0; j<lines; j++){
            array.push(
                <div key={j}>  
                    <p>
                        {Array(totalSection).fill().map((_, idx)=>(
                            <span key={idx}>{para[(j * totalSection) + idx]} </span>
                        ))}
                    </p>
                </div>
            )
        }

        return(array)
    }

    useEffect(() => {
        window.scrollTo(0,0) 
    }, [t])

    return (
        <div>
            <h1>{t('About_Us.heading')}</h1>
            <Tabs> 
                <div label={t('About_Us.tab1.title')} >
                    <Helmet>
                        <title>About Us - {t('About_Us.tab1.title')}</title>
                    </Helmet>
                    {breakText(`${t('About_Us.tab1.para')}`, 4)}
                </div> 
                <div label={t('About_Us.tab3.title')} > 
                    <Helmet>
                        <title>About Us - {t('About_Us.tab3.title')}</title>
                    </Helmet>
                    <div className="mission_Principle">
                        {t('About_Us.tab3.para')}
                    </div>
                </div> 
            </Tabs> 
        </div>
    )
}

export default AboutUs
