import React from 'react'
import styled from 'styled-components'
import Card from 'components/ui/card'
import { IconButton, ToggleHeart, CommentsButton } from 'components/ui/button'
import Image from 'components/ui/image'
import { Avatar, AvatarDesc } from 'components/ui/avatar'
import { capitalize, color, dateStamp } from 'utils/StringUtil'
import { default as ellipsis } from 'components/mixin/ellipsis'
import getImage from 'get-md-image'
import md from 'commonmark-helpers'
import trashIcon from 'static/icon/garbage.svg'
import editIcon from 'static/icon/edit.svg'

const ButtonActions = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  border-top-left-radius: 5px;
  background-color: #007bff6e;
`

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

const Article = ({
  id,
  voted = false,
  voteScore,
  title,
  body,
  author,
  commentCount,
  timestamp,
  onClick,
  onLike,
  onDelete,
  onEdit
}) => {
  // get image if one exists
  const img = getImage(body)
  // strip markdown to show plain text
  body = md.text(md.matchRemove(body, md.isHeader)).slice(0, 100) + '...'
  return (
    <Card onClick={onClick} query={CardQuery} height={280} maxWidth={500}>
      <CommentsButton comments={commentCount} />
      <Image href={img && img.src} className="image">
        <ButtonActions>
          <IconButton
            src={trashIcon}
            onClick={e => {
              e.stopPropagation()
              onDelete(id)
            }}
          />
          <IconButton
            src={editIcon}
            onClick={e => {
              e.stopPropagation()
              onEdit(id)
            }}
          />
        </ButtonActions>
      </Image>
      <ToggleHeart onClick={onLike} voted={voted} voteScore={voteScore} />
      <CardBody>
        <div>
          <h3>{title}</h3>
          <p>{body}</p>
        </div>
        <AvatarContainer>
          <Avatar color={color(author)}>{capitalize(author[0])}</Avatar>
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
