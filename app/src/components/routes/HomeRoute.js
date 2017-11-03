import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, {css} from 'styled-components';
import logo from 'static/icon/logo.svg';
import Card from 'components/ui/card';
import Image from 'components/ui/image';
import Avatar from 'components/ui/avatar';

const ellipsisMixin = css`
  display: block; /* Fallback for non-webkit */
  display: -webkit-box;
  font-size: ${props =>props.size}px;
  line-height: ${props =>props.height};
  -webkit-line-clamp: ${props =>props.lines};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardContainer = styled.div`
  display: flex;
  padding-left: 16px;
  padding-right: 16px;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const Categories = styled.div`
  padding-top: 8px;
  overflow-x: auto;
  width: 100%;
`;

const CategoriesInner = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  min-width: 1350px;
`;

const Category = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  border-radius: 10px;
  width: 135px;
  height: 50px;
  cursor: pointer;
  margin: 8px;
`;

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
    ${props => ellipsisMixin}
  }
`;

const AvatarContainer = styled.div`
  display: flex;
`;

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
    ${props => ellipsisMixin}
  }
`;

class HomeRoute extends Component {
  render(){
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
    `;
    const categories = ['All', 'Characters', 'Creatures', 'Droids', 'Locations', 'Organizations', 'Species', 'Vehicles', 'Weapons+Tech'];
    const data = [{
      title: 'Article Title',
      body:'Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body',
      img: 'https://cdn-images-1.medium.com/max/400/1*cyKYMbZY8mvfeCPBeXZAtg.jpeg'
    },{
      title: 'Article Title',
      body:'Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body',
      img: 'https://cdn-images-1.medium.com/max/400/1*cyKYMbZY8mvfeCPBeXZAtg.jpeg'
    },{
      title: 'Article Title',
      body:'Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body',
      img: 'https://cdn-images-1.medium.com/max/400/1*cyKYMbZY8mvfeCPBeXZAtg.jpeg'
    },{
      title: 'Article Title',
      body:'Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body Article Body Article Body Article Body Article Body Body Article Body Article Body Article Body',
      img: 'https://cdn-images-1.medium.com/max/400/1*cyKYMbZY8mvfeCPBeXZAtg.jpeg'
    }];
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Categories>
          <CategoriesInner>
          {
            categories.map((d, i) => <Category key={`category_${i}`}>{d}</Category>)
          }
          </CategoriesInner>
        </Categories>
        <CardContainer>
          {data.map((d, i) =>
            <Card key={`card_${i}`} query={CardQuery} height={280} maxWidth={500}>
              <Image href={d.img} className="image"/>
              <CardBody>
                <div>
                  <h3>{d.title}</h3>
                  <p>{d.body}</p>
                </div>
                <AvatarContainer>
                  <Avatar>
                    T
                  </Avatar>
                  <AvatarDesc>
                    <p>Author name</p>
                    <p>Oct 18</p>
                  </AvatarDesc>
                </AvatarContainer>
              </CardBody>
            </Card>)}
        </CardContainer>
      </div>
    );
  }
}

const mapDispatchToProps = {
};

const mapStateToProps = state => ({
  books: {}//state.books.books
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeRoute);