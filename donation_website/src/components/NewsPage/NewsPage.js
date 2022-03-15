import React, {useState, useEffect} from 'react'
import './newsPage.scss'
import {Row, Col} from 'react-bootstrap';
import Pagination from './Pagination';
import {useHistory} from 'react-router-dom'
import axios from '../../axios/axios'
import { useStateValue } from '../../Reducer/StateProvider';
import { useTranslation } from 'react-i18next';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventNoteIcon from '@mui/icons-material/EventNote';
import {Helmet} from 'react-helmet-async'

function NewsPage() {
    const history = useHistory();

    const {t, i18n} = useTranslation();

    const [topNews, setTopNews] = useState(null);

    const [{news}] = useStateValue();

    const Post=(props)=>{
        const {_id, title, content, img, date} = props.data;
        return(
            <Col className="news_list_shadow" fluid="true" onClick={()=>history.push(`/news/detail/${_id}`)}>
                <div className="news_list_item">
                    <img src={img[0]} alt=""/>
                    <div className="news_item_info">
                        <h5>{title[i18n.language]}</h5>
                        <div>{content[i18n.language]}</div>
                        <p><EventNoteIcon/><span>{date.split('T')[0]}</span></p>
                    </div>
                </div>
            </Col>
        )
    }

    useEffect(() => { 
        window.scrollTo(0, 0);
        
        axios.get('/news/topThree')
            .then(res=>setTopNews(res.data))
            .catch(err=>console.log(err))
    }, [])

    return (
        <div className="news-page">
            <Helmet>
                <title>News Page</title>
            </Helmet>
            <div className="news_container">
                <div className="news_page_title">
                    {t('News.heading')}
                </div>
                <div className="shadow"/>
                <Row className="news_page_row">
                    <div className="news__box">
                        
                        {news.length > 0 ?(
                            <>
                                <Pagination
                                    data={news}
                                    RenderComponent={Post}
                                    title="Posts"
                                    pageLimit={3}
                                    dataLimit={4}
                                />
                            </>
                        ):(
                            <div style={{width:"100%", height:"100vh", display:"flex", alignItems:"center", justifyContent:'center' }}>
                                <h1>{t('News.loading')}...</h1>
                            </div>
                        )}
                    </div>
                    <div className="news__top">
                        <p style={{color:"primary"}}>{t('News.topNews')}</p>
                        <div className="TopNews-list-box">
                            {topNews?.length > 0 &&
                                topNews.map(item=>{
                                    return(
                                        <div className="TopNews-item" key={item._id}>
                                            <div className="topNews-img-box">
                                                <img src={item.img[0]} alt=""/>
                                            </div>
                                            <h5 onClick={()=>history.push(`/news/detail/${item._id}`)}>
                                                {item.title[i18n.language]}
                                            </h5>
                                            <p>
                                                <span>
                                                <EventNoteIcon/><span>{item.date.split('T')[0]}</span>
                                                </span>
                                                <span className="views_box">
                                                  <VisibilityIcon/>  <span>{item?.view}</span>
                                                </span>
                                            </p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </Row>
            </div>
        </div>
    )
}

export default NewsPage
