import {useState, useEffect} from 'react'

function CounterUp({children, duration =2000}) {

    const easeOutQuad = t => t * (2 - t);
    const frameDuration = 1000/60

    const countTo = parseInt(children, 10);
    const [count, setCount] = useState(0)   

    useEffect(() => {
        
        let frame =0;
        
        const totalFrames = Math.round(duration/frameDuration);

        const counter = setInterval(()=>{
            frame++;

            const progress = easeOutQuad(frame/frameDuration)

            setCount(countTo * progress)

            if(frame === totalFrames) clearInterval(counter)

        }, frameDuration)

    }, [countTo, duration, frameDuration])

    return Math.floor(count)
}

export default CounterUp
