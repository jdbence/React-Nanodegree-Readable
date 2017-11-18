import React from 'react'
import { default as Button } from './Button'

const IconHOC = props => {
  const IconButton = Button.extend`
    width: 56px;
    height: 56px;
    padding: 0;
    min-width: 0;
    & > img {
      width: 50%;
    }
    ${props.buttonStyle || ''};
  `
  return (
    <IconButton onClick={props.onClick}>
      {props.src && <img src={props.src} alt={props.alt} />}
      {props.children}
    </IconButton>
  )
}
export default IconHOC
