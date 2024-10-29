import { TbMessage } from "react-icons/tb"
import { Link } from "react-router-dom"


export function BlogCard({blog}) {
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
                            <p className="text">Written by <Link to={`/users/${blog.author_id}`}>{blog['author_name']}</Link></p>
                        </div>
                        <Link className="button is-fullwidth mt-3 is-primary is-rounded" to={`/blogs/${blog.id}`}>Read</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
