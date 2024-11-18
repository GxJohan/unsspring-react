import React, { useEffect, useState } from 'react';
import EstudianteService from '../services/EstudianteService';
import { Estudiante } from '../types/Estudiante';
import EstudianteForm from './EstudianteForm';

const EstudianteTable: React.FC = () => {
    const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
    const [estudianteToEdit, setEstudianteToEdit] = useState<Estudiante | undefined>(undefined);

    useEffect(() => {
        fetchEstudiantes();
    }, []);

    const fetchEstudiantes = async () => {
        try {
            const response = await EstudianteService.getEstudiantes();
            setEstudiantes(response.data);
        } catch (error) {
            console.error('Error fetching estudiantes:', error);
        }
    };

    const handleEstudianteAdded = (newEstudiante: Estudiante) => {
        setEstudiantes([...estudiantes, newEstudiante]);
    };

    const handleEstudianteUpdated = (updatedEstudiante: Estudiante) => {
        setEstudiantes(estudiantes.map(est => (est.id === updatedEstudiante.id ? updatedEstudiante : est)));
        setEstudianteToEdit(undefined);
    };

    const handleDeleteEstudiante = async (id: number) => {
        try {
            await EstudianteService.deleteEstudiante(id);
            setEstudiantes(estudiantes.filter(estudiante => estudiante.id !== id));
        } catch (error) {
            console.error('Error deleting estudiante:', error);
        }
    };

    const handleEditEstudiante = (estudiante: Estudiante) => {
        setEstudianteToEdit(estudiante);
    };

    return (
        <div className="p-2 md:p-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Estudiantes</h2>
            <div className="mb-6">
                <EstudianteForm
                    onEstudianteAdded={handleEstudianteAdded}
                    onEstudianteUpdated={handleEstudianteUpdated}
                    estudianteToEdit={estudianteToEdit}
                />
            </div>
            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                            <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {estudiantes.map(estudiante => (
                            <tr key={estudiante.id} className="hover:bg-gray-50">
                                <td className="hidden md:table-cell px-4 py-3 whitespace-nowrap text-sm">{estudiante.id}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">{estudiante.nombre}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">{estudiante.apellido}</td>
                                <td className="hidden md:table-cell px-4 py-3 whitespace-nowrap text-sm">{estudiante.email}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                                    <button 
                                        onClick={() => handleEditEstudiante(estudiante)}
                                        className="inline-flex items-center px-2 py-1 text-sm text-indigo-600 hover:text-indigo-900"
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteEstudiante(estudiante.id)}
                                        className="inline-flex items-center px-2 py-1 ml-2 text-sm text-red-600 hover:text-red-900"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EstudianteTable;