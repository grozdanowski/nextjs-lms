import PageWrapper from 'wrappers/PageWrapper'
import { getUserData } from 'lib/user'

export default function Login() {

  getUserData('test')
    .then((res) => {
      console.log('data is', res);
    })
    .catch((err) => {
      console.log('Error is', err)
    })

  return (
    <PageWrapper restrictToAuthenticated = '/login'>
      <div>
        Secret page
      </div>
    </PageWrapper>
  )
}