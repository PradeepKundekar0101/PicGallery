import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
function App() {
  const queryClient = new QueryClient();
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/'>
      <Route path='' element={<Home/>}/>
      <Route path='createpost' element={<CreatePost/>}/>
    </Route>
  ))
  return (
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}>
    </RouterProvider>
    </QueryClientProvider>
  )
}

export default App
