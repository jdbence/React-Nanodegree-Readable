import React from 'react'
import styled from 'styled-components'
import fireworksIcon from 'static/icon/fireworks.svg'

const EmptyContainer = styled.div`
  margin: 0 auto;
  max-width: 300px;
  min-height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  opacity: 0.2;
  text-align: center;
  
`

const Inner = styled.div`
  padding: 20px;
  & > img {
    width: 50%;
  }
`

const Empty = props => {
  return (
    <EmptyContainer>
      <Inner>
        <img src={fireworksIcon} alt={'fireworks'} />
        <h3>Be the first to add a article!</h3>
      </Inner>
    </EmptyContainer>
  )
}
export default Empty