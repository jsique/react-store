import React from "react";
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/home';
import Login from './components/login';
import DetailProduct from './components/detail-product/detail_product';
import { AuthProvider } from './services/authContext';
import {ProtectedRoute} from './components/protectedRoute';

function App() {
  return (
    
    /*<div className="App">
      <header className="App-header">
      </header>
    </div>*/
    <AuthProvider>
      <Routes>
        <Route path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute> 
          }
        />
        <Route path="/login" element={<Login/>} />
        <Route path="/detail_product/:productId" element={
          <ProtectedRoute>
            <DetailProduct/>
          </ProtectedRoute>
          } />
      </Routes>
    </AuthProvider>
  );
}

export default App;
