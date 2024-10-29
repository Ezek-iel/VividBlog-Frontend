import { useEffect, useState } from "react"
import { Hero, BlogCard, UserList } from "../../components"
import { fetchApi, isLoggedIn } from "../../utils"
import { TbUsers, TbStar } from "react-icons/tb"
import { useParams } from "react-router-dom"

export function SingleUserPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState({})

    const { id } = useParams()
    const userUrl = `http://127.0.0.1:5000/api/v1/users/${id}`
    useEffect(
        () => {
            fetchApi(userUrl)
                .then(
                    response => response.json()
                        .then(
                            (value) => {
                                setIsLoading(false)
                                setUser(value)
                            }
                        )
                )
        }, [userUrl]
    )

    if (isLoading) {
        return (
            <Hero size="fullheight">
                <div className="container skeleton-block">

                </div>
            </Hero>
        )
    }

    isLoggedIn()
    .then(
        value => console.log(value)
    )
    return (
        <Hero size="medium" id='#top' >
            <div className="container">
                <div className="content has-text-centered">
                    <p className="title is-1">{user.username}</p>
                    <p className="subtitle is-4">{user.title}</p>
                    <p className="has-text-primary">{user.email_address}</p>
                    <span className="icon-text">
                        <span className="icon is-size-1">
                            <TbUsers />
                        </span>
                        <span>{user['followers_list'].length} followers</span>
                    </span>
                    <div className="buttons is-centered mt-4">
                        <button className="button is-large is-rounded is-primary is-outlined">
                            <span className="icon">
                                <TbStar />
                            </span>
                            <span>Follow</span>
                        </button>
                    </div>
                </div>
                <UserBlogs url={userUrl} />
                <div className="container">
                    <p className="subtitle is-2">Followers</p>
                    <div className="columns is-centered">
                        <div className="column is-7">
                            {
                                user['followers_list'].map(
                                    (item, index) => (
                                        <UserList userId={item} key={index}></UserList>
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
                <UserList />

            </div>
        </Hero>
    )
}

function UserBlogs(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [blogs, setBlogs] = useState({})



    useEffect(
        () => {
            fetchApi(`${props.url}/blogs`)
                .then(
                    response => response.json()
                        .then(

                            value => {
                                setIsLoading(false)
                                setBlogs(value)
                            }
                        )
                )
        }, [props.url]
    )

    if (isLoading) {
        return (
            <div className="block skeleton-block">

            </div>
        )
    }

    return (
        <div className="mt-5 columns is-multiline">
            {
                blogs.map(
                    (item) => (
                        <BlogCard blog={item} key={item.id} />
                    )
                )
            }
        </div>
    )
}