import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from './components/AppRouter'
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
