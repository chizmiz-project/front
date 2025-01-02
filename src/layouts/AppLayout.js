import { Box, Container } from "@mui/material";
import { AppBar } from "../components/AppBar";

const AppLayout = ({variant = 'main', title = '', children}) => {
    return (
        <Box minHeight={'100vh'} bgcolor={'grey.50'}>
            <AppBar variant={variant} title={title}/>

            <Container sx={{ py: 2 }}>
                {children}
            </Container>
        </Box>
    )
}

export default AppLayout;