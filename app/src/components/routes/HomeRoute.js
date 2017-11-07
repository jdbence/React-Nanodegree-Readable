import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled, {css} from 'styled-components'
import Card from 'components/ui/card'
import Image from 'components/ui/image'
import Avatar from 'components/ui/avatar'
import Header, {HeaderContent} from 'components/ui/header'
import {Link} from 'react-router-dom'
import {dash} from 'utils/StringUtil'
import backIcon from 'static/icon/arrow-back.svg'

const ellipsisMixin = css`
  display: block; /* Fallback for non-webkit */
  display: -webkit-box;
  font-size: ${props => props.size}px;
  line-height: ${props => props.height};
  -webkit-line-clamp: ${props => props.lines};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

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
    ${props => ellipsisMixin};
  }
`

const AvatarContainer = styled.div`
  display: flex;
`

const AvatarDesc = styled.div.attrs({
  size: props => 16,
  height: props => 1.4,
  lines: props => 1
})`
  flex: 1;
  flex-direction: column;
  padding-left: 10px;
  display: flex;
  justify-content: space-between;
  & p {
    margin: 0;
    ${props => ellipsisMixin};
  }
`

const IconButton = styled.button`
  width: 56px;
  height: 56px;
  padding: 0;
  min-width: 0;
  & > img {
    width: 50%;
  }
`

const BackButton = props => {
  return (
    <IconButton onClick={props.onClick}>
      <img src={backIcon} alt="backIcon" />
    </IconButton>
  )
}

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
        title: 'Article Title',
        body:
          'Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body',
        img: 'https://cdn-images-1.medium.com/max/400/1*cyKYMbZY8mvfeCPBeXZAtg.jpeg'
      },
      {
        title: 'Article Title',
        body:
          'Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body',
        img: 'https://cdn-images-1.medium.com/max/400/1*cyKYMbZY8mvfeCPBeXZAtg.jpeg'
      },
      {
        title: 'Article Title',
        body:
          'Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body',
        img: 'https://cdn-images-1.medium.com/max/400/1*cyKYMbZY8mvfeCPBeXZAtg.jpeg'
      },
      {
        title: 'Article Title',
        body:
          'Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body',
        img: 'https://cdn-images-1.medium.com/max/400/1*cyKYMbZY8mvfeCPBeXZAtg.jpeg'
      },
      {
        title: 'Article Title',
        body:
          'Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body',
        img: 'https://cdn-images-1.medium.com/max/400/1*cyKYMbZY8mvfeCPBeXZAtg.jpeg'
      },
      {
        title: 'Article Title',
        body:
          'Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body',
        img: 'https://cdn-images-1.medium.com/max/400/1*cyKYMbZY8mvfeCPBeXZAtg.jpeg'
      },
      {
        title: 'Article Title',
        body:
          'Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body',
        img: 'https://cdn-images-1.medium.com/max/400/1*cyKYMbZY8mvfeCPBeXZAtg.jpeg'
      },
      {
        title: 'Article Title',
        body:
          'Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body',
        img: 'https://cdn-images-1.medium.com/max/400/1*cyKYMbZY8mvfeCPBeXZAtg.jpeg'
      },
      {
        title: 'Article Title',
        body:
          'Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body',
        img: 'https://cdn-images-1.medium.com/max/400/1*cyKYMbZY8mvfeCPBeXZAtg.jpeg'
      },
      {
        title: 'Article Title',
        body:
          'Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body',
        img: 'https://cdn-images-1.medium.com/max/400/1*cyKYMbZY8mvfeCPBeXZAtg.jpeg'
      }
    ]
    const linkStyle = {textDecoration: 'none'}
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
              <Link to={`/${dash(d)}`} style={linkStyle}>
                <Category key={`category_${i}`}>{d}</Category>
              </Link>
            ))}
          </CategoriesInner>
        </Categories>
        <CardContainer>
          {data.map((d, i) => (
            <Card key={`card_${i}`} query={CardQuery} height={280} maxWidth={500}>
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
