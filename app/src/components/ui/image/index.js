import React from 'react'
import styled from 'styled-components'

const ImageHoc = ({ href, height, width, ...props }) => {
  const Image = styled.div`
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-color: #eaf4ff;
    background-image: url("${props => href}");
    height: ${props => (isNaN(height) ? height : `${height}px`)};
    width: ${props => (isNaN(width) ? width : `${width}px`)};
  `
  return <Image {...props} />
}

export default ImageHoc
