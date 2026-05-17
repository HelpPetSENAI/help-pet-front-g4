import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GlobalStyle from './styles/GlobalStyle.js'
import ComingSoonPage from './pages/CommingSoonPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import ExamplePage from './pages/ExamplePage.jsx'
import Dashboard from './pages/page-g8/DashboardPage.jsx'
import MessagePageG6 from './pages/page-g6/MessagePageG6.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ComingSoonPage />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/coming-soon',
    element: <ComingSoonPage />
  },
  {
    path: '/example',
    element: <ExamplePage />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/message',
    element: <MessagePageG6 />
  },
])

export default function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  )
}
