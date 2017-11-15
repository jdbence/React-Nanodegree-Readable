import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import registerServiceWorker from './registerServiceWorker'

require('codemirror/mode/markdown/markdown');
require('codemirror/mode/javascript/javascript');

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
