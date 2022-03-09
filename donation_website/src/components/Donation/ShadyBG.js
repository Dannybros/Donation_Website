import React from 'react'
import './shadyBG.css'

function ShadyBG(props) {
    return (
        <main className="ShadyBG" onClick={props.click}>
            <div>Hello</div>
        </main>
    )
}

export default ShadyBG
