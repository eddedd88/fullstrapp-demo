import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { FeedItemType } from '../../types/FeedItemType'
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
} & FeedItemType

class FeedItem extends Component<Props> {
  handleShareClick = () => {
    const { id, title, content } = this.props

    if (navigator.share) {
      navigator.share({
        title,
        text: content,
        url: `${process.env.PUBLIC_URL || ''}/feed/${id}`
      })
    }
  }

  renderLink = (props: any) => {
    const { id, feedItemPagePath } = this.props

    return feedItemPagePath ? (
      <Link {...props} to={feedItemPagePath.replace(':feedId', id)} />
    ) : null
  }
  render() {
    const { id, title, content, media, feedItemPagePath } = this.props

    return (
      <Card>
        {media && <CustomCardMedia image={media} />}

        <CardContent>
          {title && (
            <Typography gutterBottom variant='h5'>
              {title}
            </Typography>
          )}
          <Typography>{content}</Typography>
        </CardContent>

        <CardActions>
          {feedItemPagePath && (
            <Button size='small' color='primary' component={this.renderLink}>
              See More
            </Button>
          )}

          <Button size='small' color='primary' onClick={this.handleShareClick}>
            Share
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export default FeedItem
