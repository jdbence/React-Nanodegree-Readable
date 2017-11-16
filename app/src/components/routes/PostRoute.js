import React, {Component} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {Header, HeaderContent} from 'components/ui/header'
import Page from 'components/ui/page'
import {IconButton} from 'components/ui/button'
import Empty from 'components/ui/empty'
import {MissingTitleModal} from 'components/ui/modal'
import SwipeableViews from 'react-swipeable-views'
import { goBack } from 'react-router-redux'
import { fetchPosts, deletePost, updatePost } from 'modules/PostModule'
import { fetchComments } from 'modules/CommentsModule'
import { ALPHA, DATE, RATING} from 'modules/SortModule'
import { capitalize } from 'utils/StringUtil'
import { postSort, postFilter } from 'utils/ArrayUtil'
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
    background: '#fff',
  }
};

const Comment = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
`

const CardsView = ({posts, comments, source, index, onChange}) => (
  <SwipeableViews enableMouseEvents slideStyle={styles.slideContainer} index={index} onChangeIndex={onChange}>
    {posts.map(p =>
    <div key={`card_${p.id}`} style={{...styles.slide}}>
      {md([p.body])}
      {
        comments
        .filter(c => c.parentId == p.id)
        .map(c => <Comment key={`comment_${c.id}`} {...c}>{c.body}</Comment>)
      }
    </div>)}
  </SwipeableViews>
);

class PostRoute extends Component {
  
  state = {
    postSource: '',
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
    const { posts, match, fetchComments} = this.props
    // find the index of the post
    if(this.state.postIndex === -1 && posts.length > 0){
      const id = match.params.post_id
      this.updatePostIndex(posts.findIndex(e => e.id === id) || 0)
      fetchComments(id)
    }
  }
  
  componentWillReceiveProps(nextProps){
    const { posts, match, fetchComments} = nextProps
    // find the index of the post after posts loaded
    if(this.state.postIndex === -1 && posts.length > 0){
      const id = match.params.post_id
      this.updatePostIndex(posts.findIndex(e => e.id === id) || 0, false)
      fetchComments(id)
    }
  }
  
  render () {
    const { posts, comments, match, goBack } = this.props
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
            ? <Empty/>
            : edit
            ? <CodeMirror value={postSource} onBeforeChange={this.updatePost} options={options} />
            : <CardsView onChange={this.onChangePage} posts={posts} comments={comments} index={postIndex} />
          }
        </Page>
        { missingTitle && <MissingTitleModal onAddTitle={() => this.addTitle()} onClose={() => this.toggle(MISSING_TITLE)}/> }
      </div>
    )
  }
  
  onChangePage = index => {
    const { posts, fetchComments } = this.props
    this.updatePostIndex(index);
    if(posts.length > 0 && posts.length >= index){
      fetchComments(posts[index].id);
    }
  }
  
  updatePostIndex = postIndex => {
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
    const {posts, deletePost, goBack} = this.props
    const {postIndex} = this.state
    const id = posts[postIndex].id
    deletePost(id)
    this.toggle(EDIT)
    goBack()
  }
  
  saveArticle = () => {
    const {posts, updatePost} = this.props
    const {postSource, postIndex} = this.state
    const id = posts[postIndex].id
    const title = getTitle(postSource)
    if(title){
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
  updatePost,
  fetchComments
}

const mapStateToProps = state => {
  const {comments, sort, posts, router} = state
  const category = router.location.pathname.split('/')[1]
  const type = sort.type
  return {
    comments,
    posts: posts
      .filter(postFilter(category))
      .sort(postSort(type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostRoute)
