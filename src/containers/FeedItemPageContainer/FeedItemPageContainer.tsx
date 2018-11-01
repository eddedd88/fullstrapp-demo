import React, { Component } from 'react'
import FeedItemPage from '../../prototypes/FeedItemPage'
import { RouteComponentProps } from 'react-router'
import { FeedItemType } from '../../types/FeedItemType'
import paths from '../../routes/paths'
import firestore from '../../utils/firebase/firestore'

type Props = RouteComponentProps<{
  feedId: string
}>

type State = {
  feedItem: Partial<FeedItemType> | null
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
