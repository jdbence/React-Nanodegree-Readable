import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Header, HeaderContent} from 'components/ui/header'
import Article from 'components/ui/article'
import {IconButton} from 'components/ui/button'
import Page from 'components/ui/page'
import Drawer from 'components/ui/drawer'
import {Link} from 'react-router-dom'
import { dash } from 'utils/StringUtil'
import { getCategories } from 'modules/CategoryModule'
import { getPosts } from 'modules/PostModule'
import { push } from 'react-router-redux'
import settingsIcon from 'static/icon/settings.svg'

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`

const Categories = styled.div`
  padding-top: 8px;
  overflow-x: auto;
  width: 100%;
`

const CategoriesInner = styled.div`
  display: inline-flex;
`

const Category = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  cursor: pointer;
  margin: 8px;
  padding: 0 16px;
  line-height: 2em;
  text-transform: uppercase;
  user-select: none;
  font-weight: 500;
  color: white;
  background-color: red;
  &:hover {
    background-color: #ca0000;
  }
`

const linkStyle = {textDecoration: 'none', color:'inherit'}

class HomeRoute extends Component {
  
  state = {
    settings: false
  }
  
  componentDidMount() {
    // fetchComments('8xf0y6ziyjabvozdd253nd').then(d => console.log('fetchComments', d))
    // fetchCategories().then(d => console.log('fetchCategories', d))
    // fetchPosts().then(d => console.log('fetchPosts', d))
    // fetchPosts('/redux').then(d => console.log('fetchPosts', d))
    const { categories } = this.props
    if(categories.length === 0){
      this.props.getCategories()
      this.props.getPosts()
    }
  }
  
  render () {
    const { categories, posts, goto } = this.props
    const { settings } = this.state
    
    return (
      <div className="app">
        <Header>
          <HeaderContent padded>Readable</HeaderContent>
          <IconButton src={settingsIcon} alt="settings" onClick={() => this.toggle('settings')}/>
        </Header>
        <Page>
          <Categories>
            <CategoriesInner>
              {categories.map(d => (
                <Link key={`category_${d.name}`} to={`/${dash(d.name)}`} style={linkStyle}>
                  <Category>{d.name}</Category>
                </Link>
              ))}
            </CategoriesInner>
          </Categories>
          <CardContainer>
            {posts.map(p => <Article {...p} key={`card_${p.id}`} onClick={()=>goto(`/${p.category}/${p.id}`)}/>)}
          </CardContainer>
        </Page>
        {settings && <Drawer onClick={() => this.toggle('settings')}>
          Settings
        </Drawer>
        }
      </div>
    )
  }
  
  toggle = (prop) => {
    this.setState({
      ...this.state,
			[prop]: !this.state[prop],
		})
  }
}

const mapDispatchToProps = {
  getCategories,
  getPosts,
  goto: push
}

const mapStateToProps = state => ({
  categories: state.categories,
  posts: state.posts
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeRoute)
