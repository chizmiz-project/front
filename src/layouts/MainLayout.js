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

export default function MainLayout(props) {

    const [state, setState] = React.useState(false);

    const toggleDrawer = (event) => {
        setState((state) => !state);
    };

    return <div>
        <SwipeableDrawer
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
        </AppBar>

        <Box>
            {props.children}
        </Box>
    </div>
}