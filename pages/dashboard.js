import { authenticatedFetch } from 'lib/authenticatedFetch'
import React, {useEffect, useState} from 'react'
import PageWrapper from 'wrappers/PageWrapper'
import styleUtils from 'styles/GlobalUtils.module.scss'

export default function Dashboard() {

  const [fetchingData, setFetchingData] = useState(true);
  const [fetchedCourses, setFetchedCourses] = useState([]);

  useEffect(() => { 
    authenticatedFetch('/api/enrollment/v1/enrollment')
      .then((res) => {
        setFetchingData(false);
        setFetchedCourses(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log('Error while fetching data:', error);
      }) 
  }
  , []);

  return (
    <PageWrapper restrictToAuthenticated = {true}>
      {fetchingData ? (
        <div className={styleUtils.centeredContentWrapper}>
          <div className={styleUtils.midMessageBox}>
            <span>Fetching your data...</span>
          </div>
        </div>
      ) : (
        <div className={styleUtils.dashboardContainer}>
          <h1>My Dashboard</h1>
          <h3>Your courses are:</h3>
          {fetchedCourses.map((course, index) => {
            return (
              <article key={`course-${index}`}>
                <h4>{course.course_details.course_name}</h4>
                <span>{course.course_details.course_id}</span>
              </article>
            )
          })}
        </div>
      )}
    </PageWrapper>
  )
}