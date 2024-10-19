import { useEffect, useState } from 'react'
import { Hero, BlogCard, Notification } from '../components'
import { fetchApi } from '../utils'

const SERVER_URL = 'http://127.0.0.1:5000/api/v1'

export function BlogsPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [blogs, setBlogs] = useState({})

    useEffect(
        () => {
            fetchApi(`${SERVER_URL}/blogs`)
                .then(
                    response => {
                        response.json()
                            .then(
                                value => {
                                    setBlogs(value)
                                    setIsLoading(false)
                                }
                            )
                            .catch(() => setIsError(true))
                    }
                )
                .catch(() => setIsError(true))
        }, []
    )

    if (isError) {
        return (
            <Hero>
                <div className="container mt-6">
                    <Notification status='danger' hasButton={false}>
                        <p className=" has-text-centered is-size-1 has-text-danger-20">
                            Something wrong happened on our end
                            <br />
                            <strong>Try reloading the page</strong>
                        </p>
                    </Notification>
                </div>
            </Hero>
        )
    }

    else if (isLoading) {
        return (
            <Hero>
                <p className="title has-text-centered">Our awesome blogs</p>
                <div className="container">
                    <div className="box skeleton-block"></div>
                </div>
            </Hero>
        )
    }
    return (
        <>
            <Hero>
                <div className="container">
                    <p className="title has-text-centered mb-6">Our awesome blogs</p>
                    <BlogCards blogs={blogs.blogs}></BlogCards>
                </div>
            </Hero>
        </>
    )
}

export function BlogCards({ blogs }) {
    return (
        <div className="columns is-multiline">
            {
                blogs.map(
                    (item, index) => (
                        <BlogCard blog={item} key={index} />
                    )
                )
            }
        </div>
    )
}