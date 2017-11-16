import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Header, HeaderContent} from 'components/ui/header'
import Article from 'components/ui/article'
import {IconButton} from 'components/ui/button'
import Radio from 'components/ui/radio'
import Page from 'components/ui/page'
import Empty from 'components/ui/empty'
import Drawer from 'components/ui/drawer'
import {Link} from 'react-router-dom'
import { dash } from 'utils/StringUtil'
import { alphaSort, dateSort, ratingSort } from 'utils/ArrayUtil'
import { fetchCategories } from 'modules/CategoryModule'
import { fetchPosts, votePost } from 'modules/PostModule'
import {setSort, ALPHA, DATE, RATING} from 'modules/SortModule'
import { push } from 'react-router-redux'
import settingsIcon from 'static/icon/settings.svg'
import newPostIcon from 'static/icon/newspaper.svg'

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
    const { categories, fetchCategories, fetchPosts } = this.props
    if(categories.length === 0){
      fetchCategories()
      fetchPosts()
    }
  }
  
  render () {
    const { categories, posts, goto, sort } = this.props
    const { settings } = this.state
    const sortOptions = [ALPHA, DATE, RATING]
    
    return (
      <div className="app">
        <Header>
          <HeaderContent padded>Readable</HeaderContent>
          <IconButton src={newPostIcon} alt="New Post" onClick={()=>goto(`/create`)}/>
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
            {posts.map(p => <Article {...p} key={`card_${p.id}`} onLike={()=>this.onLike(p.id)} onClick={()=>goto(`/${p.category}/${p.id}`)}/>)}
          </CardContainer>
          {posts.length === 0 && <Empty/>}
        </Page>
        {settings &&
          <Drawer onClick={() => this.toggle('settings')}>
            Sort By:
            {sortOptions.map(({type}) => <Radio key={`radio_${type}`} checked={sort==type} onChange={this.onSortChange}>{type}</Radio>)}
          </Drawer>
        }
      </div>
    )
  }
  
  onLike = (id) => {
    const { posts, votePost } = this.props
    const post = posts.find(p => p.id === id)
    if(post){
      votePost(id, post.voted ? 'downVote' : 'upVote')
    }
  }
  
  onSortChange = (sort) => {
    this.props.setSort(
      sort === ALPHA.type
        ? ALPHA
        : sort === DATE.type
        ? DATE
        : RATING
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
  fetchCategories,
  fetchPosts,
  votePost,
  setSort,
  goto: push,
}

const mapStateToProps = state => {
  const type = state.sort.type
  return {
    categories: state.categories,
    sort: state.sort.type,
    posts: state.posts
      .sort(type === ALPHA.type
        ? alphaSort
        : type === DATE.type
        ? dateSort
        : ratingSort)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeRoute)
