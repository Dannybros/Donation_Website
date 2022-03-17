import React, {useEffect, useState} from 'react'   
import './NewsDetail.css'
import {Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory, useParams} from 'react-router-dom'
import CircleLoader from "react-spinners/CircleLoader";
import axios from '../backendSiteName'
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

function NewsDetail() {
    const history = useHistory();
    
    const {t} = useTranslation('translation')

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false);

    const {id} = useParams();
    
    useEffect(()=> {
        const fetchData=async()=> {
            await setLoading(false)
    
            await axios.get(`/news/getone/${id}`)
               .then((res)=>{
                   setData(res.data[0]);
               })
               .catch(err=>{
                   alert('there is not such id')
                   history.push('/news')
               })
    
            await setLoading(true)
        }

        fetchData();
        window.scrollTo(0, 0)
        
    }, [id, history])

    const delNews = ()=>{
        axios.post(`/news/delete/${id}`, data.img)
        .then(res=>{
            alert(res.data.msg);
            history.replace('/news')
        })
        .catch(err=>alert(err))
    }

    return (
        <div className="news_detail_page">
            {loading?
                <>
                    <h3>{data.title[i18n.language]}</h3>
                    <div className="news_detail___section">
                        <p className="news___date">({data.date.split('T')[0]})</p>
                        <p className="news___content">
                            {data.content[i18n.language]}
                        </p>
                        <Row>
                            {data?.img?.map(item=>{
                                return(
                                    <>
                                        <Col lg={3} md={6} >
                                            <img src={item} alt="" className="newsImage"/>
                                        </Col>
                                    </>
                                )
                            })}
                        </Row>
                    </div>
                    <button className="delBtn" onClick={delNews}>
                        {t('news.del')}
                    </button>
                </>
                :
                <>
                    <div style={{width:"100%", height:"100vh", display:"flex", alignItems:"center", justifyContent:'center' }}>
                        <CircleLoader loading={true} color={'green'} size={100} margin={3} />
                    </div>
                </>

            }
        </div>
    )
}

export default NewsDetail
