import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Header, HeaderContent} from 'components/ui/header'
import Article from 'components/ui/article'
import {Link} from 'react-router-dom'
import { dash } from 'utils/StringUtil'
import { getCategories } from 'modules/CategoryModule'
import { getPosts } from 'modules/PostModule'
import { push } from 'react-router-redux'

const CardContainer = styled.div`
  display: flex;
  padding-left: 16px;
  padding-right: 16px;
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
    
    return (
      <div className="App">
        <Header>
          <HeaderContent>Readable</HeaderContent>
        </Header>
        <div style={{height: 56}} />
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
      </div>
    )
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
