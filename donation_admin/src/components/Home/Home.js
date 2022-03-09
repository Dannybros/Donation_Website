import React, {useEffect, useState} from 'react'
import "./Home.scss"
import CountUp from 'react-countup'
import axios from '../backendSiteName'  
import '../DonationProject/Carousal/Item.css';
import Projects from './compos/Projects';
import News from './compos/News';
import D3Graph from './compos/D3Graph';
import {useHistory} from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function Home() {

    const history = useHistory();

    const {i18n, t} = useTranslation();

    const lang = i18n.language

    const [donators, setDonators] = useState([])
    const [searchQuery, setSearchQuery] = useState(null);

    useEffect(() => {
        axios.get('/donation')
            .then(res=>{
                setDonators(res.data);
            })
            .catch(err=>console.log(err))
    }, [])    

    const ChangeOrder = async(e) => {
        sortData(e.target.value)
    }

    const handleChange=(e)=>{
        setSearchQuery(e.target.value)
    }

    const filterData=(data, search)=>{
        if(!search) return data;

        const searchTerm = search.toLowerCase()

        const filterData = data.filter((item)=>{
            // const name = item.name.toLowerCase();
            // return name.includes(searchTerm);

            return item.name.includes(searchTerm) ||
                item.email.includes(searchTerm)||
                item.donateTo.includes(searchTerm)
        })

        return filterData
    }

    const sortData = (value)=>{
        if(value==="highestOrder"){
            setDonators([...donators].sort((a, b)=>{
                return b.amount - a.amount
            }))

        }else{
            setDonators([...donators].sort((a,b)=>{
                return a.date < b.date ? -1 : a.date > b.date ? 1: 0
            }))
        }
    }

    return (
        <div className="home">
            <div className="total-earned">
                <h4>
                    {t('home.earned')}
                </h4> 
                <h1>
                    <CountUp end={4000} start={0} duration={5}/> $
                </h1>
            </div>
            <div className="title-top">
                <button onClick={()=>history.push('/project')}>
                    {t('project.title')}
                </button>

                 <button onClick={()=>history.push('/donor/benefits')}>
                    Benefits
                </button>

                <button onClick={()=>history.push('/news')}>
                     {t('news.title')}
                </button>
            </div>

            <D3Graph data={donators}/>

            <div className="donationList">
                <div className="donationList_heading">
                    <h3>{t('home.donationList')}</h3>

                    <div>
                        <input 
                            type="text"
                            placeholder="Search Donators"
                            onChange={handleChange}
                        />
                    </div>
                    <select onChange={ChangeOrder}>
                        <option value='latestOrder'>Latest</option>
                        <option value='highestOrder'>Highest</option>
                    </select>
                </div>
                <ul>
                    <li>
                        <div>{t('home.header1')}</div>
                        <div>{t('home.header2')}</div>
                        <div>{t('home.header3')}</div>
                        <div>{t('home.header4')}</div>
                    </li>

                    {donators&&
                        filterData(donators, searchQuery)?.map((item)=>{
                            return(
                                <li key ={item?._id}>
                                    <div>{item?.name}</div>
                                    <div>{item?.email}</div>
                                    <div>${item?.amount}</div>
                                    <div>{item?.donateTo?.[lang]}</div>
                                </li>
                            )
                        })
                    }
                    
                </ul>
            </div>
            <Projects/>
            <News/>
        </div>
    )
}

export default Home
