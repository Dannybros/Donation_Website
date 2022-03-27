import React, {useEffect, useState} from 'react'
import axios from '../../backendSiteName'
import Item from '../../DonationProject/Carousal/Item'
import '../Home.scss'
import {Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
import {useHistory} from 'react-router-dom';

function Projects() {
    const history = useHistory();

    const [proj, setProj] = useState([null])

    const {t, i18n} = useTranslation();

    useEffect(() => {
        axios.get('/cases/topThree')
        .then(res=>setProj(res.data))

        window.scrollTo(0, 0)
    }, [])

    const Display23Rank=({data})=>{
        return(
            <Row>
            {data[2]&&
                <>
                    <Col md={6}>
                        <h1>{t('home.project.2Rank')}</h1>
                        <Item 
                            key={data[1]._id}
                            id={data[1]._id}
                            title={data[1].title} 
                            des={data[1].content } 
                            goal={data[1]?.goal} 
                            current={data[1]?.reach} 
                            img = {data[1].img[0]}
                            del    
                        />
                    </Col>
                    <Col md={6}>
                        <h1>{t('home.project.3Rank')}</h1>
                        <Item 
                            key={data[2]._id}
                            id={data[1]._id}
                            title={data[2].title} 
                            des={data[2].content} 
                            goal={data[2]?.goal} 
                            current={data[2]?.reach} 
                            img = {data[2].img[0]}
                            del
                        />
                    </Col>
                </>
            }   
            </Row>
        )
    }
    return (
        <div>
            {proj?.length>0 &&
                <main className="project_ranking">
                <h1>{t('home.project.heading')}</h1>
                <section className="first_place_section">
                    <div className="first__description">
                        <h1>{t('home.project.1stRank')}</h1>
                        <h3>
                            <div>{t('home.project.total')} :</div> ${proj[0]?.reach}
                        </h3>
                        <h3> <div>{t('project-form.goal')} :</div> ${proj[0]?.goal}</h3>
                        <h3> <div>{t('home.project.created')} :</div>{proj[0]?.createdAt.split('T')[0]}</h3>

                    </div>
                    <div className="first___item">
                        <img src ={proj[0]?.img[0]} alt=""/>

                        <h3>{proj[0]?.title[i18n.language]}</h3>

                        <div className="item__des">
                        {proj[0]?.content[i18n.language]}
                        </div>

                        <button onClick={()=>history.push(`/project-detail/${proj[0]?._id}`)}>{t('project.viewDetail')}</button>
                    </div>
                </section>
                <section>
                    <Display23Rank data={proj}/>
                </section>
            </main>
            }
        </div>
    )
}

export default Projects
