import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Badge,
    Chip
} from '@mui/material';

export function AdCard({ ad }) {
    return (
        <Card sx={{
            display: 'flex',
            padding: '1rem',
        }}>
            <CardMedia
                component="img"
                image={ad.imageUrl}
                alt={ad.title}
                sx={{ maxWidth: '200px', aspectRatio: '1', objectFit: 'cover' }}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="h2" noWrap>
                    {ad.title}
                </Typography>
                <Box sx={{ mt: 2, mb: 1 }}>
                    <Typography>{ad.price}</Typography>
                </Box>
                <Chip label="دست دوم"></Chip>
                <Typography>{ad.createdAt}</Typography>
            </CardContent>
        </Card>
    );
}