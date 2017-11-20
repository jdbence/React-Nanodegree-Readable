import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Header, HeaderContent } from 'components/ui/header'
import Page from 'components/ui/page'
import Drawer from 'components/ui/drawer'
import { Link } from 'react-router-dom'
import Article from 'components/ui/article'
import { IconButton } from 'components/ui/button'
import Radio from 'components/ui/radio'
import Empty from 'components/ui/empty'
import { push } from 'react-router-redux'
import { fetchPosts, votePost, deletePost } from 'modules/PostModule'
import { fetchCategories } from 'modules/CategoryModule'
import { setSort, ALPHA, DATE, RATING } from 'modules/SortModule'
import { capitalize, dash } from 'utils/StringUtil'
import { postSort, postFilter } from 'utils/ArrayUtil'
import backIcon from 'static/icon/arrow-back.svg'
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

const linkStyle = { textDecoration: 'none', color: 'inherit' }

class CategoryRoute extends Component {
  state = {
    settings: false
  }

  componentDidMount() {
    this.checkRemote(this.props)
  }

  componentWillReceiveProps(nextProps) {
    const lastCategory = this.props.match.params.category
    const nextCategory = nextProps.match.params.category
    if (lastCategory !== nextCategory) {
      this.checkRemote(nextProps)
    }
  }

  render() {
    const { categories, posts, match, goto, sort } = this.props
    const category = match.params.category || ''
    const { settings } = this.state
    const sortOptions = [ALPHA, DATE, RATING]
    const isRoot = category.length === 0

    return (
      <div className="app">
        <Header>
          {!isRoot && <IconButton src={backIcon} alt="back" onClick={() => goto(`/`)} />}
          {isRoot ? (
            <HeaderContent padded>Readable</HeaderContent>
          ) : (
            <HeaderContent>{capitalize(category)}</HeaderContent>
          )}
          <IconButton src={newPostIcon} alt="New Post" onClick={() => goto(`/create`)} />
          <IconButton src={settingsIcon} alt="settings" onClick={() => this.toggle('settings')} />
        </Header>
        <Page>
          {isRoot && (
            <Categories>
              <CategoriesInner>
                {categories.map(d => (
                  <Link key={`category_${d.name}`} to={`/${dash(d.name)}`} style={linkStyle}>
                    <Category>{d.name}</Category>
                  </Link>
                ))}
              </CategoriesInner>
            </Categories>
          )}
          <CardContainer>
            {posts.map(p => (
              <Article
                {...p}
                key={`card_${p.id}`}
                onLike={() => this.onLike(p.id)}
                onClick={() => goto(`/${p.category}/${p.id}`)}
                onEdit={() => goto(`/${p.category}/${p.id}?edit=1`)}
                onDelete={() => this.onDelete(p.id)}
              />
            ))}
          </CardContainer>
          {posts.length === 0 && <Empty />}
        </Page>
        {settings && (
          <Drawer onClick={() => this.toggle('settings')}>
            Sort By:
            {sortOptions.map(({ type }) => (
              <Radio key={`radio_${type}`} checked={sort === type} onChange={this.onSortChange}>
                {type}
              </Radio>
            ))}
          </Drawer>
        )}
      </div>
    )
  }

  checkRemote(props) {
    const { posts, categories, match, fetchPosts, fetchCategories } = props
    const category = match.params.category

    if (!category && categories.length === 0) {
      fetchCategories()
      fetchPosts()
    } else if (posts.length === 0) {
      fetchPosts(category)
    }
  }

  onDelete = id => {
    this.props.deletePost(id)
  }

  onLike = id => {
    const { posts, votePost } = this.props
    const post = posts.find(p => p.id === id)
    if (post) {
      votePost(id, post.voted ? 'downVote' : 'upVote')
    }
  }

  onSortChange = sort => {
    this.props.setSort(sort === ALPHA.type ? ALPHA : sort === DATE.type ? DATE : RATING)
  }

  toggle = prop => {
    this.setState({
      ...this.state,
      [prop]: !this.state[prop]
    })
  }
}

const mapDispatchToProps = {
  fetchCategories,
  fetchPosts,
  setSort,
  votePost,
  deletePost,
  goto: push
}

const mapStateToProps = state => {
  const { categories, sort, posts, router } = state
  const category = router.location.pathname.split('/')[1]
  const type = sort.type
  return {
    sort: type,
    categories,
    posts: posts.filter(postFilter(category)).sort(postSort(type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryRoute)
