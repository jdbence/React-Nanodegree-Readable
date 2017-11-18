import styled from 'styled-components'

const HeaderContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${props => (props.padded ? 'padding: 0 16px;' : '')};
`
export default HeaderContent
