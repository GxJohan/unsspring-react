import React from 'react';
import EstudianteTable from './components/EstudianteTable';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100">
        <h1 className="my-4 text-center">Gestión de Estudiantes</h1>
        <EstudianteTable />
      </div>
    </div>
  );
};

export default App;