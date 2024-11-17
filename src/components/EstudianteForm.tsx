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
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-3">
                <label className="form-label">Nombre:</label>
                <input
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <div className="invalid-feedback">
                    Por favor ingrese un nombre.
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">Apellido:</label>
                <input
                    type="text"
                    className="form-control"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                />
                <div className="invalid-feedback">
                    Por favor ingrese un apellido.
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <div className="invalid-feedback">
                    Por favor ingrese un email válido.
                </div>
            </div>
            <button type="submit" className="btn btn-primary">
                {isEditMode ? 'Actualizar Estudiante' : 'Agregar Estudiante'}
            </button>
        </form>
    );
};

export default EstudianteForm;