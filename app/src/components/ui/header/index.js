import React from 'react'
import styled from 'styled-components'

export const HeaderContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeaderInner = styled.div`
  display: flex;
  position: relative;
  min-height: 56px;
  padding-left: 16px;
  padding-right: 16px;
`

const Header = styled.header`
  background-color: #2196f3;
  color: white;
  color: rgba(255, 255, 255, 1);
  width: 100%;
  display: flex;
  z-index: 1100;
  box-sizing: border-box;
  flex-shrink: 0;
  flex-direction: column;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14),
    0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  top: 0;
  left: auto;
  right: 0;
  position: fixed;
`

const HeaderHoc = props => {
  return (
    <Header {...props}>
      <HeaderInner>{props.children}</HeaderInner>
    </Header>
  )
}

export default HeaderHoc
