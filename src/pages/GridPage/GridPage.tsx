import React, { Component } from 'react'
import withWidth, { isWidthUp, WithWidth } from '@material-ui/core/withWidth'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import Wrapper from '../../components/Wrapper'
import withStyles from '@material-ui/core/styles/withStyles'
import createStyles from '@material-ui/core/styles/createStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import AppBar from '../../components/AppBar'
import AppBarTitle from '../../components/AppBarTitle'

const CustomWrapper = withStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing.unit
    }
  })
)(Wrapper)

type Props = {
  gridItems: Array<{
    id: string
    title: string
    subtitle: string
    imgSrc: string
  }>
} & WithWidth

class GridPage extends Component<Props> {
  render() {
    const { gridItems, width } = this.props

    return (
      <>
        <AppBar>
          <AppBarTitle>Image Grid</AppBarTitle>
        </AppBar>
        <CustomWrapper>
          <GridList cellHeight={isWidthUp('sm', width) ? 300 : 180}>
            {gridItems &&
              gridItems.map(({ id, title, imgSrc, subtitle }, index) => (
                <GridListTile key={id}>
                  <img src={imgSrc} alt={title} />
                  <GridListTileBar
                    title={title}
                    subtitle={subtitle}
                    actionIcon={
                      <IconButton>
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
          </GridList>
        </CustomWrapper>
      </>
    )
  }
}

export default withWidth()(GridPage)
