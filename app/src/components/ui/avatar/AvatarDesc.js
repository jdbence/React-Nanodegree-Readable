import styled from 'styled-components'
import ellipsis from 'components/mixin/ellipsis'

const AvatarDesc = styled.div.attrs({
  size: props => 16,
  height: props => 1.4,
  lines: props => 1
})`
  flex: 1;
  flex-direction: column;
  padding-left: 10px;
  display: flex;
  justify-content: space-between;
  & p {
    margin: 0;
    ${props => ellipsis};
  }
`

export default AvatarDesc