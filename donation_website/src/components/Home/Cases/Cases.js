import React, {useEffect, useState} from 'react'
import Simple from './Carousel/Carousel'
import './cases.scss'
import axios from '../../../axios/axios'
import { useStateValue } from "../../../Reducer/StateProvider";
import { useTranslation } from 'react-i18next';

function Cases() {

    const [loading, setLoading] = useState(true)

    const [{projects}, dispatch] = useStateValue();

    const {t} = useTranslation();

    useEffect(() => {
       const fetchProjData= async()=>{

        await setLoading(true)
        
        await axios.get('/cases')
            .then(res=>{
                dispatch({
                type:'Add_Projects',
                projects: res.data,
                })
            })
            .catch(err=>console.log(err));

        setLoading(false)
        }

        fetchProjData();
    }, [dispatch])

    
    return (
        <div className="cases" id="section_case">
            {loading?
                <h1>
                    {t('Donation.loading')}
                </h1>
                :
                <>
                <div className="cases_container">
                    <div className="cases_title">
                        {t('Donation.heading')}
                    </div>
                    <div className="cases_box">
                    {/* carousel */}

                        <Simple deviceType="tablet" data={projects}/>
                    </div>
                </div>
                </>
                
            }
        </div>
    )
}

export default Cases
