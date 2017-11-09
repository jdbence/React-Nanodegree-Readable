import React from 'react'
import {default as IconButton} from './IconButton'
import backIcon from 'static/icon/arrow-back.svg'

const BackButton = props => {
  return (
    <IconButton onClick={props.onClick}>
      <img src={backIcon} alt="backIcon" />
    </IconButton>
  )
}
export default BackButton