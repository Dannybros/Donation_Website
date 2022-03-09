import React from 'react'
import './notification.css'
import ErrorOutlineSharpIcon from '@material-ui/icons/Error';

function Notification(props) {
    return (
        <main className="notification">
            <div className="notification-Box">
                    <section>
                        <ErrorOutlineSharpIcon className="errorIcon"/>
                        <div>
                            <p>{props.header}</p>
                            <p>{props.children}</p>
                        </div>
                    </section>
                <button>OK</button>
            </div>
        </main>
    )
}

export default Notification
