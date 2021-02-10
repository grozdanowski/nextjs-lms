import { useState } from 'react'
import Router from 'next/router'
import PageWrapper from 'wrappers/PageWrapper'
import { setAuthenticatedUser } from 'store/auth/actions'
import { login } from 'lib/auth'
import styleUtils from 'styles/GlobalUtils.module.scss'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


const doLogin = (email, password, setLoginInProgress) => {
  setLoginInProgress(true);
  login(email, password)
    .then((res) => {
      setLoginInProgress(false);
      Router.push('/')
    })
    .catch((error) => {
      console.log('Error while logging you in:', error);
      setLoginInProgress(false);
    }) 
}

export default function LoginView() {
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <PageWrapper redirectOnAuthenticated = '/'>
      <div className={styleUtils.centeredContentWrapper}>
        {loginInProgress ? (
          <div className={styleUtils.midMessageBox}>
            Give us a moment, we're securely logging you in...
          </div>
        ) : (
          <div className={styleUtils.midMessageBox}>
            <h1>Log in</h1>
            <div className={styleUtils.formInputsWrapper}>
              <TextField
                id='email-input'
                label='Email address'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                variant='outlined'
              />
              <TextField
                id='password-input'
                label='Password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                variant='outlined'
                type='password'
              />
              <Button
                variant='contained'
                color='primary'
                disableElevation
                onClick={() => doLogin(email, password, setLoginInProgress, setAuthenticatedUser)}
                disabled={(email && password) ? false : true}
              >
                Get me in!
              </Button>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}