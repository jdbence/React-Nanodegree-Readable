import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Header, HeaderContent } from 'components/ui/header'
import Page from 'components/ui/page'
import { IconButton } from 'components/ui/button'
import { MissingTitleModal, CreateArticleModal } from 'components/ui/modal'
import Dropdown from 'react-dropdown'
import SwipeableViews from 'react-swipeable-views'
import { goBack } from 'react-router-redux'
import { createPost } from 'modules/PostModule'
import md from 'react-markings'
import getTitle from 'get-md-title'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { rnd } from 'utils/StringUtil'
import saveIcon from 'static/icon/upload.svg'
import cancelIcon from 'static/icon/cancel.svg'

const RESIZE_WAIT = 400
const MISSING_TITLE = 'missingTitle'
const CREATE = 'create'

const exampleSource = `
![Image](/static/img/react.png)
# This is the post title
---
Use normal Markdown

> Add blockquote

- You can add lists
- Add [links](https://github.com)

`
const Preview = styled.div`
  flex: 1;
  background-color: white;
  border-left: 1px solid #eee;
  width: 100%;
  & > div {
    padding: 0 10px;
  }
  & img {
    max-width: 100%;
    height: auto;
  }
`

const styles = {
  slide: {
    display: 'flex'
  },
  container: {
    paddingTop: 56,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    display: 'flex'
  }
}

class CreateRoute extends Component {
  state = {
    edit: false,
    create: false,
    missingTitle: false,
    postSource: exampleSource,
    category: 'react',
    windowWidth: 1000,
    pageIndex: 0
  }

  componentWillMount() {
    this.lastWindowEvent = 0
    window.addEventListener('resize', this.onResize, false)
  }

  componentWillUnmount() {
    clearTimeout(this.windowTimeout)
    window.removeEventListener('resize', this.onResize)
  }

  componentDidMount() {
    this.onResize(null, false)
  }

  render() {
    const { goBack } = this.props
    const { postSource, missingTitle, create, category, windowWidth, pageIndex } = this.state
    const options = { mode: 'markdown', lineNumbers: true, safe: true }
    const categories = ['react', 'redux', 'udacity']
    const isMobile = windowWidth < 1000
    return (
      <div className="app">
        <Header>
          <HeaderContent padded>
            New Article
            <Dropdown options={categories} onChange={this.onSelectCategory} value={category} placeholder="" />
          </HeaderContent>
          <IconButton src={saveIcon} alt="save" onClick={this.checkArticle} />
          <IconButton src={cancelIcon} alt="cancel" onClick={goBack} />
        </Header>
        {isMobile && (
          <SwipeableViews
            enableMouseEvents
            index={pageIndex}
            onChangeIndex={this.updatePageIndex}
            style={styles.container}
            slideStyle={styles.slide}
          >
            <CodeMirror
              value={postSource}
              onBeforeChange={this.updatePost}
              options={options}
              className={'mdPostFull'}
            />
            <Preview>{md([postSource])}</Preview>
          </SwipeableViews>
        )}
        {!isMobile && (
          <Page row>
            <CodeMirror value={postSource} onBeforeChange={this.updatePost} options={options} className={'mdPost'} />
            <Preview>{md([postSource])}</Preview>
          </Page>
        )}
        {create && <CreateArticleModal onCreate={this.createArticle} onClose={() => this.toggle(CREATE)} />}
        {missingTitle && (
          <MissingTitleModal onAddTitle={() => this.addTitle()} onClose={() => this.toggle(MISSING_TITLE)} />
        )}
      </div>
    )
  }

  onResize = (e, wait = true) => {
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    const now = new Date().getTime()
    if (wait && now - this.lastWindowEvent < RESIZE_WAIT) {
      clearTimeout(this.windowTimeout)
      this.windowTimeout = setTimeout(() => {
        this.lastWindowEvent = new Date().getTime()
        this.setState({
          windowWidth
        })
      }, 200)
    } else {
      this.lastWindowEvent = now
      this.setState({
        windowWidth
      })
    }
  }

  updatePageIndex = pageIndex => {
    this.setState({
      pageIndex
    })
  }

  updatePost = (editor, data, value) => {
    this.setState({
      ...this.state,
      postSource: value
    })
  }

  checkArticle = () => {
    const { postSource } = this.state
    const title = getTitle(postSource)
    if (title) {
      this.toggle(CREATE)
    } else {
      this.toggle(MISSING_TITLE)
    }
  }

  createArticle = author => {
    const { createPost, goBack } = this.props
    const { postSource, category } = this.state
    const title = getTitle(postSource)
    if (title) {
      createPost({
        id: rnd(20),
        title: title.text,
        body: postSource,
        timestamp: new Date().getTime(),
        author,
        category
      })
      goBack()
    }
  }

  addTitle = () => {
    const { postSource } = this.state
    const title = getTitle(postSource)
    if (!title) {
      this.updatePost(null, null, `# Example Title \n ${postSource}`)
      this.toggle(MISSING_TITLE)
    }
  }

  onSelectCategory = category => {
    this.setState({
      category: category.value
    })
  }

  toggle = prop => {
    this.setState({
      [prop]: !this.state[prop]
    })
  }
}

const mapDispatchToProps = {
  goBack,
  createPost
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoute)
