import React from 'react'
import styled from 'styled-components'

const CardHoc = ({query, height, maxWidth, width, ...props}) => {
  const Card = styled.article`
    display: flex;
    ${props => query}
    height: ${props => (isNaN(height) ? height : `${height}px`)};
    max-width: ${(isNaN(maxWidth) ? maxWidth : `${maxWidth}px`)};
    ${props => props.onClick ? 'cursor: pointer;' : ''}
    width: ${(isNaN(width) ? width : `${width}px`)};
    margin-top: 16px;
    border-radius: 5px;
    overflow: hidden;
    background-color: white;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
      0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  `
  return <Card {...props} />
}

export default CardHoc
