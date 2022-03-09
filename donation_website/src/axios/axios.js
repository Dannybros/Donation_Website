import axios from 'axios'

const instance = axios.create({
    baseURL:'http://localhost:8000',   //https://donationdata.herokuapp.com
})

export default instance
export const url = 'http://localhost:8000/' //http://localhost:8000