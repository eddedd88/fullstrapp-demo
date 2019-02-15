import React, { FunctionComponent, useEffect, useState } from 'react'
import ProfilePage from '../../pages/ProfilePage'
import analytics from '../../analytics'
import firebase from '../../firebase'
import { RouteComponentProps } from 'react-router'

const ProfilePageContainer: FunctionComponent<RouteComponentProps> = props => {
  const [statusIsKnown, setStatusIsKnown] = useState<boolean>(false)

  useEffect(() => {
    analytics.pageViewed({
      pageTitle: 'Profile',
      pagePath: '/profile'
    })

    return firebase.auth().onAuthStateChanged(user => {
      console.log(user)
      setStatusIsKnown(true)
    })
  }, [])

  return <ProfilePage statusIsKnown={statusIsKnown} />
}

export default ProfilePageContainer
