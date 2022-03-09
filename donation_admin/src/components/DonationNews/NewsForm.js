import React, {useState, useRef} from 'react'
import './News.scss'
import {useHistory} from 'react-router-dom';
import axios from '../backendSiteName'
import {Button, CircularProgress } from "@material-ui/core";
import {Row, Col} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const initialData = {
    title:{
        en:"",
        zh:"",
        ko:""
    },
    content:{
        en:"",
        zh:"",
        ko:""
    },
    img:null,
}

function NewsForm() {

    const hiddenInputFile = useRef(null)

    const history = useHistory();

    const {t} = useTranslation('translation');

    const [formData, setFormData] = useState(initialData);
    const [imgFiles, setImgFiles]=useState([]);
    const [btnLoading, setBtnLoading] = useState(false)

    const handleSubmit= async(e)=>{
        e.preventDefault();
        
        setBtnLoading(true)

        if(formData.img===null){

            alert('please upload pictures')

        }else{

            const formValues = new FormData();

            formValues.append("titleEn", formData.title.en)
            formValues.append("titleZh", formData.title.zh)
            formValues.append("titleKo", formData.title.ko)

            formValues.append("contentEn", formData.content.en)
            formValues.append("contentZh", formData.content.zh)
            formValues.append("contentKo", formData.content.ko)

            for(var img of formData.img){
                formValues.append('img', img)
            }

            await axios.post('/news/', formValues)
            .then((res) => {
                setBtnLoading(false)
                alert("The file is successfully uploaded");
                history.push('/news')
            })
            .catch((error) => {
                alert(error)
            });
            setBtnLoading(false)
        }
    }
     
    const imgHandleChange =(e)=>{
        setImgFiles([])

        for (var i=0; i< e.target.files.length; i++){
           let string = URL.createObjectURL(e.target.files[i]);
           setImgFiles(old=>[...old, string]);
        }
        setFormData({...formData, [e.target.name]:e.target.files})
    }

    const handleClick =()=>{
        hiddenInputFile.current.click();
    }

    const objectHandleChange=(e)=>{
        const objectName = e.target.name.split('.')[0]
        const objectKey = e.target.name.split('.')[1]
        const object = formData[objectName]
        
        setFormData({
            ...formData, 
            [objectName]:{
                ...object, 
                [objectKey]:e.target.value
            }
        })
    }

    return (
        <div style={{width:'100vw', minHeight:'100vh', padding:"100px auto"}}>
            <div style={{display:'flex', justifyContent:"space-around", borderBottom:'1px solid black', padding:"80px 0 20px"}}>
                <h1>
                    {t('news-form.heading')}
                </h1>
                <button className="newsButton" onClick={()=>history.push('/news')}>
                    {t('news-form.buttonNews')}
                </button>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <input 
                        type="text" 
                        name="title.en" 
                        placeholder={t('project-form.title-en')}
                        onChange={objectHandleChange} 
                    />
                    <input 
                        type="text" 
                        name="title.zh" 
                        placeholder={t('project-form.title-zh')}
                        onChange={objectHandleChange} 
                    />
                    <input 
                        type="text" 
                        name="title.ko" 
                        placeholder={t('project-form.title-ko')}
                        onChange={objectHandleChange} 
                    />
                </div>

                {/* textAreas */}
                <div>
                    <textarea 
                        rows="10" 
                        cols="50"
                        placeholder={t('project-form.content-en')}
                        name="content.en"
                        onChange={objectHandleChange}
                    />
                    <textarea 
                        rows="10" 
                        cols="50"
                        placeholder={t('project-form.content-zh')}
                        name="content.zh" 
                        onChange={objectHandleChange}
                    />
                    <textarea 
                        rows="10" 
                        cols="50"
                        placeholder={t('project-form.content-ko')}
                        name="content.ko"
                        onChange={objectHandleChange}
                    />
                </div>

                {/* img Selector */}
                <div>
                    <input 
                        ref={hiddenInputFile}
                        type="file" 
                        name="img" 
                        style={{display:'none'}}
                        onChange={imgHandleChange} 
                        multiple
                    />
                    <label onClick={handleClick}>
                        {t('project-form.label')}
                    </label>
                    {!imgFiles.length<=0 &&
                        <label onClick={()=>setImgFiles([])} className="clearImg">
                            {t('project-form.label2')}
                        </label>
                    }
                </div>
                <Row style={{width:'100%', paddingLeft:30}}>
                    {imgFiles.map((img)=>{
                        return(
                        <Col lg={3} md={6} style={{margin:'10px 0'}} key={img}>
                            <img src={img} alt="" style={{width:'100%'}}/>
                        </Col>
                        )
                    })}
                </Row>

                {/* submit button */}
                <Button 
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{padding:"15px", width:"100%",  margin: '30px 10px',  fontSize: '20px'}}
                    disabled={btnLoading}
                >
                    {btnLoading? <CircularProgress size={24}/>: <>{t('project-form.submit')}</>}
                </Button>
            </form>
            <br/><br/>
        </div>
    )
}

export default NewsForm
