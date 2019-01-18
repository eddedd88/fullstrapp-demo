import React, { Component } from 'react'
import AppBar from '../../components/AppBar'
import { FeedItem } from '../../models/FeedItem'
import FeedItemCard from '../../components/FeedItemCard'
import Wrapper from '../../components/Wrapper'
import withStyles from '@material-ui/core/styles/withStyles'
import createStyles from '@material-ui/core/styles/createStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import AppBarTitle from '../../components/AppBarTitle'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

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
        <AppBar>
          <IconButton
            color='inherit'
            component={(props: any) => <Link {...props} to={backLink} />}
          >
            <ArrowBackIcon />
          </IconButton>

          <AppBarTitle>{title}</AppBarTitle>
        </AppBar>

        <CustomWrapper>
          <FeedItemCard title={title} {...rest} />
        </CustomWrapper>
      </>
    )
  }
}

export default FeedItemPage
