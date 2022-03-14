import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import './CaseDetail.scss'
import axios from '../backendSiteName'
import i18n from '../../i18n'
import { useTranslation } from 'react-i18next'

function CaseDetail() {

    const [data, setData] = useState()

    const {t} = useTranslation();

    const imgArray = [];

    const {id} = useParams();

     // convert array of buffer to base64
    // const arrayBufferToBase64 = (buffer)=>{
    //     var binary = '';
    //     var bytes = [].slice.call(new Uint8Array(buffer));
    //     bytes.forEach((b)=> binary += String.fromCharCode(b));

    //     const imgString = 'data:image/jpeg;base64,' + window.btoa(binary)
    //     return imgString
    // }
    
    const language = i18n.language

    useEffect(() => {

        const fetchData = async()=>{
             await axios.get(`/cases/get/${id}`)
            .then(res=>setData(res.data[0]))
        }
       fetchData();
        
    }, [id])

    const addImg =(data)=>{
        for(var i=1; i<data?.length; i++){
            imgArray.push(data[i])
        }
    }

    // console.log(data?.content.zh)

    const ShowNews=()=>{
        let content="";

        if(i18n.language==="zh"){

            const test1 = data?.content.zh.replace(/，/ig, `,`)
            content = test1.replace(/。/ig, '.')
        }else{
            content =data?.content[language]
        }

        let array =[];
        const NumImg = imgArray?.length;
        const para = content?.match( /[^\\.!\\?]+[\\.!\\?]+/g );
        const paraLength = para?.length;
        const totalSection = parseInt(paraLength / NumImg) + 1;
    
        for(let index=0; index<NumImg; index++){

            array.push(
                <div key={index}>  
                    <div>
                        {Array(totalSection).fill().map((_, idx)=>(
                            <span key={idx}>{para[index*totalSection + idx]} </span>
                        ))}
                    </div>
                    <div className="img-box">
                        <img src={imgArray[index]} alt=""/>
                    </div>
                </div>
            )
        }

        return(
            <div className="case_page_row">
                {array}
            </div>
        )
    }

    addImg(data?.img);

    return (
        <div className="caseDetail">
            <img alt="" src={data?.img[0]} className="mainImg"/>
            <h1>
                {data?.title[i18n.language]}
                {t(' ')}
                <span style={{marginLeft:'30px'}}>
                    {data?.createdAt.split('T')[0]}
                </span>
            </h1>
            <ShowNews/>
        </div>
    )
}

export default CaseDetail
