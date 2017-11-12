import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Header, HeaderContent} from 'components/ui/header'
import Article from 'components/ui/article'
import {IconButton} from 'components/ui/button'
import { push, goBack } from 'react-router-redux'
import { getPosts } from 'modules/PostModule'
import { capitalize } from 'utils/StringUtil'
import backIcon from 'static/icon/arrow-back.svg'
import settingsIcon from 'static/icon/settings.svg'

const CardContainer = styled.div`
  display: flex;
  padding-left: 16px;
  padding-right: 16px;
  flex-wrap: wrap;
  justify-content: space-evenly;
`

class CategoryRoute extends Component {
  
  componentDidMount(){
    const { posts, match } = this.props
    const category = match.params.category
    if(posts.length === 0){
      this.props.getPosts(category)
    }
  }
  
  render () {
    const { posts, match, goto, goBack } = this.props
    const category = match.params.category
    return (
      <div className="App">
        <Header>
          <IconButton src={backIcon} alt="back" onClick={goBack}/>
          <HeaderContent>{capitalize(category)}</HeaderContent>
          <IconButton src={settingsIcon} alt="settings"/>
        </Header>
        <div style={{height: 56}} />
        <CardContainer>
          {posts.map(p => <Article {...p} key={`card_${p.id}`} onClick={()=>goto(`/${p.category}/${p.id}`)}/>)}
        </CardContainer>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getPosts,
  goBack,
  goto: push
}

const mapStateToProps = state => {
  const category = state.router.location.pathname.split('/')[1]
  return {
    posts: state.posts.filter(item => item.category === category)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryRoute)
