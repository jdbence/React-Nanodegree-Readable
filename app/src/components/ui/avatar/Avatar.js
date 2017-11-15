import styled from 'styled-components'

const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.color || 'rgb(70, 121, 255)'};
  color: white;
  font-size: 20px;
`

export default Avatar
