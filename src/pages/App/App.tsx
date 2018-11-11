import React, { Component } from 'react'
import BottomNavBar from './BottomNavBar'
import { Switch, Route, Redirect } from 'react-router'
import FeedPageContainer from '../../containers/FeedPageContainer'
import GridPageContainer from '../../containers/GridPageContainer'
import ProfilePageContainer from '../../containers/ProfilePageContainer'
import paths from '../routes'
import Onboarding from '../Onboarding'
import FeedItemPageContainer from '../../containers/FeedItemPageContainer'

const onboardingKey = 'alreadyOnboarded'
type State = {
  needOnboarding: boolean
}

class App extends Component<{}, State> {
  state = {
    needOnboarding: !window.localStorage.getItem(onboardingKey)
  }

  handleFinishOnboarding = () => {
    window.localStorage.setItem(onboardingKey, 'true')
    this.setState({
      needOnboarding: false
    })
  }

  render() {
    const { needOnboarding } = this.state

    return needOnboarding ? (
      <Onboarding onDone={this.handleFinishOnboarding} />
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
}

export default App
