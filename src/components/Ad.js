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
            maxHeight: '110px',
            display: 'flex',
            padding: '0.5rem',
            width: '100%',
            justifyContent: 'space-between'
        }}>
            <CardContent>
                <Typography variant="h3" component="h3" noWrap>
                    {ad.title}
                </Typography>
                <Typography mt={2}>{ad.price}</Typography>
                <Typography variant='caption' >{ad.createdAt}</Typography>
            </CardContent>
            <CardMedia
                component="img"
                image={ad.image}
                alt={ad.title}
                sx={{ maxWidth: '130px', aspectRatio: '1', objectFit: 'cover' }}
            />
        </Card>
    );
}