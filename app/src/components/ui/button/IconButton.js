import React from 'react'
import styled from 'styled-components'
import {default as Button} from './Button'

const IconButton = Button.extend`
  width: 56px;
  height: 56px;
  padding: 0;
  min-width: 0;
  & > img {
    width: 50%;
  }
`
export default IconButton