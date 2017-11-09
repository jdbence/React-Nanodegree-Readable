import React, {Component} from 'react'
import {connect} from 'react-redux'
import logo from 'static/icon/logo.svg'
import SwipeableViews from 'react-swipeable-views'
import {Header, HeaderContent} from 'components/ui/header'
import {BackButton} from 'components/ui/button'
import { push } from 'react-router-redux'

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

const CardsView = () => (
  <SwipeableViews enableMouseEvents slideStyle={styles.slideContainer}>
    <div style={Object.assign({}, styles.slide, styles.slide1)}>
      slide n°1
    </div>
    <div style={Object.assign({}, styles.slide, styles.slide2)}>
      slide n°2
    </div>
    <div style={Object.assign({}, styles.slide, styles.slide3)}>
      slide n°3
    </div>
  </SwipeableViews>
);

class CategoryRoute extends Component {
  render () {
    return (
      <div className="App">
        <Header>
          <BackButton onClick={() => this.props.push('/')}/>
          <HeaderContent>header</HeaderContent>
        </Header>
        <CardsView />
      </div>
    )
  }
}

const mapDispatchToProps = {
  push
}

const mapStateToProps = state => ({
  posts: {}
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryRoute)
