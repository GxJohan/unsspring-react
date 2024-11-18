import React, { useState, useEffect } from 'react';
import EstudianteService from '../services/EstudianteService';
import { Estudiante } from '../types/Estudiante';

interface EstudianteFormProps {
    onEstudianteAdded: (estudiante: Estudiante) => void;
    onEstudianteUpdated: (estudiante: Estudiante) => void;
    estudianteToEdit?: Estudiante;
}

const EstudianteForm: React.FC<EstudianteFormProps> = ({ onEstudianteAdded, onEstudianteUpdated, estudianteToEdit }) => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (estudianteToEdit) {
            setNombre(estudianteToEdit.nombre);
            setApellido(estudianteToEdit.apellido);
            setEmail(estudianteToEdit.email);
            setIsEditMode(true);
        }
    }, [estudianteToEdit]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const estudianteData: Omit<Estudiante, 'id'> = { nombre, apellido, email };
        try {
            if (isEditMode && estudianteToEdit) {
                const response = await EstudianteService.updateEstudiante(estudianteToEdit.id, estudianteData as Estudiante);
                onEstudianteUpdated(response.data);
            } else {
                const response = await EstudianteService.createEstudiante(estudianteData as Estudiante);
                onEstudianteAdded(response.data);
            }
            setNombre('');
            setApellido('');
            setEmail('');
            setIsEditMode(false);
        } catch (error) {
            console.error('Error saving estudiante:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellido:</label>
                    <input
                        type="text"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {isEditMode ? 'Actualizar Estudiante' : 'Agregar Estudiante'}
                </button>
            </div>
        </form>
    );
};

export default EstudianteForm;