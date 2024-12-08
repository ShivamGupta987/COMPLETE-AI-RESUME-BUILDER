import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './auth/sign-in/index.jsx'
import Home from './home/index.jsx'
import Dashboard from './Dashboard/index.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './Dashboard/resume/[resumeId]/edit/index.jsx'
import { ResumeInfoContext, ResumeInfoProvider } from './context/ResumeInfoContext.jsx'
import ViewResume from './my-resume/[resumeId]/view/index.jsx'
// import 'react-toastify/dist/ReactToastify.css';

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const router = createBrowserRouter([
  {
    
    element:<App/>,
    children: [
    
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/dashboard/resume/:resumeId/edit',
        element:<EditResume/>
      },


    ]
  }, 
  {
    path: '/',
    element: <Home/>
  },  
  {
    path: '/auth/sign-in',
    element:<SignInPage/>
  },
  {
    path: '/my-resume/:resumeId/view',
    element:<ViewResume/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <ResumeInfoProvider> {/* WrContap the provider here */}
        <RouterProvider router={router} />
      </ResumeInfoProvider>
    </ClerkProvider>
  </StrictMode>
);