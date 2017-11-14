import React, {Component} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {Header, HeaderContent} from 'components/ui/header'
import Page from 'components/ui/page'
import {IconButton} from 'components/ui/button'
import {MissingTitle} from 'components/ui/modal'
import SwipeableViews from 'react-swipeable-views'
import { goBack } from 'react-router-redux'
import { fetchPosts, deletePost, updatePost } from 'modules/PostModule'
import { ALPHA, DATE, RATING} from 'modules/SortModule'
import { capitalize } from 'utils/StringUtil'
import { alphaSort, dateSort, ratingSort } from 'utils/ArrayUtil'
import md from 'react-markings'
import getTitle from 'get-md-title';
import {Controlled as CodeMirror} from 'react-codemirror2'
import backIcon from 'static/icon/arrow-back.svg'
import trashIcon from 'static/icon/garbage.svg'
import saveIcon from 'static/icon/upload.svg'
import editIcon from 'static/icon/edit.svg'
import cancelIcon from 'static/icon/cancel.svg'

const MISSING_TITLE = 'missingTitle';
const EDIT = 'edit';

const styles = {
  slideContainer: {
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide0: {
    background: '#FEA900',
  },
  slide1: {
    background: '#B3DC4A',
  },
  slide2: {
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


const CardsView = ({posts, source, index, onChange}) => (
  <SwipeableViews enableMouseEvents slideStyle={styles.slideContainer} index={index} onChangeIndex={onChange}>
    {posts.map((p,i) =>
    <div key={`card_${p.id}`} style={{...styles.slide, ...styles[`slide${i}`]}}>
      {md([p.body])}
    </div>)}
  </SwipeableViews>
);

class PostRoute extends Component {
  
  state = {
    postSource: temppostSource,
    postIndex: -1,
    edit: false,
    missingTitle: false
  }
  
  componentDidMount(){
    const { posts, match, fetchPosts } = this.props
    const category = match.params.category
    if(posts.length === 0){
      fetchPosts(category)
    }
  }
  
  componentWillMount(){
    const { posts, match} = this.props
    // find the index of the post
    if(this.state.postIndex === -1 && posts.length > 0){
      const id = match.params.post_id
      this.updatePostIndex(posts.findIndex(e => e.id === id) || 0)
    }
  }
  
  componentWillReceiveProps(nextProps){
    const { posts, match} = nextProps
    // find the index of the post after posts loaded
    if(this.state.postIndex === -1 && posts.length > 0){
      const id = match.params.post_id
      this.updatePostIndex(posts.findIndex(e => e.id === id) || 0)
    }
  }
  
  render () {
    const { posts, match, goBack } = this.props
    const { postSource, edit, missingTitle, postIndex } = this.state
    const category = match.params.category
    const options =  { mode: 'markdown'}
    return (
      <div className="app">
        {
          edit
          ? <Header>
              <HeaderContent padded>Editing Article</HeaderContent>
              <IconButton src={trashIcon} alt="trash" onClick={this.removeArticle}/>
              <IconButton src={saveIcon} alt="save" onClick={this.saveArticle}/>
              <IconButton src={cancelIcon} alt="cancel" onClick={() => this.toggle(EDIT)}/>
            </Header>
          : <Header>
              <IconButton src={backIcon} alt="back" onClick={goBack}/>
              <HeaderContent>{capitalize(category)}</HeaderContent>
              {posts.length > 0 && <IconButton src={editIcon} alt="edit" onClick={() => this.toggleEdit()}/>}
            </Header>
        }
        <Page>
          {
            posts.length === 0
            ? <div> Loading </div>
            : edit
            ? <CodeMirror value={postSource} onBeforeChange={this.updatePost} options={options} />
            : <CardsView source={postSource} onChange={this.updatePostIndex} posts={posts} index={postIndex} />
          }
        </Page>
        { missingTitle && <MissingTitle onAddTitle={() => this.addTitle()} onClose={() => this.toggle(MISSING_TITLE)}/> }
      </div>
    )
  }
  
  updatePostIndex = (postIndex) => {
    this.setState({
      ...this.state,
      postIndex
		})
  }
  
  updatePost = (editor, data, value) => {
    this.setState({
      ...this.state,
			postSource: value,
		})
  }
  
  toggleEdit = () => {
    const {postIndex} = this.state
    this.setState({
			[EDIT]: !this.state[EDIT],
			postSource: this.props.posts[postIndex].body
		})
  }
  
  toggle = (prop) => {
    this.setState({
			[prop]: !this.state[prop],
		})
  }
  
  addTitle = () => {
    const {postSource} = this.state
    const title = getTitle(postSource)
    if(!title){
      this.updatePost(null, null, `# Example Title \n ${postSource}`)
      this.toggle(MISSING_TITLE)
    }
  }
  
  // server does not broadcast events
  // articles have to be removed locally and remotely
  // after removal, go back to the previous page
  removeArticle = () => {
    const {posts, removePost, goBack} = this.props
    const {postIndex} = this.state
    const id = posts[postIndex].id
    removePost(id)
    this.toggle(EDIT)
    goBack()
  }
  
  saveArticle = () => {
    const {posts, updatePost} = this.props
    const {postSource, postIndex} = this.state
    const id = posts[postIndex].id
    const title = getTitle(postSource)
    if(title){
      //TODO: Save article and title seperately
      console.log('saveArticle', {id, title: title.text, body: postSource})
      updatePost({id, title: title.text, body: postSource})
      this.toggle(EDIT);
    } else {
      this.toggle(MISSING_TITLE);
    }
  }
}

const mapDispatchToProps = {
  goBack,
  fetchPosts,
  deletePost,
  updatePost
}

const mapStateToProps = state => {
  const category = state.router.location.pathname.split('/')[1]
  const type = state.sort.type
  return {
    posts: state.posts
      .filter(item => item.category === category)
      .sort(type === ALPHA.type
        ? alphaSort
        : type === DATE.type
        ? dateSort
        : ratingSort)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostRoute)
