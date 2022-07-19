import React from "react";
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/home';
import Login from './components/login';
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
      </Routes>
    </AuthProvider>
  );
}

export default App;
