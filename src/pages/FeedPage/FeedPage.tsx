import React, { Component, ChangeEvent, FormEvent } from 'react'
import FeedItemCard from '../../components/FeedItemCard'
import Button from '@material-ui/core/Button'
import CreateIcon from '@material-ui/icons/Create'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import createStyles from '@material-ui/core/styles/createStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import Wrapper from '../../components/Wrapper'
import FormDialog from '../../components/FormDialog'
import TextField from '@material-ui/core/TextField'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import FileInput from '../../components/FileInput'
import AppBarTitle from '../../components/AppBarTitle'
import FeedItem from '../../models/FeedItem'
import paths from '../routes'
import Fab from '@material-ui/core/Fab'
import MainAppBar from '../../components/MainAppBar'

const FabButton = withStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: theme.spacing.unit * 9,
      right: theme.spacing.unit * 2
    }
  })
)(Fab)

const styles = (theme: Theme) =>
  createStyles({
    cameraButton: {
      paddingLeft: 0,
      marginTop: theme.spacing.unit * 2
    },
    buttonLeftIcon: {
      marginRight: theme.spacing.unit,
      paddingLeft: 0
    },
    feedItemWrapper: {
      marginTop: theme.spacing.unit
    }
  })

type Props = {
  feedItems: FeedItem[]
  onAddFeedItem: (feedItem: FeedItem) => void
} & WithStyles<typeof styles>

type State = {
  open: boolean
  form: Partial<FeedItem>
}

class FeedPage extends Component<Props, State> {
  state = {
    open: false,
    form: {
      id: '10',
      title: '',
      content: '',
      media: ''
    }
  }

  toggleDialog = () => {
    this.setState({
      open: !this.state.open
    })
  }

  handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    this.setState({
      open: false,
      form: {
        id: (this.props.feedItems.length * 10).toString(),
        title: '',
        content: '',
        media: ''
      }
    })

    this.props.onAddFeedItem(this.state.form)
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }

  render() {
    const { open } = this.state
    const { classes, feedItems } = this.props

    return (
      <>
        <MainAppBar>
          <AppBarTitle>Feed</AppBarTitle>
        </MainAppBar>
        <Wrapper>
          {feedItems &&
            feedItems.map(feedItem => (
              <div key={feedItem.id} className={classes.feedItemWrapper}>
                <FeedItemCard {...feedItem} feedItemPagePath={paths.feedItem} />
              </div>
            ))}
          <FabButton color='secondary' onClick={this.toggleDialog}>
            <CreateIcon />
          </FabButton>

          <FormDialog
            open={open}
            onClose={this.toggleDialog}
            title='New Feed Item'
            submitLabel='Post'
            onSubmit={this.handleSubmit}
          >
            <TextField
              name='title'
              label='Title'
              onChange={this.handleInputChange}
              fullWidth
              autoFocus
              required
            />

            <TextField
              name='content'
              label={`What's on your mind?`}
              onChange={this.handleInputChange}
              fullWidth
              multiline
              margin='normal'
              required
            />

            <FileInput capture='camera'>
              <Button component='span' className={classes.cameraButton}>
                <PhotoCameraIcon className={classes.buttonLeftIcon} />
                Add a Picture
              </Button>
            </FileInput>
          </FormDialog>
        </Wrapper>
      </>
    )
  }
}

export default withStyles(styles)(FeedPage)
