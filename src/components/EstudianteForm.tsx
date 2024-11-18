import React, { useState, useEffect } from 'react';
import { 
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Stack
} from '@mui/material';
import EstudianteService from '../services/EstudianteService';
import { Estudiante } from '../types/Estudiante';

interface EstudianteFormProps {
    onEstudianteAdded: (estudiante: Estudiante) => void;
    onEstudianteUpdated: (estudiante: Estudiante) => void;
    estudianteToEdit?: Estudiante;
}

const EstudianteForm: React.FC<EstudianteFormProps> = ({ 
    onEstudianteAdded, 
    onEstudianteUpdated, 
    estudianteToEdit 
}) => {
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
                const response = await EstudianteService.updateEstudiante(
                    estudianteToEdit.id, 
                    estudianteData as Estudiante
                );
                onEstudianteUpdated(response.data);
            } else {
                const response = await EstudianteService.createEstudiante(
                    estudianteData as Estudiante
                );
                onEstudianteAdded(response.data);
            }
            resetForm();
        } catch (error) {
            console.error('Error saving estudiante:', error);
        }
    };

    const resetForm = () => {
        setNombre('');
        setApellido('');
        setEmail('');
        setIsEditMode(false);
    };

    return (
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
                {isEditMode ? 'Editar Estudiante' : 'Agregar Nuevo Estudiante'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack spacing={2}>
                    <TextField
                        fullWidth
                        label="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        size="small"
                    />
                    <TextField
                        fullWidth
                        label="Apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        required
                        size="small"
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        size="small"
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            {isEditMode ? 'Actualizar' : 'Agregar'}
                        </Button>
                        {isEditMode && (
                            <Button
                                type="button"
                                variant="outlined"
                                onClick={resetForm}
                                fullWidth
                            >
                                Cancelar
                            </Button>
                        )}
                    </Box>
                </Stack>
            </Box>
        </Paper>
    );
};

export default EstudianteForm;