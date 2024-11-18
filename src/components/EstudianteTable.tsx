import React, { useEffect, useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper,
  Button,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
        <Box sx={{ width: '100%', mt: 3 }}>
            <EstudianteForm
                onEstudianteAdded={handleEstudianteAdded}
                onEstudianteUpdated={handleEstudianteUpdated}
                estudianteToEdit={estudianteToEdit}
            />
            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {estudiantes.map(estudiante => (
                            <TableRow key={estudiante.id}>
                                <TableCell>{estudiante.id}</TableCell>
                                <TableCell>{estudiante.nombre}</TableCell>
                                <TableCell>{estudiante.apellido}</TableCell>
                                <TableCell>{estudiante.email}</TableCell>
                                <TableCell>
                                    <Button
                                        startIcon={<EditIcon />}
                                        onClick={() => handleEditEstudiante(estudiante)}
                                        sx={{ mr: 1 }}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        startIcon={<DeleteIcon />}
                                        color="error"
                                        onClick={() => handleDeleteEstudiante(estudiante.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default EstudianteTable;