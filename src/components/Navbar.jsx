import { Link } from "react-router-dom"

export function Navbar(){
    return (
        <nav className="navbar mt-4 mx-6 is-mobile" role="navigation" aria-label="main navigation">
          <div id="navbarBasicExample" className="navbar-menu">
        
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <Link  to="/signup"  className="button is-primary">
                    <strong>Sign up</strong>
                  </Link>
                  <a className="button is-light">
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
    )
}