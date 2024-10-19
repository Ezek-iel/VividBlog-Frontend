import { useState } from "react"


export function Notification(props) {

    const [isDisplayed, setIsDisplayed] = useState(true)
    const closeNotification = () => {
        setIsDisplayed(false)
    }
    if (isDisplayed) {
        return (
            <div className={`notification is-${props.status}`}>
                {
                    props.hasButton ?
                        (<button className="delete" onClick={closeNotification}></button>) : null
                }

                {props.children}
            </div>
        )

    }
}