import React, {useState, useEffect} from 'react'
import GridLoader from "react-spinners/GridLoader";
import Cases from "./Cases/Cases";
import About from './About/About';
import News from './News/News'
import HeroBoot from './Hero/HeroBoot';
import ScrollTop from './ScrollTop/ScrollTop'
import { useStateValue } from "../../Reducer/StateProvider";
import axios from '../../axios/axios'
import {Helmet} from 'react-helmet-async';

function Home() {
    
    const [loading, setLoading] = useState(true);
    const [{news}, dispatch] = useStateValue();

    useEffect(() => {
    
        const fetchNewsData= async()=>{

        await axios.get('/news')
            .then((res)=>{
                dispatch({
                type:'Add_News',
                news: res.data,
                })
            })
            .catch(err=>console.log(err));

        setLoading(false)
        }

        fetchNewsData();

        return ()=>{
            setLoading(true)
        }
    }, [dispatch])


    return (
        <div>
             {loading? 
              <div style={{width:"100%", height:"100vh", display:"flex", alignItems:"center", justifyContent:'center' }}>
                <GridLoader loading={loading} color={'lightblue'} size={30} margin={3} />
              </div>
              : 
              <>
                <Helmet>
                    <title>Home - Dream and Love Foundation</title>
                </Helmet>
                <ScrollTop/>
                <HeroBoot/>
                <About/>
                <Cases/>
                <News data={news}/>
              </>
            }
        </div>
    )
}

export default Home
