import { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Grid,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import UserMenu from './UserMenu';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import { NavLink } from 'react-router-dom';
import DrawerMenu from './DrawerMenu';
import GuestMenu from './GuestMenu';
import { appRoutes } from '../../../utils/constants.ts';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (user === undefined) {
    return null;
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" position="sticky">
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {!user ? (
                <Link to={appRoutes.register}>Map eye</Link>
              ) :
                <Link to={appRoutes.home}>Map eye</Link>
              }
            </Typography>
            <Box sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}>
              {user ? <UserMenu user={user} /> : <GuestMenu />}
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
      <DrawerMenu open={mobileOpen} toggleDrawer={handleDrawerToggle} />
    </Box>
  );
};

export default AppToolbar;
