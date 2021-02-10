import Head from 'next/head'
import { connect } from 'react-redux'
import styleUtils from 'styles/GlobalUtils.module.scss'
import PageWrapper from 'wrappers/PageWrapper'

function Home({ userAuthenticated, userData }) {
  return (
    <PageWrapper>
      <div className={styleUtils.centeredContentWrapper}>
        {userAuthenticated ? (
          <h1 className={styleUtils.largeTextMessage}>Welcome to your LMS, <span>{userData.name}!</span></h1>
        ) : (
          <h1 className={styleUtils.largeTextMessage}>Welcome to <span>your</span> LMS!</h1>
        )}
      </div>
    </PageWrapper>
  )
}

const mapStateToProps = (state) => ({
  userAuthenticated: state.auth.userAuthenticated,
  userData: state.user.userData,
})

export default connect(mapStateToProps, null)(Home)