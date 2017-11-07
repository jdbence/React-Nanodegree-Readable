import { configure } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'

const req = require.context('../src/components', true, /\.stories\.js$/)

setOptions({
  name: 'readable',
  url: 'https://github.com/jdbence/React-Nanodegree-Readable',
  downPanelInRight: true
})

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module)