import React, { Component } from 'react'
import FeedItemPage from '../../pages/FeedItemPage'
import { RouteComponentProps } from 'react-router'
import { FeedItem } from '../../models/FeedItem'
import paths from '../../pages/routes'
import firestore from '../../firebase/firestore'

type Props = RouteComponentProps<{
  feedId: string
}>

type State = {
  feedItem: Partial<FeedItem> | null
}

class FeedItemPageContainer extends Component<Props, State> {
  state = {
    feedItem: null,
    test: ''
  }

  componentDidMount() {
    const { feedId } = this.props.match.params

    if (feedId) {
      firestore
        .collection('posts')
        .doc(feedId)
        .get()
        .then(snapshot => {
          this.setState({
            feedItem: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
    }
  }

  render() {
    const { feedItem } = this.state
    const {
      match: { url }
    } = this.props
    const backLink = url.includes(paths.feed) ? paths.feed : paths.profile

    return feedItem ? <FeedItemPage {...feedItem} backLink={backLink} /> : null
  }
}

export default FeedItemPageContainer
