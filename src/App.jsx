import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RegisterPetPage from './pages/RegisterPetPage/RegisterPetPage.jsx'
import ShowPetsPage from './pages/ShowPetsPage/ShowPetsPage.jsx'
import ComingSoonPage from './pages/CommingSoonPage/CommingSoonPage.jsx'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx'
import GlobalStyle from './styles/GlobalStyle.js'

// Criando uma array para definir as rotas do site utilizando a função createBrowserRouter importada
const router = createBrowserRouter([
  {
    path: '/',
    element: <ShowPetsPage />,
    // Error element aparece no caso de digitar um endereço que não existe, link com caminho errado ou erros de carregamento
    // Apenas essa declaração de error element aparece em caso de erro em qualquer página
    errorElement: <NotFoundPage />
  },
  {
    path: '/coming-soon',
    element: <ComingSoonPage />
  },
  {
    path: '/register-pet',
    element: <RegisterPetPage />
  },
  {
    path: '/show-pets',
    element: <ShowPetsPage />
  },
])

export default function App() {

  return (
    <>
      <GlobalStyle />
      {/* RouterProvider fornece as rotas definidas acima para serem renderizadas através do atríbuto router */}
      <RouterProvider router={router} />
    </>
  )
}
