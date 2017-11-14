import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Header, HeaderContent} from 'components/ui/header'
import Page from 'components/ui/page'
import Drawer from 'components/ui/drawer'
import Article from 'components/ui/article'
import {IconButton} from 'components/ui/button'
import Radio from 'components/ui/radio'
import { push, goBack } from 'react-router-redux'
import { fetchPosts } from 'modules/PostModule'
import { capitalize } from 'utils/StringUtil'
import { alphaSort, dateSort, ratingSort } from 'utils/ArrayUtil'
import backIcon from 'static/icon/arrow-back.svg'
import settingsIcon from 'static/icon/settings.svg'
import {setSort, ALPHA, DATE, RATING} from 'modules/SortModule'

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`

class CategoryRoute extends Component {
  
  state = {
    settings: false
  }
  
  componentDidMount(){
    const { posts, match, fetchPosts } = this.props
    const category = match.params.category
    if(posts.length === 0){
      fetchPosts(category)
    }
  }
  
  render () {
    const { posts, match, goto, goBack, sort } = this.props
    const category = match.params.category
    const { settings } = this.state
    const sortOptions = [ALPHA, DATE, RATING]
    
    return (
      <div className="app">
        <Header>
          <IconButton src={backIcon} alt="back" onClick={goBack}/>
          <HeaderContent>{capitalize(category)}</HeaderContent>
          <IconButton src={settingsIcon} alt="settings" onClick={() => this.toggle('settings')}/>
        </Header>
        <Page>
          <CardContainer>
            {posts.map(p => <Article {...p} key={`card_${p.id}`} onClick={()=>goto(`/${p.category}/${p.id}`)}/>)}
          </CardContainer>
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
  fetchPosts,
  goBack,
  setSort,
  goto: push
}

const mapStateToProps = state => {
  const category = state.router.location.pathname.split('/')[1]
  const type = state.sort.type
  return {
    sort: state.sort.type,
    posts: state.posts
      .filter(item => item.category === category)
      .sort(type === ALPHA.type
        ? alphaSort
        : type === DATE.type
        ? dateSort
        : ratingSort)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryRoute)
