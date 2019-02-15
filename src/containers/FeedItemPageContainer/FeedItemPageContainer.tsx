import React, { FunctionComponent, useEffect, useState } from 'react'
import FeedItemPage from '../../pages/FeedItemPage'
import { RouteComponentProps } from 'react-router'
import FeedItem from '../../models/FeedItem'
import paths from '../../pages/routes'
import firestore from '../../firebase/firestore'

type Props = RouteComponentProps<{
  feedId: string
}>

const FeedItemPageContainer: FunctionComponent<Props> = props => {
  const [feedItem, setFeedItem] = useState<FeedItem | null>(null)

  useEffect(() => {
    if (props.match.params.feedId) {
      return firestore
        .collection('posts')
        .doc(props.match.params.feedId)
        .onSnapshot(snapshot => {
          setFeedItem({
            id: snapshot.id,
            ...(snapshot.data() as FeedItem)
          })
        })
    }
  }, [props.match.params.feedId])

  const backLink = props.match.url.includes(paths.feed)
    ? paths.feed
    : paths.profile

  return feedItem ? <FeedItemPage {...feedItem} backLink={backLink} /> : null
}

export default FeedItemPageContainer
