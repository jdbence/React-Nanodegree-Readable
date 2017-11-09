import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled, {css} from 'styled-components'
import Card from 'components/ui/card'
import Image from 'components/ui/image'
import {Avatar, AvatarDesc} from 'components/ui/avatar'
import {Header, HeaderContent} from 'components/ui/header'
import {Link} from 'react-router-dom'
import {dash} from 'utils/StringUtil'
import {BackButton} from 'components/ui/button'
import {default as ellipsis} from 'components/mixin/ellipsis'

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

class HomeRoute extends Component {
  render () {
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
    const categories = [
      'Characters',
      'Creatures',
      'Droids',
      'Locations',
      'Organizations',
      'Species',
      'Vehicles',
      'Weapons+Tech'
    ]
    const data = [
      {
        id: '012345',
        title: 'Article Title',
        category: 'characters',
        body:
          'Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body',
        img: 'https://cdn-images-1.medium.com/max/400/1*cyKYMbZY8mvfeCPBeXZAtg.jpeg'
      },
      {
        id: '012345',
        title: 'Article Title',
        category: 'characters',
        body:
          'Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body',
        img: 'https://cdn-images-1.medium.com/max/400/1*cyKYMbZY8mvfeCPBeXZAtg.jpeg'
      },
      {
        id: '012345',
        title: 'Article Title',
        category: 'characters',
        body:
          'Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body',
        img: 'https://cdn-images-1.medium.com/max/400/1*cyKYMbZY8mvfeCPBeXZAtg.jpeg'
      },
      {
        id: '012345',
        title: 'Article Title',
        category: 'characters',
        body:
          'Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body',
        img: 'https://cdn-images-1.medium.com/max/400/1*cyKYMbZY8mvfeCPBeXZAtg.jpeg'
      },
      {
        id: '012345',
        title: 'Article Title',
        category: 'characters',
        body:
          'Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body',
        img: 'https://cdn-images-1.medium.com/max/400/1*cyKYMbZY8mvfeCPBeXZAtg.jpeg'
      },
      {
        id: '012345',
        title: 'Article Title',
        category: 'characters',
        body:
          'Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body',
        img: 'https://cdn-images-1.medium.com/max/400/1*cyKYMbZY8mvfeCPBeXZAtg.jpeg'
      },
      {
        id: '012345',
        title: 'Article Title',
        category: 'characters',
        body:
          'Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body',
        img: 'https://cdn-images-1.medium.com/max/400/1*cyKYMbZY8mvfeCPBeXZAtg.jpeg'
      },
      {
        id: '012345',
        title: 'Article Title',
        category: 'characters',
        body:
          'Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body',
        img: 'https://cdn-images-1.medium.com/max/400/1*cyKYMbZY8mvfeCPBeXZAtg.jpeg'
      },
      {
        id: '012345',
        title: 'Article Title',
        category: 'characters',
        body:
          'Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body',
        img: 'https://cdn-images-1.medium.com/max/400/1*cyKYMbZY8mvfeCPBeXZAtg.jpeg'
      },
      {
        id: '012345',
        title: 'Article Title',
        category: 'characters',
        body:
          'Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body',
        img: 'https://cdn-images-1.medium.com/max/400/1*cyKYMbZY8mvfeCPBeXZAtg.jpeg'
      }
    ]
    const linkStyle = {textDecoration: 'none', color:'inherit'}
    return (
      <div className="App">
        <Header>
          <BackButton />
          <HeaderContent>header</HeaderContent>
        </Header>
        <div style={{height: 56}} />
        <Categories>
          <CategoriesInner>
            {categories.map((d, i) => (
              <Link key={`category_${i}`} to={`/${dash(d)}`} style={linkStyle}>
                <Category >{d}</Category>
              </Link>
            ))}
          </CategoriesInner>
        </Categories>
        <CardContainer>
          {data.map((d, i) => (
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
                      <p>Author name</p>
                      <p>Oct 18</p>
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

const mapDispatchToProps = {}

const mapStateToProps = state => ({
  books: {} // state.books.books
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeRoute)
