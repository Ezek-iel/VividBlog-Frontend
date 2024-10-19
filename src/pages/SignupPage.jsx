import { useFormik } from "formik"
import { useState } from "react"
import { TbLock, TbMail, TbStar, TbUser } from "react-icons/tb"
import { Modal, Navbar, Notification } from "../components"
import { fetchApi, validate } from '../utils'

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
                fetchApi('/users', 'POST', values)
                    .then(
                        (value) => {
                            if (value.status == 400) {
                                setIsError(true)
                            } else {
                                setIsSuccess(true)
                                setIsError(false)
                            }
                            value.json().then(
                                () => {
                                    setMessage('User already exists')
                                }
                            )
                        }
                    )
            }
        },

    )

    return (
        <>
            <Navbar />
            {
                isSuccess ?
                    (
                        <Modal>
                            <div className="content">
                                <div className="buttons is-centered">
                                    <a href="" className="button is-loading is-large">Wait for us to finish</a>
                                </div>
                                <p className="title is-1 has-text-success has-text-centered">You are signed in</p>
                            </div>
                        </Modal>
                    )
                    : null
            }
            <section className="hero is-medium">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-6">
                                <div className="box">
                                    <form action="post" onSubmit={formik.handleSubmit}>
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
                                                <input onChange={formik.handleChange} type="submit" className="button is-primary is-rounded is-fullwidth" />
                                            </div>
                                        </div>

                                    </form></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}