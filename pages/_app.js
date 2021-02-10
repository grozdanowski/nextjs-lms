import { wrapper } from 'store'
import 'styles/BaseStyles.scss'
import { getAuthenticatedUser } from 'store/auth/actions'

const WrappedApp = ({ Component, pageProps }) => {
    
  return <Component {...pageProps} />

}

export default wrapper.withRedux(WrappedApp)