import React from 'react'
import './news.scss'
import {Row, Col} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import {useStateValue } from '../../../Reducer/StateProvider';
import EventNoteIcon from '@mui/icons-material/EventNote';
import {useTranslation} from "react-i18next";

function News(props) {
    const history = useHistory();

    const {t, i18n}  = useTranslation();

    const [{news}] = useStateValue();

    const recentNews = news.slice(Math.max(news.length - 3, 0))

    return (
        <div className="news">
            <div className="news-container">
                <h3>{t('News.heading')} 
                    <span onClick={()=>history.push('/news')}>
                        {t('News.pagination.more')}
                    </span>
                </h3>
                <Row>
                    {recentNews.map((item)=>{
                        return(
                            <Col xs={6} md={6} lg={4} key={item._id}>
                                <div className="news_box">
                                    <img alt="" src={item.img[0]}/>
                                    <h5 onClick={()=>history.push(`/news/detail/${item._id}`)}>{item.title[i18n.language]}</h5>
                                    <p><EventNoteIcon/><span>{item.date.split('T')[0]}</span></p>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </div>
        </div>
    )
}

export default News
