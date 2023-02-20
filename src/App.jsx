import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import {Home,Login,Register,SingleUser} from "./pages/index"
import { Headers,ProtectedRoute } from './components/index'
const App = () => {
  return (
    <div style={{overflowX:"hidden"}}>
      <BrowserRouter>
      <Headers/>
       <Routes>
         <Route path='/' element={<ProtectedRoute>
             <Home/>
         </ProtectedRoute>}/>
         <Route path="user/:id"
          element={<ProtectedRoute>
            <SingleUser/>
        </ProtectedRoute>} />
         <Route path="/login" element={<Login/>}/>
         <Route path="/register" element={<Register/>}/>
       </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
