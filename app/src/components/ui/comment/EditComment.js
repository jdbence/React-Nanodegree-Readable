import React, { Component } from 'react'
import styled from 'styled-components'
import { Button } from 'components/ui/button'

const Container = styled.div`
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  ${props => (props.center ? 'text-align:center; padding: 20px; cursor:pointer;' : 'padding: 10px;')} & input {
    margin-bottom: 10px;
  }
  & textarea {
    resize: none;
    margin-bottom: 10px;
  }
`

export default class EditComment extends Component {
  state = {
    author: '',
    comment: '',
    edit: false
  }

  componentWillReceiveProps(nextProps) {
    if(!this.state.edit){
      this.setDefaults(nextProps)
    }
  }

  componentWillMount() {
    this.setDefaults(this.props)
  }

  componentWillUnmount() {
    this.textarea = null
    clearTimeout(this.focusTimeout)
  }

  render() {
    const { author, comment, edit } = this.state
    if (!edit) {
      return (
        <Container center onClick={this.showForm}>
          Add a Comment!
        </Container>
      )
    }
    return (
      <Container>
        <label>Author</label>
        <input value={author} onChange={e => this.onChange('author', e.target.value)} />
        <label>Comment</label>
        <textarea
          ref={r => (this.textarea = r)}
          value={comment}
          onChange={e => this.onChange('comment', e.target.value)}
        />
        <div>
          <Button onClick={this.handleSave}>Save</Button>
          <Button onClick={this.handleCancel}>Cancel</Button>
        </div>
      </Container>
    )
  }

  setDefaults = props => {
    const { author, comment, edit } = props
    if (author) {
      this.setState({
        author,
        comment,
        edit
      })
    }
  }

  onChange = (prop, value) => {
    this.setState({
      [prop]: value
    })
  }

  showForm = () => {
    this.onChange('edit', true)
    clearTimeout(this.focusTimeout)
    this.focusTimeout = setTimeout(() => {
      if (this.textarea) {
        this.textarea.focus()
      }
    }, 200)
  }

  handleSave = () => {
    const { author, comment } = this.state
    const { post, id, onSave } = this.props
    onSave(post, id, author, comment)
    this.onChange('edit', false)
  }

  handleCancel = () => {
    const { onCancel } = this.props
    if (onCancel) {
      onCancel()
    }
    this.onChange('edit', false)
  }
}
