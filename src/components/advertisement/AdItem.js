import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function AdItem({ ad }) {

    return (
        <Card elevation={0} sx={{
            maxHeight: '130px',
            display: 'flex',
            padding: '0.5rem',
            justifyContent: 'space-between'
        }}
            component={Link} to="/ad/details"
        >
            <CardContent>
                <Typography variant="h3" component="h3" noWrap>
                    {ad.title}
                </Typography>
                <Typography mt={2}>{ad.price} تومان</Typography>
                <Typography variant='caption' >{ad.createdAt}</Typography>
            </CardContent>

            <CardMedia
                component="img"
                image={ad.image}
                alt={ad.title}
                sx={{ width: '130px', aspectRatio: 1, objectFit: 'cover' }}
            />
        </Card>)
}

