import axios from 'axios'

const instance = axios.create({
    baseURL:'https://donationbackendweb.herokuapp.com',   //http://localhost:8000
})

export default instance