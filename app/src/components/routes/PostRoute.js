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
import { goBack } from 'react-router-redux'
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

const CommentSection = styled.section`
  margin: 0 auto;
  max-width: 700px;
`

const Comment = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
`
const CommentFooter = styled.div`
  padding-top: 10px;
`

const AvatarContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
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
  onEdit,
  onDelete
}) => (
  <SwipeableViews enableMouseEvents slideStyle={styles.slideContainer} index={index} onChangeIndex={onChange}>
    {posts.map(p => (
      <div key={`card_${p.id}`} style={{ ...styles.slide }}>
        {md([p.body])}
        <CommentSection>
          Comments
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
                      onClick={() => onDelete(c.id)}
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
        </CommentSection>
      </div>
    ))}
  </SwipeableViews>
)

class PostRoute extends Component {
  state = {
    postSource: '',
    postIndex: -1,
    edit: false,
    missingTitle: false,
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
    // find the index of the post
    if (this.state.postIndex === -1 && posts.length > 0) {
      const id = match.params.post_id
      this.updatePostIndex(posts.findIndex(e => e.id === id) || 0)
      fetchComments(id)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { posts, match, fetchComments } = nextProps
    // find the index of the post after posts loaded
    if (this.state.postIndex === -1 && posts.length > 0) {
      const id = match.params.post_id
      this.updatePostIndex(posts.findIndex(e => e.id === id) || 0, false)
      fetchComments(id)
    }
  }

  render() {
    const { posts, comments, match, goBack, deleteComment } = this.props
    const { postSource, commentEditing, edit, missingTitle, postIndex } = this.state
    const category = match.params.category
    const options = { mode: 'markdown' }
    return (
      <div className="app">
        {edit ? (
          <Header>
            <HeaderContent padded>Editing Article</HeaderContent>
            <IconButton src={trashIcon} alt="trash" onClick={this.removeArticle} />
            <IconButton src={saveIcon} alt="save" onClick={this.saveArticle} />
            <IconButton src={cancelIcon} alt="cancel" onClick={() => this.toggle(EDIT)} />
          </Header>
        ) : (
          <Header>
            <IconButton src={backIcon} alt="back" onClick={goBack} />
            <HeaderContent>{capitalize(category)}</HeaderContent>
            {posts.length > 0 && <IconButton src={editIcon} alt="edit" onClick={() => this.toggleEdit()} />}
          </Header>
        )}
        <Page>
          {posts.length === 0 ? (
            <Empty />
          ) : edit ? (
            <CodeMirror value={postSource} onBeforeChange={this.updatePost} options={options} />
          ) : (
            <CardsView
              onCancel={() => this.onChange('commentEditing', -1)}
              onSave={this.onSaveComment}
              onLike={this.onLike}
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

  onChangePage = index => {
    const { posts, fetchComments } = this.props
    this.updatePostIndex(index)
    if (posts.length > 0 && posts.length >= index) {
      fetchComments(posts[index].id)
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
      postSource: value
    })
  }

  toggleEdit = () => {
    const { postIndex } = this.state
    this.setState({
      [EDIT]: !this.state[EDIT],
      postSource: this.props.posts[postIndex].body
    })
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
    const { posts, deletePost, goBack } = this.props
    const { postIndex } = this.state
    const id = posts[postIndex].id
    deletePost(id)
    this.toggle(EDIT)
    goBack()
  }

  saveArticle = () => {
    const { posts, updatePost } = this.props
    const { postSource, postIndex } = this.state
    const id = posts[postIndex].id
    const title = getTitle(postSource)
    if (title) {
      updatePost({ id, title: title.text, body: postSource })
      this.toggle(EDIT)
    } else {
      this.toggle(MISSING_TITLE)
    }
  }
}

const mapDispatchToProps = {
  goBack,
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
    comments: comments.sort(multiSort('-voteScore', '-timestamp')),
    posts: posts.filter(postFilter(category)).sort(postSort(type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostRoute)
