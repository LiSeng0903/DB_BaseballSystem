import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './containers/App'
import { BaseballProvider } from './containers/hooks/useBaseball'

// import { ChessProvider } from "./containers/hooks/useChess.js"

const root = ReactDOM.createRoot( document.getElementById( 'root' ) )
root.render(
  <React.StrictMode>
    <BaseballProvider>
      <App />
    </BaseballProvider>
  </React.StrictMode>
)