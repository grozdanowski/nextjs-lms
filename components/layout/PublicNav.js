import Link from 'next/link'
import styles from './PublicNav.module.scss'

export default function PublicNav({ userAuthenticated, userData }) {

  return (
    <nav className={styles.navbarContainer}>
      <Link href='/'>
        <a className={styles.headerLogo}>
          <span>My</span>LMS
        </a>
      </Link>
      <div className={styles.navbarMenu}>
        {userAuthenticated ? [
          <span key='greeting'>Hey, {userData.name}!</span>,
          <Link key='dashboard-link' href='/dashboard'>
            <a className={styles.navItem}>My Dashboard</a>
          </Link>,
          <Link key='logout-link' href='/logout'>
            <a className={styles.navItem}>Sign Out</a>
          </Link>
        ] : [
          <Link key='login-link' href='/login'>
            <a className={styles.navButton}>Log in</a>
          </Link>,
          <Link key='register-link' href='/register'>
            <a className={styles.navItem}>Register</a>
          </Link>
        ]}
      </div>
    </nav>
  )
}