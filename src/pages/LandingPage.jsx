import { TbPencilBolt, TbSearch, TbTimelineEventText } from "react-icons/tb"
import { Navbar, Notification, BlogCard,} from "../components"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchApi } from "../utils.js"


function LandingCards() {

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [blogs, setBlogs] = useState();

    useEffect(
        () => {
            fetchApi('http://127.0.0.1:5000/api/v1/blogs?itemsPerPage=3', 'GET')
                .then(response => response.json())
                .then(data => {
                    setBlogs(data)
                    setIsLoading(false)
                })
                .catch(() => {
                    setIsError(true)
                    setIsLoading(false)
                })
        }, []
    )

    if (isLoading) {
        return (
            <div className="container skeleton-block">

            </div>
        )
    }

    if (isError) {
        return (
            <Notification status='danger mt-5'>
                <p className="has-text-centered has-text-danger-95 m-4 is-size-3">Failed to fetch blogs</p>
            </Notification>
        )
    }
    return (
      <>
      {
        blogs.blogs.map(
            (item) => {
                return (
                    <BlogCard key={item.id} blog={item} />
                )
            }
        )
      }
      </>
    )
}
export function LandingPage() {


    return (
        <>
            <Navbar />
            <section className="hero is-fullheight-with-navbar">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-8 has-text-centered">
                                <p className="title is-1 has-text-centered">Welcome to Vividblog</p>
                                <p className="subtitle is-4 has-text-centered">High quality <strong className="has-text-primary has-text-weight-bold">Free</strong> Blogs</p>
                                <div className="field">
                                    <div className="control has-icons-left is-medium">
                                        <span className="icon is-small is-left">
                                            <TbSearch />
                                        </span>
                                        <input type="text" className="input is-rounded" placeholder="Search for Blog" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="columns is-centered">
                                <LandingCards />
                            </div>
                            <div className="buttons is-centered mt-5">
                                <Link className="button is-large is-rounded is-primary" to="/blogs">
                                    <span className="icon">
                                      <TbTimelineEventText/>
                                    </span>
                                    <span>View all Blogs</span>
                                </Link>
                                <Link className="button is-large is-rounded is-light is-primary is-outlined" to="/signup">
                                    <span className="icon">
                                      <TbPencilBolt/>
                                    </span>
                                    <span>Write your own Blog</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}