import { Link, useNavigate } from "react-router-dom"
import { TbHomeFilled, TbPencilBolt, TbSettingsHeart } from "react-icons/tb"
import { useEffect, useState } from "react"
import { fetchApi } from "../utils"
import Avvvatars from "avvvatars-react"

export function Navbar() {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState({})

  function handleLogout() {
    fetchApi('http://127.0.0.1:5000/api/v1/auth/logout', 'POST')
      .then(
        response => response.json()
          .then(
            () => {
              localStorage.removeItem('vividblog_access_token')
              localStorage.removeItem('vividblog_current_user')
              navigate('/home')
            }
          )
      )
  }

  useEffect(
    () => {
      if (!localStorage.getItem('vividblog_access_token')) {
        setIsLoggedIn(false)
      }

      if (!localStorage.getItem('vividblog_current_user')) {
        return;
      }
      const userId = localStorage.getItem('vividblog_current_user')
      fetchApi(`http://127.0.0.1:5000/api/v1/users/${userId}`, 'GET')
        .then(
          response => response.json()
            .then(
              value => {
                setIsLoggedIn(true);
                setUserInfo(value);
              }
            )
        )
    }, []
  )

  return (
    <nav className="navbar mt-4 mx-6 is-mobile" role="navigation" aria-label="main navigation">
      <div id="navbarBasicExample" className="navbar-menu">

        <div className="navbar-start">
          <Link to={'/home'} className="navbar-item has-radius-rounded">
            <span className="icon-text">
              <span className="icon is-size-1">
                <TbHomeFilled />
              </span>
              <span className="is-size-3">VividBlog</span>
            </span>
          </Link>
        </div>

        <div className="navbar-end">
          {
            isLoggedIn ?
              (
                <>
                  <div className="navbar-item">
                    <Link to={'/create'} className="button is-primary is-rounded mr-2">
                        <span className="icon">
                          <TbPencilBolt/>
                        </span>
                        <span>Write Blog</span>
                      </Link>
                  </div>

                  <div className="navbar-item has-dropdown is-hoverable mt-3 mr-5">
                    <Link>
                      <Avvvatars value={userInfo['email_address']} ></Avvvatars>
                    </Link>
                    <p className="mt-1">{userInfo.username}</p>

                    <div className="navbar-dropdown">
                      <a href="" className="navbar-item">
                        <span className="icon-text">
                          <span className="icon is-size-5">
                            <TbSettingsHeart />
                          </span>
                          <span>Settings</span>
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="buttons">
                    <a href="" className="button is-light" onClick={handleLogout}><strong>Log out</strong></a>
                  </div>
                </>
              )
              :
              (
                <>
                  <Link to="/signup" className="button is-primary mr-2">
                    <strong>Sign up</strong>
                  </Link>
                  <Link className="button is-light" to={'/login'}>
                    <strong>Log in</strong>
                  </Link>
                </>
              )
          }
        </div>
      </div>
    </nav>
  )
}