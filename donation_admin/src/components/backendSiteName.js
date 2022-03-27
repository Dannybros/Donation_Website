import axios from 'axios'

const instance = axios.create({
    baseURL:'https://donationbackendweb.herokuapp.com',
})

instance.interceptors.request.use((req)=>{
    if(localStorage.getItem('AuthToken')){
        req.headers['authorization'] = `Bearer ${localStorage.getItem('AuthToken')}`;
    }
    return req;
})

export default instance;
