import express from 'express'
import CaseCollection from '../models/CaseModel.js'
import projImg from '../middlewares/ProjImg.js'
import auth from '../middlewares/auth.js'
import * as fs from 'fs';

const router = express.Router();

router.get('/', (req, res)=>{
    CaseCollection.find({}, (err, data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
})

router.get('/topThree', (req, res)=>{
     let query = CaseCollection
            .find()
            .sort({reach: -1})
            .limit(3);

    query.exec(function (err, data){
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
})

router.get('/get/:id', (req, res)=>{
    const id = req.params.id

    CaseCollection.find({_id: id}, (err, data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
})

router.post('/delete/:id', auth, async(req, res)=>{
    const id = req.params.id;
    const img = req.body;

    CaseCollection.findByIdAndDelete({_id: id},({new:true}), (err, data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).json({message:"successfully deleted", data:data});
        }
    })
})

router.post('/update', (req, res)=>{
    const {id, amount} = req.body
    
    const update ={$inc: {reach:amount}}

    CaseCollection.findByIdAndUpdate(id, update, ({new:true}), (err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

router.post('/', auth, projImg.array('img'), async(req, res)=>{

    const files = req.files;

     const imgArray = files.map((file)=>{
        let img = file.path;

        return img;
    })

    if(req.body.titleEn==="" || req.body.titleZh==="" || req.body.titleKo==="" || req.body.goal ==="" || req.body.contentEn==="" ||
    req.body.contentZh==="" ||req.body.contentKo==="" ){

        res.status(500).json({message:"fill in all the input"})
        
    }else{
        
        var DBobj = {
            title:{
                en:req.body.titleEn,
                zh:req.body.titleZh,
                ko:req.body.titleKo
            },
            goal:req.body.goal,
            reach:0,
            content:{
                en:req.body.contentEn,
                zh:req.body.contentZh,
                ko:req.body.contentKo
            },
            img:imgArray
        }
    
        await CaseCollection.create(DBobj, (err, data)=>{
            if(err){
                res.status(501).send(err);
            }
            else{
                res.status(200).send("Success");
            }
        })
    }
})

export default router;