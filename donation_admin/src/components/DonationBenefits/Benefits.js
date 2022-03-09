import React, { useEffect, useState } from 'react';
import axios from '../backendSiteName';
import {useHistory} from 'react-router-dom'
import './benefits.scss';

function Benefits() {  

    const history = useHistory();

    const [loading, setLoading] = useState()

    const [data, setData] = useState([]);
    const [sort, setSort] = useState('all');

    useEffect(() => {
        setLoading(true)

        axios.get('/donation')
            .then(res=>{
                setData(res.data);
            })
            .catch(err=>console.log(err))
        
        setLoading(false)
    }, [])    

    const findSameDonor = (arr)=>{
        let newArr=[];
        let holder = {};

        arr.map((item)=>{
            const Holdername = item.cardName+"-"+ item.email
            !holder.hasOwnProperty(Holdername)? 
                holder[Holdername] = {
                    name: item.name,
                    email: item.email,
                    amount: item.amount,
                }
            :
                holder[Holdername].amount = item.amount

            return null
        })

        for(var item in holder){
            newArr.push({name:holder[item].name, email:holder[item].email, amount:holder[item].amount})
        }

        return newArr;

    }

    const getLevel = (num) =>{
        let classname;
        let level;

        if(num <= 30){
            level = null;
            classname="palette-1";
        }
        else if(num > 30 && num <= 40){
            level = 1;
            classname="palette-2";
        }
        else if(num > 40){
            level = 2;
            classname="palette-2";
        }

        return (<td className={classname}>{level}</td>)
    }

    const sortingData=(data)=>{
        if(sort==="all") return data;
        else if (sort==="level1"){
            let sortedData = data.filter(item=>item.amount>30 && item.amount <=40);
            console.log(sortedData);
            return sortedData
        }
        else if (sort==="level2"){
            let sortedData = data.filter(item=>item.amount>40);
            console.log(sortedData);
            return sortedData
        }
    }

    const goPage=(url)=>{
        history.push(url)
    }

    const benefactors = findSameDonor(data)

    return (
        <article className="benefit_page">
        {loading?
            <h1>Loading...</h1>
            :
            <>
            <h1>Donator list who are qualified for benefits</h1>
            <div className="top-header">
                <button onClick={()=>goPage('/Home')}>Go Home</button>
                <button onClick={()=>goPage('/project')}>Go Project</button>
                <button onClick={()=>goPage('/news')}>Go News</button>
            </div>
            <div className="eligible_donors">
                <section className="classification">
                    <ul>
                        <li>
                            <div className="palette-1"/>
                            <span>No Benefits</span>
                        </li>
                        <li>
                            <div className="palette-2">1</div>
                            <span>no e</span>
                        </li>
                        <li>
                            <div className="palette-2">2</div>
                            <span>alakjsdhfahfklalalskdjfh</span>
                        </li>
                        <li>
                            <div className="palette-2">3</div>
                            <span>alakjsdhfahfklalalskdjfh</span>
                        </li>
                    </ul>
                    <select onChange={(e)=>setSort(e.target.value)}>
                        <option value='all'>All</option>
                        <option value='level1'>level 1</option>
                        <option value='level2'>level 2</option>
                    </select>   
                </section>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Donation</th>
                            <th>Qualified</th>
                        </tr>
                    </thead>
                    <tbody>
                        { sortingData(benefactors).map(item=>{
                            return(
                                <tr>
                                    <td className="row_list" >{item.name}</td>
                                    <td className="row_list">{item.email}</td>
                                    <td className="row_list">${item.amount}</td>
                                    {getLevel(item.amount)}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            </>
        }
        </article>
    )
}

export default Benefits
