import axios from 'axios'

const instance = axios.create({
    baseURL:'http://localhost:8000',   //http://localhost:8000  //https://donationbackendweb.herokuapp.com
})

export default instance