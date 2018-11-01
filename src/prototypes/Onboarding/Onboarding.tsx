import React, { Component } from 'react'
import withWidth, { isWidthUp, WithWidth } from '@material-ui/core/withWidth'
import MobileOnboarding from '../MobileOnboarding'
import WebOnboarding from '../WebOnboarding'

type Props = {
  onDone: () => void
} & WithWidth

class Onboarding extends Component<Props> {
  render() {
    const { onDone, width } = this.props

    return isWidthUp('sm', width) ? (
      <WebOnboarding onDone={onDone} />
    ) : (
      <MobileOnboarding onDone={onDone} />
    )
  }
}

export default withWidth()(Onboarding)
