import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {Helmet} from 'react-helmet-async'

function ErrorPage() {

    const history = useHistory();
    const [counter, setCounter] = useState(4);

    useEffect(() => {
        counter > 0 ? setTimeout(() => setCounter(counter - 1), 1000) : history.replace('/Home');
    }, [counter, history])

    return (
        <div>
            <Helmet>
                <title>Error Page 404</title>
            </Helmet>
            <h1>404, Page is not found!</h1>
            <h5>Will redirect to Home page <span style={{color:'blue', borderBottom:"1px solid blue"}}>{counter}</span> </h5>
        </div>
    )
}

export default ErrorPage
