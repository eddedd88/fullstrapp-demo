import React, { Component } from 'react'
import GridPage from '../../prototypes/GridPage'
import analytics from '../../analytics'
import firestore from '../../firebase/firestore'
import { RouteComponentProps } from 'react-router'

type State = {
  gridItems: Array<{
    id: string
    title: string
    subtitle: string
    imgSrc: string
  }>
}

class GridPageContainer extends Component<RouteComponentProps, State> {
  state = {
    gridItems: []
  }

  componentDidMount() {
    analytics.pageViewed({
      pageTitle: 'Grid',
      pagePath: '/grid'
    })

    firestore
      .collection('posts')
      .get()
      .then(snapshot => {
        this.setState({
          gridItems: snapshot.docs.map(doc => ({
            id: doc.id,
            title: doc.data().title,
            subtitle: `id: ${doc.id}`,
            imgSrc: doc.data().media
          }))
        })
      })
  }

  render() {
    return <GridPage gridItems={this.state.gridItems} />
  }
}

export default GridPageContainer
