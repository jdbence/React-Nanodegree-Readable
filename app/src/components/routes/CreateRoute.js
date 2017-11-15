import React, {Component} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {Header, HeaderContent} from 'components/ui/header'
import Page from 'components/ui/page'
import {IconButton} from 'components/ui/button'
import {MissingTitleModal, CreateArticleModal} from 'components/ui/modal'
import { goBack } from 'react-router-redux'
import { ALPHA, DATE, RATING} from 'modules/SortModule'
import { createPost } from 'modules/PostModule'
import Dropdown from 'react-dropdown'
import md from 'react-markings'
import getTitle from 'get-md-title';
import {Controlled as CodeMirror} from 'react-codemirror2'
import { rnd } from 'utils/StringUtil'
import saveIcon from 'static/icon/upload.svg'
import cancelIcon from 'static/icon/cancel.svg'

const MISSING_TITLE = 'missingTitle';
const EDIT = 'edit';
const CREATE = 'create';

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
  & > div {
    padding: 0 10px;
  }
`

class CreateRoute extends Component {
  
  state = {
    edit: false,
    create: false,
    missingTitle: false,
    postSource: exampleSource,
    category: 'react'
  }
  
  render () {
    const { goBack } = this.props
    const { postSource, missingTitle, create, category } = this.state
    const options =  { mode: 'markdown', lineNumbers: true, safe: true}
    const categories = ['react', 'redux', 'udacity']
    return (
      <div className="app">
        <Header>
          <HeaderContent padded>
          New Article
          <Dropdown options={categories} onChange={this.onSelectCategory} value={category} placeholder="" />
          </HeaderContent>
          <IconButton src={saveIcon} alt="save" onClick={() => this.toggle(CREATE)}/>
          <IconButton src={cancelIcon} alt="cancel" onClick={goBack}/>
        </Header>
        <Page row={true}>
          <CodeMirror value={postSource} onBeforeChange={this.updatePost} options={options} className={'mdPost'}/>
          <Preview>
            {md([postSource])}
          </Preview>
        </Page>
        { create && <CreateArticleModal onCreate={this.createArticle} onClose={() => this.toggle(CREATE)}/> }
        { missingTitle && <MissingTitleModal onAddTitle={() => this.addTitle()} onClose={() => this.toggle(MISSING_TITLE)}/> }
      </div>
    )
  }
  
  updatePost = (editor, data, value) => {
    this.setState({
      ...this.state,
			postSource: value,
		})
  }
  
  createArticle = (author) => {
    const {createPost, goBack} = this.props
    const {postSource, category} = this.state
    const title = getTitle(postSource)
    if(title){
      createPost({
        id: rnd(20),
        title: title.text,
        body: postSource,
        timestamp: new Date().getTime(),
        author,
        category
      })
      goBack()
    } else {
      this.toggle(MISSING_TITLE)
    }
  }
  
  addTitle = () => {
    const {postSource} = this.state
    const title = getTitle(postSource)
    if(!title){
      this.updatePost(null, null, `# Example Title \n ${postSource}`)
      this.toggle(MISSING_TITLE)
    }
  }
  
  onSelectCategory = (category) => {
    this.setState({
			category: category.value,
		})
  }
  
  toggle = (prop) => {
    this.setState({
			[prop]: !this.state[prop],
		})
  }
}

const mapDispatchToProps = {
  goBack,
  createPost
}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoute)
