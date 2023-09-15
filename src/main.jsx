import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './layout/Main.jsx';
import Home from './pages/Home.jsx';
import AddPeople from './components/AddPeople.jsx';
import EditPeople from './components/EditPeople.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
      {
        path: '/',
        element: <Home></Home>,
        loader: ()=>fetch('https://vs-four-server-production.up.railway.app/allPeople')
      },
      {
        path: 'addPeople',
        element: <AddPeople></AddPeople>
      },
      {
        path: 'editPeople/:id',
        element: <EditPeople></EditPeople>,
        loader: ({params})=>fetch(`https://vs-four-server-production.up.railway.app/editPeople/${params.id}`)
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
