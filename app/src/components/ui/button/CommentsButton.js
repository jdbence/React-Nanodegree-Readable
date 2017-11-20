import React from 'react'
import { IconButton } from 'components/ui/button'
import chatIcon from 'static/icon/chat.svg'

const CommentsButton = ({ comments }) => {
  const buttonStyle = `
    position: absolute;
    right: 0;
    bottom: 20px;
    &::after { 
      color: black;
      position: absolute;
      content: "${comments}";
      width: 50px;
      bottom: -10px;
    }
  `
  return <IconButton src={chatIcon} alt="comments" buttonStyle={buttonStyle} />
}

export default CommentsButton
