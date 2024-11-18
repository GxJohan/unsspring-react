import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Typography, Box } from '@mui/material';
import EstudianteTable from './components/EstudianteTable';
import theme from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          minHeight: '100vh',
          width: '100%',
          py: 4,
          bgcolor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Container 
          maxWidth="lg"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            sx={{ 
              mb: 4,
              fontWeight: 'medium',
              textAlign: 'center'
            }}
          >
            Gestión de Estudiantes
          </Typography>
          <Box sx={{ width: '100%' }}>
            <EstudianteTable />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;