import React, {useEffect, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import GlobalFeed from "../globalFeed";

const Authentication = (props) => {
  const isLogin = props.match.path === '/login'
  const pageTitle = isLogin ? 'Sign In' : 'Sign Up'
  const descriptionLink = isLogin ? '/register' : '/login'
  const descriptionText = isLogin ? 'Need an account?' : 'Have an account?'
  const apiUrl = isLogin ? 'https://conduit.productionready.io/api/users/login' : 'https://conduit.productionready.io/api/users'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isSuccesfullSubmit, setIsSuccesfullSubmit] = useState(false)
  const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)

  const handleSubmit = (event) => {
    event.preventDefault()
    const user = isLogin ? {email, password} : {email, password, username}
    doFetch({
      method: 'post',
      data: {
        user
      }
    })
  }

  useEffect(() => {
    if (!response) {
      return
    }
    localStorage.setItem('token', response.user.token)
    setIsSuccesfullSubmit(true)
  }, [response])

  if (isSuccesfullSubmit) {
    return <Redirect to="/" />
  }

  return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center mb-2">{pageTitle}</h1>
              <form onSubmit={handleSubmit}>
                <fieldset>
                  {!isLogin && (
                      <fieldset className="form-group">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                      </fieldset>
                  )}

                  <fieldset className="form-group">
                    <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <p className="text-xs-left">
                      <Link to={descriptionLink}>{descriptionText}</Link>
                    </p>
                    <button
                        className="btn btn-lg btn-primary pull-xs-right"
                        type="submit"
                        disabled={isLoading}
                    >
                      {pageTitle}
                    </button>
                  </fieldset>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Authentication;
