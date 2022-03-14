import React, {useEffect, useState} from 'react'
import axios from '../../backendSiteName'
import Item from '../../DonationProject/Carousal/Item'
import '../Home.scss'
import {Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';

function Projects() {
    const [projs, setProjs] = useState([null])

    const {t, i18n} = useTranslation();

    useEffect(() => {
        axios.get('/cases/topThree')
        .then(res=>setProjs(res.data))

        window.scrollTo(0, 0)
    }, [])

    const Dislay23Rank=({data})=>{
        return(
            <Row>
            {data[2]&&
                <>
                    <Col md={6}>
                        <h1>{t('home.project.2Rank')}</h1>
                        <Item 
                            key={data[1].id}
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
                            key={data[2].id}
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
            {projs?.length>0 &&
                <main className="project_ranking">
                <h1>{t('home.project.heading')}</h1>
                <section className="first_place_section">
                    <div className="first__description">
                        <h1>{t('home.project.1stRank')}</h1>
                        <h3>
                            <div>{t('home.project.total')} :</div> ${projs[0]?.reach}
                        </h3>
                        <h3> <div>{t('project-form.goal')} :</div> ${projs[0]?.goal}</h3>
                        <h3> <div>{t('home.project.created')} :</div>{projs[0]?.createdAt.split('T')[0]}</h3>

                    </div>
                    <div className="first___item">
                        <img src ={projs[0]?.img[0]} alt=""/>

                        <h3>{projs[0]?.title[i18n.language]}</h3>

                        <div className="item__des">
                        {projs[0]?.content[i18n.language]}
                        </div>

                        <button>{t('project.viewDetail')}</button>
                    </div>
                </section>
                <section>
                    <Dislay23Rank data={projs}/>
                </section>
            </main>
            }
        </div>
    )
}

export default Projects
