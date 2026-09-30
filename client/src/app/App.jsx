import React from 'react'
import { RouterProvider } from 'react-router'
import router from './app.route.jsx'
import { Provider } from 'react-redux'
import {store} from './app.store'



const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App