import React, { FunctionComponent } from 'react'
import withWidth, { isWidthUp, WithWidth } from '@material-ui/core/withWidth'
import MobileOnboarding from './MobileOnboarding'
import WebOnboarding from './WebOnboarding'

type Props = {
  onDone: () => void
} & WithWidth

const Onboarding: FunctionComponent<Props> = props => {
  return isWidthUp('sm', props.width) ? (
    <WebOnboarding onDone={props.onDone} />
  ) : (
    <MobileOnboarding onDone={props.onDone} />
  )
}

export default withWidth()(Onboarding)
