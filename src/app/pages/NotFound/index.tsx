import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ROUTE_HOME_PAGE } from '$routes/constants';

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'secondary.light',
        p: 4,
      }}
    >
      <Typography variant='h2' data-testid='not-found-message'>
        404 - Not found the page with your request
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Link to={ROUTE_HOME_PAGE} data-testid='home-page-link'>
          Go to Homepage
        </Link>
      </Box>
    </Box>
  );
}
