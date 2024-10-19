import { TbMessage } from "react-icons/tb"
import { fetchApi } from "../utils"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export function BlogCard({blog}) {
    
    const [authorName, setAuthorName] = useState('')

    useEffect(
        () => {
            fetchApi(blog.author_url)
            .then(
                response => response.json()
                .then(
                    value => setAuthorName(value.username)
                )
            )
        }, [blog.author_url]
    )
    return (
        <div className="column is-4">
            <div className="card">
                <div className="card-content">
                    <div className="content">
                        <p className="title is-4 has-text-centered">{blog.title}</p>
                        <div className="is-flex is-justify-content-space-between">
                            <div>
                                <span className="icon">
                                  <TbMessage/>
                                </span>
                                {blog.comments_number}
                            </div>
                            <p className="text">Written by <a href="">{authorName}</a></p>
                        </div>
                        <Link className="button is-fullwidth mt-3 is-primary is-rounded" to={`/blogs/${blog.id}`}>Read</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
