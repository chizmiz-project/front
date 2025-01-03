import { Box, Container } from "@mui/material";
import { AppBar } from "../components/AppBar";

const AppLayout = ({variant = 'title', title = '', hasNavigate = true, children}) => {
    return (
        <Box minHeight={'100vh'} bgcolor={'grey.50'}>
            <AppBar variant={variant} title={title} hasNavigate={hasNavigate}/>

            <Container sx={{ py: 2 }}>
                {children}
            </Container>
        </Box>
    )
}

export default AppLayout;