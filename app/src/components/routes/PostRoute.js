/* global localStorage */

import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Header, HeaderContent } from 'components/ui/header'
import Page from 'components/ui/page'
import { IconButton, ToggleHeart } from 'components/ui/button'
import { EditComment } from 'components/ui/comment'
import { Avatar, AvatarDesc } from 'components/ui/avatar'
import Empty from 'components/ui/empty'
import { MissingTitleModal } from 'components/ui/modal'
import SwipeableViews from 'react-swipeable-views'
import { push } from 'react-router-redux'
import { fetchPosts, votePost, deletePost, updatePost } from 'modules/PostModule'
import { fetchComments, voteComment, createComment, deleteComment, updateComment } from 'modules/CommentsModule'
import { color, capitalize, dateStamp, rnd } from 'utils/StringUtil'
import { multiSort, postSort, postFilter } from 'utils/ArrayUtil'
import md from 'react-markings'
import getTitle from 'get-md-title'
import { Controlled as CodeMirror } from 'react-codemirror2'
import backIcon from 'static/icon/arrow-back.svg'
import trashIcon from 'static/icon/garbage.svg'
import saveIcon from 'static/icon/upload.svg'
import editIcon from 'static/icon/edit.svg'
import cancelIcon from 'static/icon/cancel.svg'

const MISSING_TITLE = 'missingTitle'
const EDIT = 'edit'

const styles = {
  slideContainer: {},
  slide: {
    padding: 15,
    minHeight: 100,
    background: '#fff'
  }
}

const Comment = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
`
const CommentFooter = styled.div`
  padding-top: 10px;
`

const CommentActions = styled.div`
  display: flex;
  padding: 10px 0;
  align-items: center;
  justify-content: space-between;
`

const AvatarContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`

const Preview = styled.div`
  & img {
    max-width: 100%;
    height: auto;
  }
`
const CommentButtonStyle = `
  width: 40px;
  height: 40px;
  background-color: #2196f3;
  border-radius: 50%;
  margin-left: 5px;
  & img {
    width: 60%;
  }
`

const CardsView = ({
  posts,
  comments,
  source,
  commentEditing,
  index,
  onCancel,
  onSave,
  onChange,
  onLike,
  onLikeArticle,
  onEdit,
  onDelete
}) => (
  <SwipeableViews enableMouseEvents slideStyle={styles.slideContainer} index={index} onChangeIndex={onChange}>
    {posts.map(p => (
      <div key={`card_${p.id}`} style={{ ...styles.slide }}>
        <Preview>{md([p.body])}</Preview>
        <section>
          <CommentActions>
            <ToggleHeart onClick={()=>onLikeArticle(p.id, p.voted)} voted={p.voted} voteScore={p.voteScore} right/>
            Comments {comments.filter(c => c.parentId === p.id).length}
          </CommentActions>
          <EditComment onSave={onSave} post={p.id} author={localStorage.getItem('author') || ''} comment={''} />
          {comments.filter(c => c.parentId === p.id).map(
            c =>
              c.id === commentEditing ? (
                <EditComment
                  key={`comment_${c.id}`}
                  onCancel={onCancel}
                  onSave={onSave}
                  id={c.id}
                  author={c.author}
                  comment={c.body}
                  edit
                />
              ) : (
                <Comment key={`comment_${c.id}`} {...c}>
                  <AvatarContainer>
                    <Avatar color={color(c.author)}>{capitalize(c.author[0])}</Avatar>
                    <AvatarDesc>
                      <p>{c.author}</p>
                      <p>{dateStamp(c.timestamp)}</p>
                    </AvatarDesc>
                    <IconButton
                      src={trashIcon}
                      alt="delete"
                      buttonStyle={CommentButtonStyle}
                      onClick={() => onDelete(c.id, c.parentId)}
                    />
                    <IconButton
                      src={editIcon}
                      alt="edit"
                      buttonStyle={CommentButtonStyle}
                      onClick={() => onEdit(c.id)}
                    />
                  </AvatarContainer>
                  {c.body}
                  <CommentFooter>
                    <ToggleHeart onClick={() => onLike(c.id)} voted={c.voted} voteScore={c.voteScore} right />
                  </CommentFooter>
                </Comment>
              )
          )}
        </section>
      </div>
    ))}
  </SwipeableViews>
)

class PostRoute extends Component {
  state = {
    postSource: '',
    postIndex: -1,
    missingTitle: false,
    missingPost: false,
    commentEditing: -1
  }

  componentDidMount() {
    const { posts, match, fetchPosts } = this.props
    const category = match.params.category
    if (posts.length === 0) {
      fetchPosts(category)
    }
  }

