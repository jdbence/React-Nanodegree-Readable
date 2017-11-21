import styled from 'styled-components'

const Page = styled.main`
  padding-top: ${({ top = 56 }) => (isNaN(top) ? top : `${top}px`)};
  max-width: ${({ maxWidth = 1048 }) => (isNaN(maxWidth) ? maxWidth : `${maxWidth}px`)};
  width: 100%;
  margin: 0 auto;
  flex: 1;
  ${props => (props.background ? `background-color: ${props.background};` : '')}
  ${props => props.row ? `display: flex; flex-direction: row;`: ''}
  ${props => props.flex ? `display: flex;`: ''}
    
`
export default Page
