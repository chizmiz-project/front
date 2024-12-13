import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Stack,
} from '@mui/material';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';


const initialMessages = [
    { id: 1, text: 'سلام! حالتون چطور است؟', sender: 'user' },
    { id: 2, text: 'سلام! من خوبم، متشکرم. شما چطورید؟', sender: 'bot' },
    { id: 3, text: 'خوبم، ممنون از پرسش شما.', sender: 'user' },
    { id: 4, text: 'برای کجا میرید؟', sender: 'bot' },
];

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


const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: blueGrey[600],
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 2),
        // vertical padding + font size from searchIcon
        transition: theme.transitions.create('width')
    },
}));

const ChatView = () => {
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState('');

    const handleSend = () => {
        if (newMessage.trim()) {
            // Add a new message from the user
            const updatedMessages = [
                ...messages,
                { id: messages.length + 1, text: newMessage, sender: 'user' },
            ];
            setMessages(updatedMessages);
            setNewMessage('');
        }
    };

    return (
        <Box
            sx={{
                height: '100vh',
                maxWidth: 400,
                mx: 'auto',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#f9f9f9',
            }}
        >
            <Box sx={{ flex: 1, overflowY: 'auto', mb: 2, display: 'flex', flexDirection: 'column'}}>
                {messages.map((message) => (
                    <Paper
                        key={message.id}
                        variant="outlined"
                        sx={{
                            mb: 1,
                            p: 1,
                            backgroundColor: message.sender === 'user' ? '#e1f5fe' : '#ffe0b2',
                            alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                            textAlign: message.sender === 'user' ? 'left' : 'right',
                            width: 'fit-content'                        }}
                    >
                        <Typography variant="body1">{message.text}</Typography>
                    </Paper>
                ))}
            </Box>

            <Stack direction="row" spacing={1}>
                {/* <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="پیام خود را وارد کنید..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                /> */}
                <Search sx={{ minWidth: '250px' }}>
                    <StyledInputBase
                        placeholder="یه چیزی بنویس :|"
                        inputProps={{ 'aria-label': 'search' }}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                </Search>
                <Button variant="contained" onClick={handleSend}>
                    ارسال
                </Button>
            </Stack>
        </Box>
    );
};

export default ChatView;