import React, {useEffect, useState} from 'react'
import axios, {url} from '../../backendSiteName'
import {Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Home.scss'
import { useTranslation } from 'react-i18next';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EventNoteIcon from '@material-ui/icons/EventNote';

function News() {

    const [news, setNews] = useState([])

    const {t, i18n} = useTranslation();

    useEffect(() => {
        axios.get('/news/topThree')
        .then(res=>setNews(res.data))
    }, [])

    const Item = ({title, date, view, img}) =>{
        return(
            <div className="TopNews-item">
                <div className="topNews-img-box">
                    <img src={url + img} alt=""/> 
                </div>
                <h5>{title[i18n.language]}</h5>
                <p>
                    <div>
                    <EventNoteIcon/><span>{date.split('T')[0]}</span>
                    </div>
                    <div className="views_box">
                        <VisibilityIcon/>  <span>{view}</span>
                    </div>
                </p>
                <button>{t('project.viewDetail')}</button>
            </div>
        )
    }

    return (
       <main className="project_ranking">
            <h1>{t('home.news.heading')}</h1>
            <section className="first_place_section">
                <div className="first___item">
                    <img src ="https://picsum.photos/200" alt=""/>
                    <h3>
                        {news[0]?.title[i18n.language]}
                    </h3>
                    <div className="item__des">
                        {news[0]?.content[i18n.language]}
                    </div>
                    <button>{t('project.viewDetail')}</button>
                </div>

                <div className="first__description">
                    <h1>{t('home.news.1stRank')}</h1>
                    <h3>
                        <div>{t('home.news.total')} :</div> 
                        {news[0]?.view}
                    </h3>
                    <h3> 
                        <div> {t('home.project.created')}:</div> 
                        {news[0]?.date.split('T')[0]}
                    </h3>

                </div>
            </section>
            <section className="news-section">
                <Row>
                    {(news[1] && news[2])&&
                        <>
                        <Col md={6}>
                            <h1>{t('home.project.2Rank')}</h1>
                            <Item 
                                title={news[1].title} 
                                date={news[1].date.split('T')[0]} 
                                img={news[1].img[0]}
                                view={news[1].view}
                            />
                        </Col>
                        <Col md={6}>
                            <h1>{t('home.project.3Rank')}</h1>
                            <Item 
                                title={news[2].title}
                                date={news[2].date.split('T')[0]}
                                img = {news[2].img[0]}
                                view={news[2].view}
                            />
                        </Col>
                        </>
                    }
                </Row>
            </section>
        </main>
    )
}

export default News
