import React, { FunctionComponent, useState, useEffect } from 'react'
import GridPage from '../../pages/GridPage'
import analytics from '../../analytics'
import firestore from '../../firebase/firestore'
import { RouteComponentProps } from 'react-router'

type GridItem = {
  id: string
  title: string
  subtitle: string
  imgSrc: string
}

const GridPageContainer: FunctionComponent<RouteComponentProps> = props => {
  const [gridItems, setGridItems] = useState<GridItem[]>([])

  useEffect(() => {
    analytics.pageViewed({
      pageTitle: 'Grid',
      pagePath: '/grid'
    })

    firestore
      .collection('posts')
      .get()
      .then(snapshot => {
        setGridItems(
          snapshot.docs.map(doc => ({
            id: doc.id,
            title: doc.data().title,
            subtitle: `id: ${doc.id}`,
            imgSrc: doc.data().media
          }))
        )
      })
  }, [])

  return <GridPage gridItems={gridItems} />
}

export default GridPageContainer
