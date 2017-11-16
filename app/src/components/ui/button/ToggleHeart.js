import React from 'react'
import { IconButton } from 'components/ui/button'
import HeartIcon from 'components/ui/icon/HeartIcon'
import HeartOutline from 'components/ui/icon/HeartOutline'

const ToggleHeart = ({voted, voteScore, onClick, right}) => {
  const buttonStyle = `
    ${right
      ? `
        width: auto;
        height: 28px;
        & svg {
          padding-right: 5px;
        }
      `
      : `
      position: absolute;
      left: 0;
      top: 0;
      &::after { 
        color: ${voted ? 'red' : 'black'};
        position: absolute;
        content: "${voteScore}";
        width: 50px;
        bottom: -10px;
      }`
    }
  `
  return (
    <IconButton buttonStyle={buttonStyle} onClick={(e)=>{e.stopPropagation(); onClick(e);}}>
      {voted && <HeartIcon size="28px" fill='red' border='red' />}
      {!voted && <HeartOutline size="28px" fill='black' />}
      {right && voteScore}
    </IconButton>
  )
}

export default ToggleHeart