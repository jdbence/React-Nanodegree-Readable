import React from 'react'
import styled from 'styled-components'

const Card = styled.article`
  display: flex;
  ${props => props.query}
  height: ${props => (isNaN(props.height) ? props.height : `${props.height}px`)};
  max-width: ${props =>(isNaN(props.maxWidth) ? props.maxWidth : `${props.maxWidth}px`)};
  ${props => props.onClick ? 'cursor: pointer;' : ''}
  width: ${props =>(isNaN(props.width) ? props.width : `${props.width}px`)};
  margin-top: 16px;
  border-radius: 5px;
  overflow: hidden;
  background-color: white;
  position: relative;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 3px 1px -2px rgba(0, 0, 0, 0.12);
`

export default Card
