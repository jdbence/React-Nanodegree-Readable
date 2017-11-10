import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Header, HeaderContent} from 'components/ui/header'
import {BackButton} from 'components/ui/button'
import SwipeableViews from 'react-swipeable-views'
import { goBack } from 'react-router-redux'
import { getPosts } from 'modules/PostModule'
import { capitalize } from 'utils/StringUtil'

const styles = {
  slideContainer: {
    padding: '0 10px',
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    background: '#FEA900',
  },
  slide2: {
    background: '#B3DC4A',
  },
  slide3: {
    background: '#6AC0FF',
  },
};

const CardsView = ({posts}) => (
  <SwipeableViews enableMouseEvents slideStyle={styles.slideContainer}>
    {posts.map(p =>
    <div key={`card_${p.id}`} style={Object.assign({}, styles.slide, styles.slide1)}>
      slide n°1
    </div>)}
  </SwipeableViews>
);

class PostRoute extends Component {
  render () {
    const { posts, match, goBack } = this.props
    const category = match.params.category
    return (
      <div className="App">
        <Header>
          <BackButton onClick={goBack}/>
          <HeaderContent>{capitalize(category)}</HeaderContent>
        </Header>
        <div style={{height: 56}} />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <CardsView posts={posts}/>
      </div>
    )
  }
}

const mapDispatchToProps = {
  goBack,
  getPosts
}

const mapStateToProps = state => {
  const category = state.router.location.pathname.split('/')[1]
  return {
    posts: state.posts.filter(item => item.category === category)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostRoute)
