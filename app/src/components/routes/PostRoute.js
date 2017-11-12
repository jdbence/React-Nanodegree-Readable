import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Header, HeaderContent} from 'components/ui/header'
import {IconButton} from 'components/ui/button'
import SwipeableViews from 'react-swipeable-views'
import { goBack } from 'react-router-redux'
import { getPosts } from 'modules/PostModule'
import { capitalize } from 'utils/StringUtil'
import md from 'react-markings'
import CodeMirror from 'react-codemirror'
import backIcon from 'static/icon/arrow-back.svg'
import saveIcon from 'static/icon/upload.svg'
import editIcon from 'static/icon/edit.svg'
import cancelIcon from 'static/icon/cancel.svg'

const styles = {
  slideContainer: {
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
const temppostSource = `
  # react-markings
  > Markdown in components, components in markdown

  - Allows you to write markdown using [commonmark.js](https://github.com/commonmark/commonmark.js)
  - Renders markdown as React elements using [commonmark-react-renderer](https://github.com/rexxars/commonmark-react-renderer)
  - Embed React components inside your markdown (in any paragraph position) like this:
`

const CardsView = ({posts}) => (
  <SwipeableViews enableMouseEvents slideStyle={styles.slideContainer}>
    {posts.map(p =>
    <div key={`card_${p.id}`} style={Object.assign({}, styles.slide, styles.slide1)}>
      {md([temppostSource])}
    </div>)}
  </SwipeableViews>
);

class PostRoute extends Component {
  
  state = {
    postSource: temppostSource,
    edit: false
  }
  
  componentDidMount(){
    const { posts, match } = this.props
    const category = match.params.category
    if(posts.length === 0){
      this.props.getPosts(category)
    }
  }
  
  updatePost = (source) => {
    this.setState({
      ...this.state,
			postSource: source,
		})
  }
  
  toggleEdit = () => {
    this.setState({
      ...this.state,
			edit: !this.state.edit,
		})
  }
  
  render () {
    const { posts, match, goBack } = this.props
    const { postSource, edit } = this.state
    const category = match.params.category
    const options =  {}
    return (
      <div className="App">
        {
          edit
          ? <Header>
              <HeaderContent padded>Editing Article</HeaderContent>
              <IconButton src={saveIcon} alt="save" onClick={this.toggleEdit}/>
              <IconButton src={cancelIcon} alt="cancel" onClick={this.toggleEdit}/>
            </Header>
          : <Header>
              <IconButton src={backIcon} alt="back" onClick={goBack}/>
              <HeaderContent>{capitalize(category)}</HeaderContent>
              <IconButton src={editIcon} alt="edit" onClick={this.toggleEdit}/>
            </Header>
        }
        <div style={{height: 56}} />
        {
          edit
          ? <CodeMirror value={postSource} onChange={this.updatePost} options={options} />
          : <CardsView posts={posts} />
        }
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
