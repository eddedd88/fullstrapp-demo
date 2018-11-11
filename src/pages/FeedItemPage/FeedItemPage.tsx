import React, { Component } from 'react'
import AppBar from '../../components/AppBar'
import { FeedItem } from '../../models/FeedItem'
import FeedItemCard from '../../components/FeedItemCard'
import Wrapper from '../../components/Wrapper'
import withStyles from '@material-ui/core/styles/withStyles'
import createStyles from '@material-ui/core/styles/createStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'

const CustomWrapper = withStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing.unit
    }
  })
)(Wrapper)

type Props = FeedItem & {
  backLink: string
}

class FeedItemPage extends Component<Props> {
  render() {
    const { title, backLink, ...rest } = this.props

    return (
      <>
        <AppBar title={title} backLink={backLink} />
        <CustomWrapper>
          <FeedItemCard title={title} {...rest} />
        </CustomWrapper>
      </>
    )
  }
}

export default FeedItemPage
