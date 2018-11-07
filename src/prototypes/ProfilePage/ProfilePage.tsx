import React, { Component, Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import AppBar from '@material-ui/core/AppBar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import FeedItem from '../FeedItem'
import Image1 from '../../assets/cassie-boca-293379-unsplash.jpg'
import Image2 from '../../assets/dan-freeman-404566-unsplash.jpg'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import Grid from '@material-ui/core/Grid'
import Wrapper from '../../components/Wrapper'
import paths from '../../routes/paths'
import Signin from '../../components/Signin'
import Loading from '@material-ui/core/CircularProgress'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import createStyles from '@material-ui/core/styles/createStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'

const styles = (theme: Theme) =>
  createStyles({
    name: {
      marginBottom: theme.spacing.unit * 2
    },
    icon: {
      verticalAlign: 'bottom',
      marginRight: theme.spacing.unit * 2
    },
    userInfo: {
      textDecoration: 'none',
      padding: theme.spacing.unit
    },
    subheader: {
      padding: theme.spacing.unit * 2
    }
  })

type Props = {
  user?: {
    profilePicture: string
    name: string
  }
  statusIsKnown: boolean
} & WithStyles<typeof styles>

const CustomWrapper = withStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing.unit * 2
    }
  })
)(Wrapper)

const CustomAvatar = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: theme.spacing.unit * 12,
      width: theme.spacing.unit * 12,
      margin: 'auto',
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 2,
      color: '#fff',
      backgroundColor: theme.palette.primary.light
    }
  })
)(Avatar)

class ProfilePage extends Component<Props> {
  renderLink = (href: string) => (props: any) => <a {...props} href={href} />

  render() {
    const { statusIsKnown, user, classes } = this.props

    if (!statusIsKnown) {
      return <Loading />
    }

    if (!user) {
      return <Signin />
    }

    // status is known and we have a logged in user
    return (
      <Fragment>
        <AppBar position='static'>
          <CustomAvatar src={user.profilePicture} alt={'user.name'}>
            FN
          </CustomAvatar>
          <Typography
            variant='title'
            color='inherit'
            align='center'
            className={classes.name}
          >
            {user.name}
          </Typography>
        </AppBar>

        <CustomWrapper>
          <Card>
            <CardContent>
              <Typography
                component={this.renderLink('mailto:test@test.com')}
                className={classes.userInfo}
                gutterBottom
              >
                <EmailIcon className={classes.icon} />
                test@test.com
              </Typography>

              <Typography
                component={this.renderLink('tel:123-123-1234')}
                className={classes.userInfo}
              >
                <PhoneIcon className={classes.icon} />
                123-123-1234
              </Typography>
            </CardContent>
          </Card>

          <Typography
            variant='subheading'
            color='textSecondary'
            className={classes.subheader}
          >
            Posts
          </Typography>
          <Grid container spacing={8}>
            <Grid item sm={6} xs={12}>
              <FeedItem
                id='1'
                media={Image1}
                title='Mountains'
                content='Mountains are high.'
                feedItemPagePath={paths.profileFeedItem}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <FeedItem
                id='2'
                media={Image2}
                title='Lights'
                content='Lights are bright.'
                feedItemPagePath={paths.profileFeedItem}
              />
            </Grid>
          </Grid>
        </CustomWrapper>
      </Fragment>
    )
  }
}

export default withStyles(styles)(ProfilePage)
