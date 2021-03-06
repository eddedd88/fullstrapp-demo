import React, { FunctionComponent, useState } from 'react'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import createStyles from '@material-ui/core/styles/createStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Wrapper from '../../../components/Wrapper'
import AppBar from '../../../components/AppBar'
import AppBarTitle from '../../../components/AppBarTitle'

const CustomWrapper = withStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing.unit * 2
    }
  })
)(Wrapper)

const styles = (theme: Theme) =>
  createStyles({
    button: {
      marginTop: theme.spacing.unit,
      marginRight: theme.spacing.unit
    },
    actionsContainer: {
      marginBottom: theme.spacing.unit * 2
    },
    finishContainer: {
      padding: theme.spacing.unit * 3
    }
  })

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad']
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`
    case 1:
      return 'An ad group contains one or more ads which target a shared set of keywords.'
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`
    default:
      return 'Unknown step'
  }
}

type Props = {
  onDone: () => void
} & WithStyles<typeof styles>

type State = {
  activeStep: number
}

const WebOnboarding: FunctionComponent<Props> = props => {
  const [activeStep, setActiveStep] = useState<number>(0)

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const steps = getSteps()

  return (
    <>
      <AppBar>
        <AppBarTitle>Getting Started</AppBarTitle>
      </AppBar>
      <CustomWrapper>
        <Stepper activeStep={activeStep} orientation='vertical'>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{getStepContent(index)}</Typography>
                  <div className={props.classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={props.classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={handleNext}
                        className={props.classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            )
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={props.classes.finishContainer}>
            <Typography>All steps completed - you're finished</Typography>
            <Button onClick={handleBack} className={props.classes.button}>
              Back
            </Button>
            <Button
              onClick={props.onDone}
              className={props.classes.button}
              color='primary'
              variant='contained'
            >
              Get Started
            </Button>
          </Paper>
        )}
      </CustomWrapper>
    </>
  )
}

export default withStyles(styles)(WebOnboarding)
