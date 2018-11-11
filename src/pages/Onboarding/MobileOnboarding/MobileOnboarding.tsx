import React, { Component } from 'react'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import createStyles from '@material-ui/core/styles/createStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import MobileStepper from '@material-ui/core/MobileStepper'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'
import Image1 from '../../../assets/cassie-boca-293379-unsplash.jpg'
import Image2 from '../../../assets/dan-freeman-404566-unsplash.jpg'
import Image3 from '../../../assets/fabio-mangione-236846-unsplash.jpg'
import Image4 from '../../../assets/tommy-lisbin-276996-unsplash.jpg'

const maxSteps = 4
const styles = (theme: Theme) =>
  createStyles({
    swipeableViews: {
      height: '100%'
    },
    stepWrapper: {
      overflow: 'hidden',
      width: '100%',
      height: '100%'
    },
    doneButton: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit
    },
    img: {
      height: '100%'
    }
  })

type Props = {
  onDone: () => void
} & WithStyles<typeof styles>

type State = {
  activeStep: number
}

class SwipeableTextMobileStepper extends Component<Props, State> {
  state = {
    activeStep: 0
  }

  handleNext = () => {
    const { onDone } = this.props

    if (this.state.activeStep < maxSteps - 1) {
      this.setState(prevState => ({
        activeStep: prevState.activeStep + 1
      }))
    } else {
      onDone()
    }
  }

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1
    }))
  }

  handleStepChange = (activeStep: number) => {
    this.setState({ activeStep })
  }

  render() {
    const { classes } = this.props
    const { activeStep } = this.state

    return (
      <>
        <SwipeableViews
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          className={classes.swipeableViews}
        >
          <div className={classes.stepWrapper}>
            <img className={classes.img} src={Image1} alt='Mountains' />
          </div>

          <div className={classes.stepWrapper}>
            <img className={classes.img} src={Image2} alt='City Lights' />
          </div>

          <div className={classes.stepWrapper}>
            <img className={classes.img} src={Image3} alt='River' />
          </div>

          <div className={classes.stepWrapper}>
            <img className={classes.img} src={Image4} alt='Beach' />
          </div>
        </SwipeableViews>

        <MobileStepper
          steps={maxSteps}
          position='bottom'
          activeStep={activeStep}
          nextButton={
            <Button
              size='small'
              onClick={this.handleNext}
              className={activeStep === maxSteps - 1 ? classes.doneButton : ''}
            >
              {activeStep < maxSteps - 1 ? 'Next' : 'Done'}
              {activeStep < maxSteps - 1 && <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button
              size='small'
              onClick={this.handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      </>
    )
  }
}

export default withStyles(styles)(SwipeableTextMobileStepper)
