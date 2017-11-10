import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled, {css} from 'styled-components'
import Card from 'components/ui/card'
import Image from 'components/ui/image'
import {Avatar, AvatarDesc} from 'components/ui/avatar'
import {Header, HeaderContent} from 'components/ui/header'
import {Link} from 'react-router-dom'
import {dash, timestamp} from 'utils/StringUtil'
import {BackButton} from 'components/ui/button'
import {default as ellipsis} from 'components/mixin/ellipsis'
//import { fetchComments, fetchCategories, fetchPosts } from 'utils/ArticleAPI'
import { getCategories } from 'modules/CategoryModule'
import { getPosts } from 'modules/PostModule'

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

const CardBody = styled.div.attrs({
  size: props => props.size || 16,
  height: props => props.height || 1.4,
  lines: props => props.lines || 3
})`
  padding: 16px;
  text-align: left;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & h3 {
    margin: 0;
  }
  & p {
    margin-bottom: 0;
    ${props => ellipsis};
  }
`

const AvatarContainer = styled.div`
  display: flex;
`
const CardQuery = `
      flex-direction: column;
      width: 100%;
      & > .image {
        width: 100%;
        height: 100px;
      }
      @media (min-width: 700px) {
        flex-direction: row;
        width: 500px;
        & > .image {
          width: 200px;
          height: 100%;
        }
      }
    `
const linkStyle = {textDecoration: 'none', color:'inherit'}

class HomeRoute extends Component {
  componentDidMount() {
    // fetchComments('8xf0y6ziyjabvozdd253nd').then(d => console.log('fetchComments', d))
    // fetchCategories().then(d => console.log('fetchCategories', d))
    // fetchPosts().then(d => console.log('fetchPosts', d))
    // fetchPosts('/redux').then(d => console.log('fetchPosts', d))
    this.props.getCategories()
    this.props.getPosts()
  }
  
  render () {
    const { categories, posts } = this.props
    
    return (
      <div className="App">
        <Header>
          <HeaderContent>Readable</HeaderContent>
        </Header>
        <div style={{height: 56}} />
        <Categories>
          <CategoriesInner>
            {categories.map((d, i) => (
              <Link key={`category_${i}`} to={`/${dash(d.name)}`} style={linkStyle}>
                <Category>{d.name}</Category>
              </Link>
            ))}
          </CategoriesInner>
        </Categories>
        <CardContainer>
          {posts.map((d, i) => (
            <Link key={`card_${i}`} to={`/${d.category}/${d.id}`} style={linkStyle}>
              <Card query={CardQuery} height={280} maxWidth={500}>
                <Image href={d.img} className="image" />
                <CardBody>
                  <div>
                    <h3>{d.title}</h3>
                    <p>{d.body}</p>
                  </div>
                  <AvatarContainer>
                    <Avatar>T</Avatar>
                    <AvatarDesc>
                      <p>{d.author}</p>
                      <p>{timestamp(d.timestamp)}</p>
                    </AvatarDesc>
                  </AvatarContainer>
                </CardBody>
              </Card>
            </Link>
          ))}
        </CardContainer>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getCategories,
  getPosts
}

const mapStateToProps = state => ({
  categories: state.categories,
  posts: state.posts
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeRoute)
