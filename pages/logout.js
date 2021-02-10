import PageWrapper from 'wrappers/PageWrapper'
import Router from 'next/router'
import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setLogout } from 'store/auth/actions'
import { logout } from 'lib/auth'
import styleUtils from 'styles/GlobalUtils.module.scss'

const LOGOUT_SUCCESS_REDIRECT_TIMEOUT = 3000;

const LogoutView = ({ setLogout }) => {
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  useEffect(() => { 
    logout()
    .then((res) => {
      setLogout();
      setLogoutSuccess(true);
      setTimeout(() => {
        Router.push('/')
      }, LOGOUT_SUCCESS_REDIRECT_TIMEOUT)
    })
    .catch((error) => {
      console.log('Error while logging you out:', error);
    }) 
  }
  , []);

  return (
    <PageWrapper>
      <div className={styleUtils.centeredContentWrapper}>
        <div className={styleUtils.midMessageBox}>
          {!logoutSuccess ? (
            <span>Logging you out...</span>
          ) : (
            <span>Logged out</span>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLogout: bindActionCreators(setLogout, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(LogoutView)