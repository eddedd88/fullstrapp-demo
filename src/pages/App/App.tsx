import React, { FunctionComponent, useState } from 'react'
import BottomNavBar from './BottomNavBar'
import { Switch, Route, Redirect } from 'react-router'
import FeedPageContainer from '../../containers/FeedPageContainer'
import GridPageContainer from '../../containers/GridPageContainer'
import ProfilePageContainer from '../../containers/ProfilePageContainer'
import paths from '../routes'
import Onboarding from '../Onboarding'
import FeedItemPageContainer from '../../containers/FeedItemPageContainer'

const onboardingKey = 'alreadyOnboarded'

const initialNeedOnboarding = !window.localStorage.getItem(onboardingKey)

const App: FunctionComponent = () => {
  const [needOnboarding, setNeedOnboarding] = useState<boolean>(
    initialNeedOnboarding
  )

  const handleFinishOnboarding = () => {
    window.localStorage.setItem(onboardingKey, 'true')
    setNeedOnboarding(false)
  }

  return needOnboarding ? (
    <Onboarding onDone={handleFinishOnboarding} />
  ) : (
    <>
      <div style={{ marginBottom: 64 }}>
        <Switch>
          <Route path={paths.feedItem} component={FeedItemPageContainer} />
          <Route path={paths.feed} component={FeedPageContainer} />
          <Route path={paths.grid} component={GridPageContainer} />
          <Route
            path={paths.profileFeedItem}
            component={FeedItemPageContainer}
          />
          <Route path={paths.profile} component={ProfilePageContainer} />
          <Redirect to={paths.feed} />
        </Switch>
      </div>
      <BottomNavBar />
    </>
  )
}

export default App
