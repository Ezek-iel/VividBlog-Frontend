import { useFormik } from "formik"
import { useState } from "react"
import { TbLock, TbMail, TbStar, TbUser } from "react-icons/tb"
import { Navbar, Notification } from "../../components"
import { Link } from "react-router-dom"
import { fetchApi, validateSignup as validate } from '../../utils'

export function SignupPage() {

    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [message, setMessage] = useState('')

    const formik = useFormik(

        {
            initialValues: {
                username: '',
                password: '',
                title: '',
                email_address: '',
            },
            validate,
            onSubmit: values => {
                fetchApi('http://127.0.0.1:5000/api/v1/users', 'POST', values)
                    .then(
                        response => {
                            if (response.status == 400) {
                                setIsError(true)
                                setMessage("User already exists")
                            } else {
                                response.json()
                                    .then(
                                        () => {
                                            setIsSuccess(true)
                                        }
                                    )
                            }
                        }
                    )
                    .catch(
                        () => setIsError(true)
                    )
            }
        },

    )

    return (
        <>
            <Navbar />
            <section className="hero is-medium">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-6">
                                <div className="box">
                                    <form action="post" onSubmit={formik.handleSubmit} disabled>
                                        {
                                            isError ? (<Notification status="danger">
                                                {
                                                    message ? message : "Something happened on our end"
                                                }

                                            </Notification>) : null
                                        }
                                        <h1 className="title has-text-centered">Sign Up</h1>
                                        <div className="field mb-6">
                                            <div className="control has-icons-left">
                                                <span className="icon is-small is-left">
                                                    <TbUser />
                                                </span>
                                                <input onChange={formik.handleChange} id='username' type="text" className="input is-rounded" placeholder="Username" value={formik.values.username} />
                                                <p className="help is-danger">
                                                    {
                                                        formik.errors.username && formik.touched.username ? formik.errors.username : ''
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="field mb-6">
                                            <div className="control has-icons-left">
                                                <span className="icon is-small is-left">
                                                    <TbMail />
                                                </span>
                                                <input onChange={formik.handleChange} id="email_address" type="text" className="input is-rounded" placeholder="Email" value={formik.values.email_address} />
                                                <p className="help is-danger">
                                                    {
                                                        formik.errors.email_address && formik.touched.email_address ? formik.errors.email_address : ''
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="field mb-6">
                                            <div className="control has-icons-left">
                                                <span className="icon is-small is-left">
                                                    <TbLock />
                                                </span>
                                                <input onChange={formik.handleChange} id="password" type="password" className="input is-rounded" placeholder="Password" value={formik.values.password} />
                                                <p className="help is-danger">
                                                    {
                                                        formik.errors.password && formik.touched.password ? formik.errors.password : ''
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="field mb-6">
                                            <div className="control has-icons-left">
                                                <span className="icon is-small is-left">
                                                    <TbStar />
                                                </span>
                                                <input onChange={formik.handleChange} id="title" type="text" className="input is-rounded" placeholder="Title" value={formik.values.title} />
                                                <p className="help is-danger">
                                                    {
                                                        formik.errors.title && formik.touched.title ? formik.errors.title : ''
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="control">
                                                <input onChange={formik.handleChange} type="submit" className="button is-primary is-rounded is-fullwidth is-disabled" disabled={isSuccess}/>
                                            </div>
                                        </div>

                                    </form>
                                    {
                                        isSuccess ?
                                            (<Link href="" className="button is-fullwidth is-rounded is-success mt-3">Visit Dashboard </Link>)
                                            : null
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}