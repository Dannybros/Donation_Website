import React, {useState, useEffect} from 'react'
import './Scroll.css'
import backTop from '../../../img/backtop.png'

function ScrollTop() {

    const [isVisible, setIsVisible] = useState(false)

    const scrollTop = () =>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }
    
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 400) {
            setIsVisible(true);
            } else {
            setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility)
        
        return () => {
            window.removeEventListener('scroll', toggleVisibility)
        }
    }, [])

    return (
        <>
        {isVisible &&
        
        <div className="scroll" onClick={scrollTop}>
            <img src={backTop} alt="scrollToTop"/>
        </div>
        }
        </>
    )
}

export default ScrollTop
