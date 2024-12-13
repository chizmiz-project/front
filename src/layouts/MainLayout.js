import React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    TextField,
    InputAdornment,
    Box,
    SwipeableDrawer,
    easing
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DrawerAppBar from './Appbar';
import Container from '@mui/material/Container';

export default function MainLayout(props) {

    return <Container>
        <DrawerAppBar></DrawerAppBar>
        {/* <SwipeableDrawer
            open={state}
            onClose={toggleDrawer}
            onOpen={toggleDrawer}
            SlideProps={{
                direction: 'left',
            }}
        >
            <Box width='350px' height='100px' m={2} bgcolor='gray'></Box>
        </SwipeableDrawer>

        <AppBar position="static" color="default">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    onClick={toggleDrawer}
                >
                    <MenuIcon />
                </IconButton>

                <TextField
                    placeholder="Search..."
                    variant="outlined"
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Toolbar>
        </AppBar> */}

        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={3}>
            {props.children}
        </Box>
        </Container>

}