import React, { FunctionComponent, useState, useEffect } from 'react'
import FeedPage from '../../pages/FeedPage'
import FeedItem from '../../models/FeedItem'
import analytics from '../../analytics'
import firestore from '../../firebase/firestore'
import { RouteComponentProps } from 'react-router'

const FeedPageContainer: FunctionComponent<RouteComponentProps> = props => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([])

  useEffect(() => {
    analytics.pageViewed({
      pageTitle: 'Feed',
      pagePath: '/feed'
    })
    return firestore.collection('posts').onSnapshot(snapshot => {
      setFeedItems(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as FeedItem)
        }))
      )
    })
  }, [])

  const handleAddFeedItem = (newFeedItem: FeedItem) => {
    setFeedItems([
      ...feedItems,
      {
        id: feedItems.length + 1,
        ...newFeedItem
      }
    ])
  }

  return <FeedPage feedItems={feedItems} onAddFeedItem={handleAddFeedItem} />
}

export default FeedPageContainer
