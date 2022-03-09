import React from 'react'
import './Footer.scss'
import {Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../img/logo/Relogo2.png'
import { url } from '../../axios/axios';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../Reducer/StateProvider';

//icons
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {

    const history = useHistory();

    const [{news}] = useStateValue();

    const {t, i18n} = useTranslation();

    // const twoNews = news.slice(Math.max(news.length - 2, 1))
    return (
        <div className="footer" id="section__contact">
            <Container fluid>
               <Row>
                    <Col lg={4} md={12} style={{marginBottom:'12px', borderBottom:'1px solid white'}}>
                        <div className="section_left">
                             <img src={logo} alt=""/>
                             <p>
                                 {t('Footer.companyHeading')}
                             </p>
                             <div className="social_Icon">
                                <FacebookIcon/>
                                <InstagramIcon/>
                                <TwitterIcon/>
                                <YouTubeIcon/>
                             </div>
                        </div>
                    </Col>
                    <Col lg={4} md={6} style={{marginBottom:'12px', borderBottom:'1px solid white'}}> 
                        <div className="section_middle">
                            <p> {t('Footer.contact.title')}</p>
                             <ul>
                                 <li>
                                     <LocalPhoneIcon/>
                                     <div>
                                        {t('Footer.contact.list1')}
                                    </div>
                                 </li>
                                 <li>
                                     <EmailIcon/>
                                     <div>
                                         {t('Footer.contact.list2')}
                                     </div>
                                 </li>
                                 <li>
                                     <LocationOnIcon/>
                                     <div>
                                         {t('Footer.contact.list3')}
                                     </div>
                                 </li>
                             </ul>
                        </div>
                    </Col>
                    <Col lg={4} md={6} style={{marginBottom:'12px', borderBottom:'1px solid white'}}>
                        <div  className="section_right">
                             <p>{t('Footer.TopNews.title')}</p>
                             <ul>

                                {news.map((item)=>{
                                    return(
                                        <li key={item._id} onClick={()=>history.push(`/news/detail/${item._id}`)}>
                                            <img src={url + item.img[0]} alt=""/>
                                            <div>
                                                <p> {item.title[i18n.language]}</p>
                                                <span>{item.date.split('T')[0]}</span>
                                            </div>
                                        </li>
                                    )
                                })}
                             </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer
