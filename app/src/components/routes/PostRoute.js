import React, {Component} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {Header, HeaderContent} from 'components/ui/header'
import Page from 'components/ui/page'
import {Button, IconButton} from 'components/ui/button'
import Card from 'components/ui/card'
import Splash from 'components/ui/splash'
import SwipeableViews from 'react-swipeable-views'
import { goBack } from 'react-router-redux'
import { getPosts } from 'modules/PostModule'
import { capitalize } from 'utils/StringUtil'
import md from 'react-markings'
import getTitle from 'get-md-title';
import {Controlled as CodeMirror} from 'react-codemirror2'
import backIcon from 'static/icon/arrow-back.svg'
import trashIcon from 'static/icon/garbage.svg'
import saveIcon from 'static/icon/upload.svg'
import editIcon from 'static/icon/edit.svg'
import cancelIcon from 'static/icon/cancel.svg'
import robotIcon from 'static/icon/robot.svg'

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
const CardBody = styled.div`
  display: inline-flex;
  flex-direction: column;
  flex: 1;
  padding: 10px;
`
const Code = styled.code`
  background-color: #e8e8e8;
  padding: 10px;
`

const Fill = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MissingTitle = ({onAddTitle, onClose}) => (
  <Splash onClick={onClose}>
    <Card maxWidth={800} width="100%">
      <img src={robotIcon} alt="Robot" style={{padding: 10}}/>
      <CardBody>
        <h2>Create a title before saving..</h2>
        <Fill>
          <Code># Example Title</Code>
        </Fill>
        <div>
          <Button onClick={onAddTitle}>Add Example Title</Button>
          <Button>Close</Button>
        </div>
      </CardBody>
    </Card>
  </Splash>
)

const CardsView = ({posts, source}) => (
  <SwipeableViews enableMouseEvents slideStyle={styles.slideContainer}>
    {posts.map(p =>
    <div key={`card_${p.id}`} style={Object.assign({}, styles.slide, styles.slide1)}>
      {md([source])}
    </div>)}
  </SwipeableViews>
);

class PostRoute extends Component {
  
  state = {
    postSource: temppostSource,
    edit: false,
    missingTitle: false
  }
  
  componentDidMount(){
    const { posts, match } = this.props
    const category = match.params.category
    if(posts.length === 0){
      this.props.getPosts(category)
    }
    
  }
  
  updatePost = (editor, data, value) => {
    this.setState({
      ...this.state,
			postSource: value,
		})
  }
  
  toggle = (prop) => {
    this.setState({
      ...this.state,
			[prop]: !this.state[prop],
		})
  }
  
  addTitle = () => {
    const {postSource} = this.state
    const title = getTitle(postSource)
    if(!title){
      //TODO: why timeout required?
      setTimeout(() => {
        this.updatePost(null, null, `# Example Title \n ${postSource}`)
      }, 100)
    }
  }
  
  saveArticle = () => {
    const {postSource} = this.state
    const title = getTitle(postSource)
    if(title){
      //TODO: Save article and title seperately
      this.toggle(EDIT);
    } else {
      this.toggle(MISSING_TITLE);
    }
  }
  render () {
    const { posts, match, goBack } = this.props
    const { postSource, edit, missingTitle } = this.state
    const category = match.params.category
    const options =  { mode: 'markdown'}
    return (
      <div className="app">
        {
          edit
          ? <Header>
              <HeaderContent padded>Editing Article</HeaderContent>
              <IconButton src={trashIcon} alt="trash" onClick={this.saveArticle}/>
              <IconButton src={saveIcon} alt="save" onClick={this.saveArticle}/>
              <IconButton src={cancelIcon} alt="cancel" onClick={() => this.toggle(EDIT)}/>
            </Header>
          : <Header>
              <IconButton src={backIcon} alt="back" onClick={goBack}/>
              <HeaderContent>{capitalize(category)}</HeaderContent>
              <IconButton src={editIcon} alt="edit" onClick={() => this.toggle(EDIT)}/>
            </Header>
        }
        <Page>
          {
            edit
            ? <CodeMirror value={postSource} onBeforeChange={this.updatePost} options={options} />
            : <CardsView source={postSource} posts={posts} />
          }
        </Page>
        { missingTitle && <MissingTitle onAddTitle={() => this.addTitle()} onClose={() => this.toggle(MISSING_TITLE)}/> }
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
    posts: state.posts
      .filter(item => item.category === category)
      .sort((a, b) => {
        let aT = a.title.toLowerCase();
        let bT = b.title.toLowerCase();
        return aT < bT ? (aT > bT ? 1 : 0) : -1;
      })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostRoute)
