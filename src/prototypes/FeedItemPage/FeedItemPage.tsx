import React, { Component, Fragment } from 'react'
import AppBar from '../../components/AppBar'
import { FeedItemType } from '../../types/FeedItemType'
import FeedItem from '../FeedItem'
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

type Props = FeedItemType & {
  backLink: string
}

class FeedItemPage extends Component<Props> {
  render() {
    const { title, backLink, ...rest } = this.props

    return (
      <Fragment>
        <AppBar title={title} backLink={backLink} />
        <CustomWrapper>
          <FeedItem title={title} {...rest} />
        </CustomWrapper>
      </Fragment>
    )
  }
}

export default FeedItemPage
