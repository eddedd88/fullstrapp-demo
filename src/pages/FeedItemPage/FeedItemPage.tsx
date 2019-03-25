import React, { FunctionComponent } from 'react'
import FeedItem from '../../models/FeedItem'
import FeedItemCard from '../../components/FeedItemCard'
import Wrapper from '../../components/Wrapper'
import withStyles from '@material-ui/core/styles/withStyles'
import createStyles from '@material-ui/core/styles/createStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import AppBarTitle from '../../components/AppBarTitle'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import MainAppBar from '../../components/MainAppBar'

type Props = FeedItem & {
  backLink: string
}

const FeedItemPage: FunctionComponent<Props> = props => {
  const { title, backLink, ...rest } = props

  return (
    <>
      <MainAppBar>
        <IconButton
          color='inherit'
          component={(linkProps: any) => <Link {...linkProps} to={backLink} />}
        >
          <ArrowBackIcon />
        </IconButton>

        <AppBarTitle>{title}</AppBarTitle>
      </MainAppBar>

      <Wrapper>
        <FeedItemCard title={title} {...rest} />
      </Wrapper>
    </>
  )
}

export default FeedItemPage
