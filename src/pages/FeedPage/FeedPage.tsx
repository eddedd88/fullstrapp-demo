import React, {
  FunctionComponent,
  ChangeEvent,
  FormEvent,
  useState
} from 'react'
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
      marginBottom: theme.spacing.unit
    }
  })

type Props = {
  feedItems: FeedItem[]
  onAddFeedItem: (feedItem: FeedItem) => void
} & WithStyles<typeof styles>

const FeedPage: FunctionComponent<Props> = props => {
  const [open, setOpen] = useState<boolean>(false)
  const [form, setForm] = useState<FeedItem>({
    id: '10',
    title: '',
    content: '',
    media: ''
  })

  const toggleDialog = () => {
    setOpen(!open)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setOpen(false)
    setForm({
      id: (props.feedItems.length * 10).toString(),
      title: '',
      content: '',
      media: ''
    })

    props.onAddFeedItem(form)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <MainAppBar>
        <AppBarTitle>Feed</AppBarTitle>
      </MainAppBar>
      <Wrapper>
        {props.feedItems &&
          props.feedItems.map(feedItem => (
            <div key={feedItem.id} className={props.classes.feedItemWrapper}>
              <FeedItemCard {...feedItem} feedItemPagePath={paths.feedItem} />
            </div>
          ))}
        <FabButton color='secondary' onClick={toggleDialog}>
          <CreateIcon />
        </FabButton>
      </Wrapper>
      <FormDialog
        open={open}
        onClose={toggleDialog}
        title='New Feed Item'
        submitLabel='Post'
        onSubmit={handleSubmit}
      >
        <TextField
          name='title'
          label='Title'
          onChange={handleInputChange}
          fullWidth
          autoFocus
          required
        />

        <TextField
          name='content'
          label={`What's on your mind?`}
          onChange={handleInputChange}
          fullWidth
          multiline
          margin='normal'
          required
        />

        <FileInput capture='camera'>
          <Button component='span' className={props.classes.cameraButton}>
            <PhotoCameraIcon className={props.classes.buttonLeftIcon} />
            Add a Picture
          </Button>
        </FileInput>
      </FormDialog>
    </>
  )
}

export default withStyles(styles)(FeedPage)
