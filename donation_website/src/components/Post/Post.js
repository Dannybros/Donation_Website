import React, {useState, useEffect} from 'react'
import './Post.scss'
import {Spinner} from 'react-bootstrap';
import SyncIcon from '@mui/icons-material/Sync';
import PaymentIcon from '@mui/icons-material/Payment';
import {useHistory, useParams} from 'react-router-dom'
import axios from '../../axios/axios';
import { useTranslation } from 'react-i18next';
import ShadyBG from '../Donation/ShadyBG';
import Donation2 from  '../Donation/Payment/Donation2';
import {Helmet} from 'react-helmet-async'

function Post() {

    const history = useHistory();

    const {t, i18n} = useTranslation();

    const [data, setData] = useState();

    const [bg, setBg] = useState(false);

    const [promoImg, setPromoImg] = useState([]);

    const imgArr=[];

    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    
    useEffect(() => {
        window.scrollTo(0, 0);
        
        if(!bg){

            const fetchData = async()=>{
                setLoading(false);
        
                await axios.get(`/cases/get/${id}`)
                    .then(res=>setData(res.data[0]))
                    .catch(err=>history.push('/*'))
                
                await axios.get(`/promo/images/4`)
                    .then(res=>setPromoImg(res.data))
                    .catch(err=>console.log(err))
    
                setLoading(true);
            }
        
            fetchData();
        }

    }, [history, id, bg])

    const goDonation =()=>{
        setBg(true)
    }

    const addImg=()=>{
        for(var k=1; k<data?.img.length; k++){
            imgArr.push(data.img[k])
        }
    }
    
    const closeDonation=(variant)=>{
        setBg(Boolean(variant));
    }

    const ShowContent=()=>{
        let content ='';

        if(i18n.language==="zh"){

            const contentComma = data?.content.zh.replace(/，/ig, `,`)
            content = contentComma.replace(/。/ig, '.')
        }else{
            content =data?.content[i18n.language]
        }

        let array =[];
        const NumImg = imgArr.length;
        const para =content?.match(/([^\\.!\\?]+[\\.!\\?]+)|([^\\.!\\?]+$)/g);
        const paraLength = para?.length;
        const totalSection = parseInt(paraLength / NumImg) +1;
    
        for(let j=0; j<NumImg; j++){
            array.push(
                <div key={j} className="post_content">  
                        {Array(totalSection).fill().map((_, idx)=>(
                            <p key={idx}>{para[(j * totalSection) + idx]} </p>
                        ))}
                        <br/>
                        <img src={imgArr[j]} alt="" style={{width:'80%', height:'300px' }}/>
                        <br/>
                </div>
            )
        }

        return(<div>{array}</div>)
    }

    const percentage = Math.ceil((data?.reach * 100 / data?.goal))

    const getImgName=(img)=>{
        const name = img.split("/").pop().split(".")[0];
        return name;
    }

    addImg(); 

    console.log(document.documentElement.offsetHeight);
    return (
        <div className="post">
        <Helmet>
          <title>Project Post</title>
        </Helmet>
        {loading ? 
            <>
            {bg&&
                <>
                {/* <Donation name={data?.title} id={id} click={()=>setBg(false)}/> */}
                <Donation2 name={data?.title} click={closeDonation}/>
                <ShadyBG click={()=>setBg(false)}/>
                </>
            }
            <div className="post_container">
                <div className="post_blog_box">
                    <div className="post_content_info">
                    {/* all the news and blog content */}

                        {/* blog title and main image */}
                        <img src={data?.img[0]} className="mainImg" alt="main"/>
                        <h1 className="post_title">
                            {data?.title[i18n.language]}
                        </h1>

                        {/* blog info for tablet and phone view */}
                        <div className="donation_view">
                            <button onClick={goDonation}>
                                <PaymentIcon className='btnicon'/>
                                {t('Donation.pageAll.button1')}
                            </button>
                        </div>
                        
                        <div className='project___percentage tablet-show'>
                            <div className='percentage_box'/>
                            <div className='percentage_progress' style={{width:`${percentage}%`}}/>
                            <div className='percentage_teller' style={{
                                left:`${percentage}%`, 
                                transform:`translate(-${percentage}%, -50%)`
                            }}>
                                {percentage} %
                            </div>
                        </div>

                        {/* blog created Date */}
                        <div className="post_date">
                            <span>
                                {t('Donation.post.BBD', {date:'5'})}
                            </span>
                            <div onClick={()=>history.push('/discover')}>
                                <SyncIcon/>
                                {t('Donation.post.view2')}
                             </div>
                        </div>

                        {/* blog content */}
                        <ShowContent/>

                        <button onClick={goDonation}>
                            {t('Donation.item.button')}
                        </button>       
                    </div>

                    {/* blog info for pc and laptop */}
                    <div className="post_donation">
                        <div className='post_donation_info'>
                            <button onClick={goDonation}>
                                <PaymentIcon className='btnicon'/>
                                {t('Donation.pageAll.button1')}
                            </button>
                            <div className='project___percentage'>
                                <div className='percentage_box'/>
                                <div className='percentage_progress' style={{width:`${percentage}%`}}/>
                                <div className='percentage_teller' style={{
                                    left:`${percentage}%`, 
                                    transform:`translate(-${percentage}%, -50%)`
                                }}>
                                    {percentage} %
                                </div>
                            </div>
                        </div>

                        {promoImg.map((item)=>{
                            return(
                                <div className='adsItemBox mt-5' key={item}>
                                    <img src={item} alt=""/>
                                    <p>{getImgName(item)}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            </>
            : 
            <div className='post_spinner'>
                <Spinner variant='dark' animation='border'/>
            </div>
        }
           
            
        </div>
    )
}

export default Post