  componentWillMount() {
    const { posts, match, fetchComments } = this.props
    const { missingPost, postIndex } = this.state
    // find the index of the post
    if (!missingPost && postIndex === -1 && posts.length > 0) {
      const id = match.params.post_id
      this.readyPostData(id, posts)
      fetchComments(id)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { posts, match, fetchComments } = nextProps
    const { missingPost, postIndex } = this.state
    // find the index of the post after posts loaded
    if (!missingPost && postIndex === -1 && posts.length > 0) {
      const id = match.params.post_id
      this.readyPostData(id, posts)
      fetchComments(id)
    }
  }

  render() {
    const { posts, comments, match, deleteComment, edit, goto } = this.props
    const { postSource, commentEditing, missingTitle, postIndex, missingPost } = this.state
    const category = match.params.category
    const options = { mode: 'markdown' }

    return (
      <div className="app">
        {edit ? (
          <Header>
            <HeaderContent padded>Editing Article</HeaderContent>
            <IconButton src={saveIcon} alt="save" onClick={this.saveArticle} />
            <IconButton src={cancelIcon} alt="cancel" onClick={this.toggleEdit} />
          </Header>
        ) : (
          <Header>
            <IconButton src={backIcon} alt="back" onClick={() => goto(`/${category}`)} />
            <HeaderContent>{capitalize(category)}</HeaderContent>
            {!missingPost && <IconButton src={trashIcon} alt="trash" onClick={this.removeArticle} />}
            {!missingPost && <IconButton src={editIcon} alt="edit" onClick={this.toggleEdit} />}
          </Header>
        )}
        <Page background="white" maxWidth={800} flex>
          {missingPost || posts.length === 0 ? (
            <Empty />
          ) : edit ? (
            <CodeMirror value={postSource} onBeforeChange={this.updatePost} options={options} className={'mdPostFull'}/>
          ) : (
            <CardsView
              onCancel={() => this.onChange('commentEditing', -1)}
              onSave={this.onSaveComment}
              onLike={this.onLike}
              onLikeArticle={this.onLikeArticle}
              onChange={this.onChangePage}
              onEdit={id => this.onChange('commentEditing', id)}
              onDelete={deleteComment}
              posts={posts}
              comments={comments}
              commentEditing={commentEditing}
              index={postIndex}
            />
          )}
        </Page>
        {missingTitle && (
          <MissingTitleModal onAddTitle={() => this.addTitle()} onClose={() => this.toggle(MISSING_TITLE)} />
        )}
      </div>
    )
  }

  readyPostData(id, posts) {
    const postIndex = posts.findIndex(e => e.id === id)
    const post = posts[postIndex]

    if (post) {
      this.setState({
        postIndex,
        postSource: posts[postIndex].body
      })
    } else {
      this.setState({
        missingPost: true
      })
    }
  }

  onSaveComment = (parentId, id, author, body) => {
    const { updateComment, createComment } = this.props
    if (!id) {
      createComment({
        id: rnd(),
        body,
        author,
        parentId,
        timestamp: new Date().getTime()
      })
    } else {
      updateComment({
        id,
        body,
        timestamp: new Date().getTime()
      })
      if (id === this.state.commentEditing) {
        this.onChange('commentEditing', -1)
      }
    }
  }

  onLike = id => {
    const { comments, voteComment } = this.props
    const comment = comments.find(p => p.id === id)
    if (comment) {
      voteComment(id, comment.voted ? 'downVote' : 'upVote')
    }
  }
  
  onLikeArticle = (id, voted) => {
    const { votePost } = this.props
    votePost(id, voted ? 'downVote' : 'upVote')
  }

  onChangePage = index => {
    const { posts, fetchComments } = this.props
    this.updatePostIndex(index)
    if (posts.length > 0 && posts.length >= index) {
      fetchComments(posts[index].id)
    }
  }

  updatePostIndex = postIndex => {
    this.setState({
      postIndex
    })
  }

  updatePost = (editor, data, value) => {
    this.setState({
      postSource: value
    })
  }

  toggleEdit = () => {
    const { goto, edit, match } = this.props
    const { postIndex } = this.state
    this.setState({
      [EDIT]: !this.state[EDIT],
      postSource: this.props.posts[postIndex].body
    })
    goto(edit ? match.url.split('?')[0] : match.url + '?edit=1')
  }

  onChange = (prop, value) => {
    this.setState({
      [prop]: value
    })
  }

  toggle = prop => {
    this.onChange(prop, !this.state[prop])
  }

  addTitle = () => {
    const { postSource } = this.state
    const title = getTitle(postSource)
    if (!title) {
      this.updatePost(null, null, `# Example Title \n ${postSource}`)
      this.toggle(MISSING_TITLE)
    }
  }

  // server does not broadcast events
  // articles have to be removed locally and remotely
  // after removal, go back to the previous page
  removeArticle = () => {
    const { posts, deletePost, goto, category } = this.props
    const { postIndex } = this.state
    const id = posts[postIndex].id
    deletePost(id)
    this.toggle(EDIT)
    goto(`/${category}`)
  }

  saveArticle = () => {
    const { posts, updatePost } = this.props
    const { postSource, postIndex } = this.state
    const id = posts[postIndex].id
    const title = getTitle(postSource)
    if (title) {
      updatePost({ id, title: title.text, body: postSource })
      this.toggleEdit()
    } else {
      this.toggle(MISSING_TITLE)
    }
  }
}

const mapDispatchToProps = {
  goto: push,
  fetchPosts,
  deletePost,
  updatePost,
  votePost,
  fetchComments,
  deleteComment,
  updateComment,
  createComment,
  voteComment
}

const mapStateToProps = state => {
  const { comments, sort, posts, router } = state
  const category = router.location.pathname.split('/')[1]
  const type = sort.type
  return {
    category: category,
    edit: router.location.search.indexOf('edit') !== -1,
    comments: comments.sort(multiSort('-voteScore', '-timestamp')),
    posts: posts.filter(postFilter(category)).sort(postSort(type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostRoute)
