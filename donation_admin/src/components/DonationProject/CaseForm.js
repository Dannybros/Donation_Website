import React, {useState, useRef} from 'react'
import './Cases.css'
import {useHistory} from 'react-router-dom';
import {Button, CircularProgress } from "@material-ui/core";
import {Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../backendSiteName'
import { useTranslation } from 'react-i18next';

const initialValue={
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
    goal:"",
    img:null,
}
function CaseForm() {

    const history = useHistory();

    const {t}= useTranslation('translation')
    
    const [imgFiles, setImgFiles]=useState([]);
    const [formData, setFormData] = useState(initialValue);

    const hiddenFileInput = useRef(null);

    const [btnLoading, setBtnLoading] = useState(false)
    
    const handleSubmit = async(e) =>{

        e.preventDefault();

        setBtnLoading(true)
       
        if(formData.img===null){
            alert('please upload pictures')
        }else{
            const formValues = new FormData();
    
            formValues.append("goal", formData.goal)

            formValues.append("titleEn", formData.title.en)
            formValues.append("titleZh", formData.title.zh)
            formValues.append("titleKo", formData.title.ko)

            formValues.append("contentEn", formData.content.en)
            formValues.append("contentZh", formData.content.zh)
            formValues.append("contentKo", formData.content.ko)

            for(var img of formData.img){
                formValues.append('img', img)
            }

            await axios.post('/cases', formValues)
            .then((res) => {
                setBtnLoading(false)
                alert("The file is successfully uploaded");
                history.push('/project')
            })
            .catch((error) => {
                const errStatus = error?.response?.status;
                
                const errMsg = error?.response?.data.message
                alert('Error:' + errStatus + "  " + errMsg)
            });
        }

        setBtnLoading(false)
    }

    const handleClick =()=>{
        hiddenFileInput.current.click();
    }

    const handleClearImg=()=>{
        setImgFiles([])
    }

    const imgHandleChange =(e)=>{
        setImgFiles([])

        for (var i=0; i< e.target.files.length; i++){
           let string = URL.createObjectURL(e.target.files[i]);
           setImgFiles(old=>[...old, string]);
        }
        setFormData({...formData, [e.target.name]:e.target.files})
    }

    const handleChange=(e)=>{
        setFormData({...formData, [e.target.name]:e.target.value})
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
        <div className="project_form-page">
            <div style={{display:'flex', justifyContent:'space-around', alignItems:'center', borderBottom:'1px solid #222'}}>
                <h1>
                    {t('project-form.heading')}
                </h1>
                <button className="btnChange" onClick={()=>history.push('/project')}>
                    {t('project-form.buttonProject')}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="projectForm" encType="multipart/form-data">  
                {/* titles */}
                <div style={{width:'100%'}}>
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

                {/* goal */}
                <input 
                    type="Number" 
                    name="goal" 
                    placeholder={t('project-form.goal')}
                    value={formData.goal} 
                    className="formGoal" 
                    onChange={handleChange}
                />

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
                
                {/* img Selecter */}
                <div>
                    <input 
                        ref={hiddenFileInput}
                        type="file" 
                        className="imgSelector" 
                        onChange={imgHandleChange}
                        name="img"
                        multiple
                    />

                    <label onClick={handleClick}>
                      {t('project-form.label')}
                    </label>

                    {!imgFiles.length<=0 &&
                        <label onClick={handleClearImg} className="clearImg">
                        {t('project-form.label2')}
                        </label>
                    }
                </div>
                <Row>
                    {imgFiles.map((img)=>{
                        return(
                        <Col lg={3} md={6} style={{margin:'20px'}} key={img}>
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
        </div>
    )
}

export default CaseForm
