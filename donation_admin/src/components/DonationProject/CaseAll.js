import React, {useState, useEffect} from 'react'
import './Cases.css'
import {Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from 'react-router-dom';
import Item from './Carousal/Item';
import axios from '../backendSiteName'
import { useTranslation } from 'react-i18next';

function CaseAll() {

    const history = useHistory();
    
    const {t} = useTranslation('translation')

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState();

    // // convert array of buffer to base64
    // const arrayBufferToBase64 = (buffer)=>{
    //     var binary = '';
    //     var bytes = [].slice.call(new Uint8Array(buffer));
    //     bytes.forEach((b)=> binary += String.fromCharCode(b));

    //     const imgString = 'data:image/jpeg;base64,' + window.btoa(binary)
    //     return imgString
    // }
    const deleteItem = async (id, img) => {
        await axios.post(`/cases/delete/${id}`, img)
        .then(res=>{
            alert(res.data.message)
        })
        .catch(err=>console.log(err))
        setRefresh(true)
    }

    useEffect(() => {
        setRefresh(false)
        const fetchData =async()=>{
            await setLoading(false);
    
            await axios.get('/cases')
            .then((res)=>{
                setData(res.data);
            })
            .catch((err)=>{
                alert(err.message)
            });

            await setLoading(true);
        }

        fetchData();
       
    }, [refresh])
    
    const ShowCases = ()=>{
        var arr =[]
        for(var i=0; i<data?.length; i++){
            arr.push(
                <Col lg={4} key={i}>
                    <Item 
                        key={i}
                        id= {data[i]?._id}
                        title={data[i]?.title} 
                        current={data[i]?.reach} 
                        goal={data[i]?.goal}
                        des={data[i]?.content}
                        img={data[i]?.img}
                        delClicked={deleteItem}
                        refresh={refresh}
                    />
                </Col>
            )
        }

        return <Row style={{margin:"0"}} key={0}>{arr}</Row>
    }

    return (
        <div className="cases">
            { loading?
                data.length > 0 ?
                    (
                    <>  
                        <h1 style={{marginTop:80}} className="cases_h1">
                            {t('project.title')}
                        </h1>
                        <div style={{display:'flex', justifyContent:"space-around", borderBottom:'1px solid black'}}>
                            <button className="btnChange" onClick={()=>history.push('/Home')}>
                                {t('home.heading')}
                            </button>
                           
                            <button className="btnChange" onClick={()=>history.push('/project-create')}>
                               {t('project.buttonCreate')}
                            </button>

                            <button className="btnChange" onClick={()=>history.push('/news')}> 
                               {t('project.buttonNews')}
                            </button>
                        </div>
                        <ShowCases/>
                    </>
                    )
                    :
                    ( 
                    <>
                        <h1 style={{marginTop:80}} className="cases_h1">
                            {t('project.title')}
                        </h1>
                        <div style={{display:'flex', justifyContent:"space-around", borderBottom:'1px solid black'}}>
                            <button className="btnChange" onClick={()=>history.push('/Home')}>
                                {t('home.heading')}
                            </button>
                           
                            <button className="btnChange" onClick={()=>history.push('/project-create')}>
                                {t('project.buttonCreate')}
                            </button>

                            <button className="btnChange" onClick={()=>history.push('/news')}> 
                               {t('project.buttonNews')}
                            </button>
                        </div>
                        <h1 style={{marginTop:40}}>{t('project.error')}</h1>
                    </>
                    )
                :
                (   
                    <div style={{width:"100%", height:"calc(100vh - 60px)", display:"flex", alignItems:"center", justifyContent:'center' }}>
                        <h1>Please Wait</h1>
                    </div>
                )
            }
            
        </div>
    )
}

export default CaseAll
