import { useEffect, useState } from "react";
import { Hero, Notification } from "../components";
import { TbHeart, TbMessage, TbMessageHeart, TbPencilBolt } from "react-icons/tb";
import { fetchApi } from "../utils";
import { useParams } from "react-router-dom";

export function SingleBlogPage() {
    const [blog, setBlog] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
     
    const {id} = useParams()
    useEffect(
        () => {
            fetchApi(`http://127.0.0.1:5000/api/v1/blogs/${id}`, 'GET')
                .then(
                    response => response.json()
                        .then(
                            (value) => {
                                setIsLoading(false)
                                setBlog(value)
                            }
                        )
                        .catch(
                            () => setIsError(true)
                        )
                )
                .catch(
                    () => setIsError(true)
                )
        }, [id]
    )

    if (isError){
        return (
            <div className="container">
                <Hero size="fullheight">
                    <div className="container">
                        <Notification status='danger'>
                            <p className="is-size-3 has-text-centered">
                                Something wrong happened on our end. 
                                <br />
                                <strong className="has-text-danger-20">Please refresh the page</strong>
                            </p>
                        </Notification>
                    </div>
                </Hero>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="container">
                <Hero size="fullheight">
                    <div className="container">
                        <div className="section is-large skeleton-block">

                        </div>
                    </div>
                </Hero>
            </div>
        )
    }

    return (
        <>
            <div className="container">
                <Hero size='small'>
                    <Blog blog={blog} />
                    <Comments comments={blog.comments_url} />
                </Hero>
            </div>
        </>
    )
}

function Blog({ blog }) {
    return (
        <div className="box">
            <div className="content">
                <span className="icon-text is-size-2 has-text-weight-semibold">
                    <TbPencilBolt />
                    <span className="mt-2">{blog.title}</span>
                </span>
                <hr />
                <p>{blog.introduction}</p>
                <p className="is-underlined has-text-info has-text-weight-semibold">Ingredients Involved</p>
                <ul>
                    {
                        blog['ingredients_involved'].map(
                            (item, index) => (
                                <li key={index} >{item}</li>
                            )
                        )
                    }
                </ul>
                <p className="is-underlined has-text-info has-text-weight-semibold">Steps Involved</p>
                <ul>
                    {
                        blog['steps_involved'].map(
                            (item, index) => (
                                <li key={index} >{item}</li>
                            )
                        )
                    }
                </ul>
                <br />
                <p>{blog.conclusion}</p>
                <p className="is-underlined">Written by <a href="" className="has-text-success">Someone</a></p>
                <div className="buttons mt-5">
                    <a className="button is-medium">
                        <span className="icon">
                            <TbHeart />
                        </span>
                        <span>{blog.likes} Likes</span>
                    </a>
                    <a className="button is-medium">
                        <span className="icon">
                            <TbMessage />
                        </span>
                        <span>{blog['comments_number']} Comments </span>
                    </a>
                </div>
            </div>
        </div>
    )
}

function Comments({ comments }) {

    const [isLoading, setIsLoading] = useState(true)
    const [blogComments, setBlogComments] = useState({})

    useEffect(
        () => {
            fetchApi(comments, 'GET')
                .then(
                    response => response.json()
                        .then(
                            value => {
                                setIsLoading(false)
                                setBlogComments(value)
                            }
                        )
                )
        }, [comments]
    )

    if (isLoading) {
        return (
            <div className="box skeleton-block">

            </div>
        )
    }
    return (
        <div className="box mt-4">
            <span className="icon-text is-size-3 has-text-weight-semibold">
                <TbMessageHeart />
                <span className="mt-2">Comments</span>
            </span>
            <div className="mt-5">
                {
                    blogComments.comments.map(
                        (item) => (

                            <div className="box" key={item.id}>
                                <div className="content">
                                    {item.message}
                                    <p className="help is-primary">Written at <strong>{item['date_written']}</strong> by <strong>Author</strong></p>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}