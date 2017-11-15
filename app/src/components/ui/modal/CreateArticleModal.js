/*global localStorage */
import React, {PureComponent} from 'react'
import styled from 'styled-components'
import {Button} from 'components/ui/button'
import Card from 'components/ui/card'
import Splash from 'components/ui/splash'

const CardBody = styled.div`
  display: inline-flex;
  flex-direction: column;
  flex: 1;
  padding: 10px;
`

const Fill = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Error = styled.div`
  color: red;
  padding: 10px;
`;

const H2 = styled.h2`
  margin-bottom: 10px;
`

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
`

const MIN_LENGTH = 6

class CreateArticle extends PureComponent {
  state = {
    author: localStorage.getItem('author') || '',
    typed: false
  }
  onInputChange = (e) => {
    this.setState({
      author: e.target.value,
      typed: true
    })
  }
  saveArticle = () => {
    const {onCreate} = this.props
    const { author } = this.state
    localStorage.setItem('author', author)
    onCreate(author)
  }
  render(){
    const {onClose} = this.props
    const { author, typed } = this.state
    return (
      <Splash>
        <Card maxWidth={600} width="100%">
          <CardBody>
            <H2>Create Article</H2>
            <Fill>
              <label>Author</label>
              <Input type="text" name="author" key="author" placeholder='Make your mark' value={author} onChange={this.onInputChange}/>
              {typed && author.length < MIN_LENGTH && <Error >Must have atleast {MIN_LENGTH} characters</Error>}
            </Fill>
            <div>
              <Button disabled={author.length < MIN_LENGTH} onClick={this.saveArticle}>Save</Button>
              <Button onClick={onClose}>Cancel</Button>
            </div>
          </CardBody>
        </Card>
      </Splash>
    )
  }
}

export default CreateArticle