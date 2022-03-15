import React, {useEffect} from 'react'   
import './NewsDetail.css'
import {Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useStateValue } from '../../Reducer/StateProvider';
import {useParams, useHistory} from 'react-router-dom';
import axios from '../../axios/axios'
import { useTranslation } from 'react-i18next';
import {Helmet} from 'react-helmet-async'

function NewsDetail() {

    const history = useHistory();

    const {i18n} = useTranslation();
    
    const [{news}] = useStateValue();
    
    const {id} = useParams();
    
    const document = news.find((item)=>item._id===id);
    const index = news.findIndex((item)=>item._id === id);
    const newsContent = document?.content
    
    useEffect(() => {
        window.scrollTo(0, 0);

        axios.post('/news/view', {id:id})
        .then(console.log('saved'))
        .catch(err=>console.log(err))
    }, [id])
    
    const prevPage = ()=>{
        const new_index = index-1;
        if(new_index<= -1){
            alert('this is the last page')
        }else{
            
            const newId = news[new_index]._id;
            history.push(`/news/detail/${newId}`)
        }
    }

    const nextPage=()=>{
        const new_index = index+1;
        if(new_index>= news.length){
            alert('this is the newest page')
        }else{
            const newId = news[new_index]._id;
            history.push(`/news/detail/${newId}`)
        }

    }

    const TextFormat =()=>{
        const lang = i18n.language;

        let content =""
        if(i18n.language==="zh"){

            const contentComma =newsContent?.zh.replace(/，/ig, `,`)
            content = contentComma.replace(/。/ig, '.')
        }else{
            content =newsContent?.[lang]
        }

        const para =content?.match(/([^\\.!\\?]+[\\.!\\?]+)|([^\\.!\\?]+$)/g);
        const paraLength = para?.length;

        const section = Math.ceil(paraLength/20)

        let array =[];
        for(let i=0; i<section; i++){
            array.push(
                <p key={i}>
                    {Array(20).fill().map((_, idx)=>(
                        <span key={idx}>
                            {para[i*20 + idx]}
                        </span>
                    ))} 
                </p>
            )
        }

        return(
            <div className='news___content'>
                {array}
            </div>
        )
    }

    return (
        <div className="news_detail_page">
            <Helmet>
                <title>News Blog - {id}</title>
            </Helmet>
            <div className="news_detail_top">
                <h2>
                    <b>
                    {document?.title[i18n.language]}
                    </b>
                </h2>
            </div>
            <div className="news_detail___section">
                <p className="news___date">({document?.date.split('T')[0]})</p>
                <TextFormat/>
                <Row>
                    {document?.img.map((item)=>{
                        return(
                            <Col lg={4} md={6} xs={12} key={item}>
                                <img src={item} alt=""/>
                            </Col>
                        )
                    })}
                </Row>
            </div>
            <div className="goOtherPage left" onClick={prevPage}><b>«</b></div>
            <div className="goOtherPage right" onClick={nextPage}><b>»</b></div>
        </div>
    )
}

export default NewsDetail
