import { Outlet } from 'react-router-dom';
import AppToolbar from '../components/UI/AppToolbar/AppToolbar';
import { Box, Container, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <Container
        disableGutters
        maxWidth="xl"
        component="main"
        sx={{ minHeight: '100vh', pt: 4, mb: 4 }}
      >
        <Outlet />
      </Container>
      <Box component="footer" bgcolor="primary.main">
      </Box>
    </>
  );
};

export default Layout;