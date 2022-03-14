import React, {useState, useEffect} from 'react'
import CircleLoader from "react-spinners/CircleLoader";
import {useHistory} from 'react-router-dom';
import {Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from './Pagination/Pagination';
import './News.scss'
import axios from '../backendSiteName';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n'

function NewsAll() {

    const history = useHistory();

    const {t} = useTranslation('translation')

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState()

    const fetchData =async()=>{
        await setLoading(false)

        await axios.get('/news')
        .then(res=>setData(res.data))
        .catch(err=>(console.log(err)))

        await setLoading(true);
    }

    useEffect(()=> {
        fetchData();
        window.scrollTo(0,0)
    }, [])
    
    const Post=(props)=>{

        const {_id, title, content, img, date} = props.data;
        const newsid = "news-id-" + _id;
        return(
            <Col id={newsid} className="news_list_shadow" >
                <h1>{title[i18n.language]}</h1>
                <div className="news_list_item">
                    <img src={img[0]} alt="news-item-img" onClick={()=>history.push(`/news-detail/${_id}`)}/>
                    <div className="news_item_info" onClick={()=>history.push(`/news-detail/${_id}`)}>
                        <div>
                            {content[i18n.language]}
                        </div>
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tag-fill" viewBox="0 0 16 16">
                                <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                            </svg>
                            <span>{date.split('T')[0]}</span>
                        </p>
                    </div>
                </div>
            </Col>
        )
    }

    return (
        <div>
        {loading?
            (
                data.length>0?
                (
                <div className="news">
                    <h1>{t('news.title')}</h1>
                    <div style={{display:'flex', justifyContent:"space-around", borderBottom:'1px solid black'}}>
                        <button className="newsButton" onClick={()=>history.push('/Home')}>{t('home.heading')}</button>
                        <button className="newsButton" onClick={()=>history.push('/news-create')}>{t('news.buttonCreate')}</button>
                        <button className="newsButton" onClick={()=>history.push('/project')}>{t('news.buttonProject')}</button>
                    </div>
                    <Pagination
                        data={data}
                        RenderComponent={Post}
                        title="Posts"
                        pageLimit={3}
                        dataLimit={10}
                    />
                </div>)
                :(
                    <div className="news">
                        <h1>{t('news.title')}</h1>
                        <div style={{display:'flex', justifyContent:"space-around", borderBottom:'1px solid black'}}>
                            <button className="newsButton" onClick={()=>history.push('/Home')}>{t('home.heading')}</button>
                            <button className="newsButton" onClick={()=>history.push('/news-create')}>{t('news.buttonCreate')}</button>
                            <button className="newsButton" onClick={()=>history.push('/project')}>{t('news.buttonProject')}</button>
                        </div>
                        <h1>{t('news.error')}</h1>
                    </div>
                )
            )
            :
            (
                <div style={{width:"100%", height:"100vh", display:"flex", alignItems:"center", justifyContent:'center' }}>
                    <CircleLoader loading={true} color={'green'} size={100} margin={3} />
                </div>
            )
        }
        </div>
       
    )
}

export default NewsAll
