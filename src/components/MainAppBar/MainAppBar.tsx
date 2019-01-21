import React, { Component } from 'react'
import AppBar from '../AppBar'
import GithubIcon from '../../assets/github.png'
import ExpandableSearch from '../ExpandableSearch'
import IconButton from '@material-ui/core/IconButton'

class MainAppBar extends Component {
  render() {
    return (
      <AppBar>
        {this.props.children}
        <ExpandableSearch onChangeValue={console.log} placeholder='Search' />
        <IconButton
          component='a'
          href='https://github.com/eddedd88/fullstrapp-demo'
        >
          <img src={GithubIcon} alt='github' />
        </IconButton>
      </AppBar>
    )
  }
}

export default MainAppBar
