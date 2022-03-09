import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import donation from './routes/Donation.js'
import news from './routes/News.js'
import cases from './routes/Cases.js'
import signIn from './routes/SignIn.js'
import stripe from './routes/Stripe.js'
import paypal from './routes/Paypal.js'
import fs from 'fs'

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// connect to mongodb  //connection_url    //MONGODB_URI
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true, 
})
mongoose.connection.on("connected", ()=>{
    console.log("Mongoose is connected");
})

// // nodejs create backend and cors
// const whitelist = ['http://localhost:5000', 'http://localhost:3000'];

// var corsOptionsDelegate = function (req, callback) {
//     var corsOptions;
//     if (whitelist.indexOf(req.header('Origin')) !== -1) {
//         corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//     }else{
//         corsOptions = { origin: false } // disable CORS for this request
//     }
  
//     callback(null, corsOptions)
// }
app.use(cors())

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));


// multer storage folders
app.use('/news-image', express.static('news-image'))
app.use('/project-image', express.static('project-image'))


// endpoints
app.use('/donation', donation)
app.use('/stripe', stripe)
app.use('/news', news)
app.use('/cases', cases)
app.use('/signIn', signIn)
app.use('/paypal', paypal)

app.get('/promo/images/:length', (req, res)=>{

    const len = req.params.length
    
    let array = [];
    var files = fs.readdirSync('./project-image/promo-image/')

    function checkIfValueContain() {
        let result = files[Math.floor(Math.random() * files.length)];

        if(array.includes(result)){
            checkIfValueContain()
        }else{
            array.push(result)
        }
    }

    for(var i =0; i<len; i++){
        checkIfValueContain();
    }

    res.send(array);
})


app.get('/', (req, res)=>{
    res.send("Hello World");
})

app.listen(port, ()=>console.log(`Server starting in port ${port}`));