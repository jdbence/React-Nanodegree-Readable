import React from 'react'
import styled from 'styled-components'
import { Button } from 'components/ui/button'
import Card from 'components/ui/card'
import Splash from 'components/ui/splash'
import robotIcon from 'static/icon/robot.svg'

const CardBody = styled.div`
  display: inline-flex;
  flex-direction: column;
  flex: 1;
  padding: 10px;
`
const Code = styled.code`
  background-color: #e8e8e8;
  padding: 10px;
`

const Fill = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const MissingTitle = ({ onAddTitle, onClose }) => (
  <Splash>
    <Card maxWidth={800} width="100%">
      <img src={robotIcon} alt="Robot" style={{ padding: 10 }} />
      <CardBody>
        <h2>Create a title before saving..</h2>
        <Fill>
          <Code># Example Title</Code>
        </Fill>
        <div>
          <Button onClick={onAddTitle}>Add Example Title</Button>
          <Button onClick={onClose}>Close</Button>
        </div>
      </CardBody>
    </Card>
  </Splash>
)

export default MissingTitle
