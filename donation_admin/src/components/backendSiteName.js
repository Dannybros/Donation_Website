import axios from 'axios'

const instance = axios.create({
    baseURL:'http://localhost:8000', //https://donationdata.herokuapp.com
})

instance.interceptors.request.use((req)=>{
    if(localStorage.getItem('AuthToken')){
        req.headers['authorization'] = `Bearer ${localStorage.getItem('AuthToken')}`;
    }
    return req;
})

export default instance;
