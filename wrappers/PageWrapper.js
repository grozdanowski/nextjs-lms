import React, {useEffect} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setAuthenticatedUser } from 'store/auth/actions'
import { setCurrentUserData, clearCurrentUserData } from 'store/user/actions'
import { getJwtToken } from 'lib/auth'
import styles from './PageWrapper.module.scss'
import PublicNav from 'components/layout/PublicNav'

const redirectUser = (userAuthenticated, redirectOnAuthenticated, restrictToAuthenticated) => {
  if (userAuthenticated) {

    if (redirectOnAuthenticated) {
      Router.push(redirectOnAuthenticated);
    }
  } else if (restrictToAuthenticated) {
    Router.push('/login')
  }
}


const PageWrapper = ({ setAuthenticatedUser, setCurrentUserData, clearCurrentUserData, userAuthenticated, userData, redirectOnAuthenticated = false, restrictToAuthenticated = false, children }) => {

  useEffect(() => { 
    redirectUser(userAuthenticated, redirectOnAuthenticated, restrictToAuthenticated);
    getJwtToken()
      .then((res) => {
        console.log('token result', res);
        if (res && !userAuthenticated) {
          // if token found and valid but redux state not authenticated
          setAuthenticatedUser({ userAuthenticated: true, tokenInfo: res })
          setCurrentUserData(res.preferred_username)
        } else if (!res && userAuthenticated) {
          // if token not found or expired and redux in authenticated state
          setAuthenticatedUser({ userAuthenticated: false, tokenInfo: {} })
          clearCurrentUserData()
        };
        redirectUser(res, redirectOnAuthenticated, restrictToAuthenticated);
      })
      .catch((error) => {
        console.log('Error checking the JWT token and setting the user.', error);
      })    
  }
  , []);

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.headerWrapper}>
        <PublicNav userAuthenticated = {userAuthenticated} userData = {userData} />
      </header>
      <main className={styles.contentWrapper}>
        {children}
      </main>
    </div>
  )
}

const mapStateToProps = (state) => ({
  userAuthenticated: state.auth.userAuthenticated,
  userData: state.user.userData,
})

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthenticatedUser: bindActionCreators(setAuthenticatedUser, dispatch),
    setCurrentUserData: bindActionCreators(setCurrentUserData, dispatch),
    clearCurrentUserData: bindActionCreators(clearCurrentUserData, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper)