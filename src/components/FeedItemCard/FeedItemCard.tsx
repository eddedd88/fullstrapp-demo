import React, { FunctionComponent } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import FeedItem from '../../models/FeedItem'
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import createStyles from '@material-ui/core/styles/createStyles'

const CustomCardMedia = withStyles(
  createStyles({
    root: {
      paddingTop: '45%'
    }
  })
)(CardMedia)

type Props = {
  feedItemPagePath?: string
} & FeedItem

const FeedItemCard: FunctionComponent<Props> = props => {
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: props.title,
        text: props.content,
        url: `${process.env.PUBLIC_URL || ''}/feed/${props.id}`
      })
    }
  }

  const renderLink = (linkProps: any) => {
    return props.feedItemPagePath ? (
      <Link
        {...linkProps}
        to={props.feedItemPagePath.replace(':feedId', props.id)}
      />
    ) : null
  }

  return (
    <Card>
      {props.media && <CustomCardMedia image={props.media} />}

      <CardContent>
        {props.title && (
          <Typography gutterBottom variant='h5'>
            {props.title}
          </Typography>
        )}
        <Typography>{props.content}</Typography>
      </CardContent>

      <CardActions>
        {props.feedItemPagePath && (
          <Button size='small' color='primary' component={renderLink}>
            See More
          </Button>
        )}

        <Button size='small' color='primary' onClick={handleShareClick}>
          Share
        </Button>
      </CardActions>
    </Card>
  )
}

export default FeedItemCard
