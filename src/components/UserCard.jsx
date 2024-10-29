import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchApi } from "../utils"
import Avvvatars from "avvvatars-react"

export function UserList({userId}) {

    const [user, setUser] = useState({})
    useEffect(
        () => {
            fetchApi(`http://127.0.0.1:5000/api/v1/users/${userId}`)
            .then(
                response => response.json()
                .then(
                    value => setUser(value)
                )
            )
        }, [userId]
    )
    return (
        <div className="card">
            <div className="card-content">
                <div className="content">
                    <div className="is-flex mb-2">
                        <Avvvatars value={user['email_address']}/>
                        <p className="ml-2 title is-3">{user.username}</p>
                    </div>
                    <p className="subtitle is-4">{user.title}</p>
                    <Link className="button is-fullwidth is-primary" to={`/users/${user.id}#top`}>Visit</Link>
                </div>
            </div>
        </div>
    )
}