import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/'>
      <Route path='' element={<Home/>}/>
      <Route path='createpost' element={<CreatePost/>}/>
    </Route>
  ))
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
