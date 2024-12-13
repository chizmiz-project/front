import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';
import SidebarMenu from '../components/SidebarMenu';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: blueGrey[50],
    '&:hover': {
        backgroundColor: blueGrey[100],
    },
    marginLeft: 0,
    width: '100%',
    maxWidth: '500px'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    color: blueGrey[500],
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: blueGrey[600],
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(0.5rem + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width')
    },
}));

const navItems = ['خانه', 'درباره ما'];

function DrawerAppBar(props) {

    const { window } = props;
    const [drawerState, setDrawerState] = React.useState(false);

    const handleDrawerToggle = () => {
        setDrawerState((prevState) => !prevState);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav" elevation={false}>
                <Toolbar >

                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box display={'flex'} flexGrow={1} alignItems={'center'} padding={1}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            CH
                        </Typography>
                        <Search sx={{ minWidth: '250px' }}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="هر چیز که در جستن آنی آنی ..."
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button key={item}>
                                {item}
                            </Button>
                        ))}
                        <Button variant='contained'>ورود/ثبت نام</Button>
                    </Box>

                </Toolbar>
            </AppBar>
            <nav>
                <SwipeableDrawer
                    open={drawerState}
                    onClose={handleDrawerToggle}
                    onOpen={handleDrawerToggle}
                    SlideProps={{
                        direction: 'left',
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    <SidebarMenu></SidebarMenu>
                </SwipeableDrawer>
            </nav>
            <Box component="main" sx={{ p: 1 }}>
                <Toolbar />
            </Box>
        </Box>
    );
}

export default DrawerAppBar;
