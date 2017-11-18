import { css } from 'styled-components'

const ellipsis = css`
  display: block; /* Fallback for non-webkit */
  display: -webkit-box;
  font-size: ${props => props.size}px;
  line-height: ${props => props.height};
  -webkit-line-clamp: ${props => props.lines};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

export default ellipsis
