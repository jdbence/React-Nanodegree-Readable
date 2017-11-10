import React from 'react'
import styled from 'styled-components'
import Card from 'components/ui/card'
import Image from 'components/ui/image'
import {Avatar, AvatarDesc} from 'components/ui/avatar'
import { capitalize, dateStamp} from 'utils/StringUtil'
import {default as ellipsis} from 'components/mixin/ellipsis'

const CardBody = styled.div.attrs({
  size: props => props.size || 16,
  height: props => props.height || 1.4,
  lines: props => props.lines || 3
})`
  padding: 16px;
  text-align: left;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & h3 {
    margin: 0;
  }
  & p {
    margin-bottom: 0;
    ${props => ellipsis};
  }
`
const CardQuery = `
  flex-direction: column;
  width: 100%;
  & > .image {
    width: 100%;
    height: 100px;
  }
  @media (min-width: 700px) {
    flex-direction: row;
    width: 500px;
    & > .image {
      width: 200px;
      height: 100%;
    }
  }
`
const AvatarContainer = styled.div`
  display: flex;
`
const Article = ({id, img, title, body, author, timestamp, onClick}) => {
  return (
    <Card onClick={onClick} query={CardQuery} height={280} maxWidth={500}>
      <Image href={img} className="image" />
      <CardBody>
        <div>
          <h3>{title}</h3>
          <p>{body}</p>
        </div>
        <AvatarContainer>
          <Avatar>{capitalize(author[0])}</Avatar>
          <AvatarDesc>
            <p>{author}</p>
            <p>{dateStamp(timestamp)}</p>
          </AvatarDesc>
        </AvatarContainer>
      </CardBody>
    </Card>
  )
}
export default Article