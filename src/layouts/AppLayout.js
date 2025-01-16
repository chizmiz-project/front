import { Box, Container } from "@mui/material";
import { AppBar } from "../components/AppBar";

const AppLayout = ({variant = 'title', title = '', hasNavigate = true, children, onSearchChange}) => {
    return (
        <Box display={'flex'} flexDirection={'column'} minHeight={'100vh'}>
            <AppBar variant={variant} title={title} hasNavigate={hasNavigate} onSearchChange={onSearchChange}/>
            <Container sx={{ py: 2, display:'flex', flexFlow:'column', justifyContent: 'space-between', flex:1}}>
                {children}
            </Container>
        </Box>
    )
}

export default AppLayout;