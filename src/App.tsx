import React from 'react';
import EstudianteTable from './components/EstudianteTable';

const App: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-6xl mx-auto bg-white shadow-md rounded-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center p-4">
          Gestión de Estudiantes
        </h1>
        <EstudianteTable />
      </div>
    </div>
  );
};

export default App;