import React from 'react'
import styled from 'styled-components'
import Splash from 'components/ui/splash'



const DrawerHoc = ({maxWidth=240, top=0, onClick, ...props}) => {
  const Drawer = styled.div`
    max-width: ${isNaN(maxWidth) ? maxWidth : `${maxWidth}px`};
    width: 100%;
    top: ${isNaN(top) ? top : `${top}px`};
    right: 0;
    bottom: 0;
    position: absolute;
    background-color: white;
    padding: 10px;
  `
  return <Splash onClick={onClick}><Drawer {...props} /></Splash>
}

export default DrawerHoc