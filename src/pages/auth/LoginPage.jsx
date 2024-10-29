import { fetchApi, validateLogin as validate } from "../../utils"
import { useFormik } from "formik"
import { Navbar } from "../../components"
import { TbUser, TbLock } from "react-icons/tb"
import { useNavigate } from "react-router-dom"


export function LoginPage() {


    const navigate = useNavigate()
    const formik = useFormik(

        {
            initialValues: {
                username: '',
                password: '',
            },
            validate,
            onSubmit(values) {
                fetchApi('http://127.0.0.1:5000/api/v1/auth/login', 'POST', values)
                    .then(
                        response => response.json()
                    )
                    .then(
                        value => {
                            localStorage.setItem('vividblog_access_token', value['access_token'])
                            localStorage.setItem('vividblog_current_user', value['user_id'])
                            navigate('/home')                            
                        }
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
                                        <h1 className="title has-text-centered">Log in</h1>
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
                                        <div className="field">
                                            <div className="control">
                                                <input onChange={formik.handleChange} type="submit" className="button is-primary is-rounded is-fullwidth is-disabled" />
                                            </div>
                                        </div>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}