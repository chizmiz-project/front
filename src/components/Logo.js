import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
    const navigate = useNavigate();
    return (
        <Box component="img"
             src={require('../logo.svg').default}
             alt="Logo"
             height="40px" 
             onClick={() => navigate('/')}/>
    );
};

export default Logo;
