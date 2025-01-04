import { Box, Container } from "@mui/material";
import { AppBar } from "../components/AppBar";
import { backgroundColor } from "../theme";

const AppLayout = ({variant = 'title', title = '', hasNavigate = true, children, onSearchChange}) => {
    return (
        <Box minHeight={'100vh'} bgcolor={backgroundColor}>
            <AppBar variant={variant} title={title} hasNavigate={hasNavigate} onSearchChange={onSearchChange}/>

            <Container sx={{ py: 2 }}>
                {children}
            </Container>
        </Box>
    )
}

export default AppLayout;