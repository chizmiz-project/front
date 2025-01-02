import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import timeAgo from '../../services/calender';

export default function AdItem({ ad }) {
    console.log(ad)
    return (
        <Card elevation={0} sx={{
            maxHeight: '130px',
            display: 'flex',
            padding: '0.5rem',
            justifyContent: 'space-between'
        }}
            component={Link} to={`/ad/details/${ad.id}`}>
            <CardContent>
                <Typography variant="h3" component="h3" noWrap>
                    {ad.title}
                </Typography>
                <Typography mt={2}>{ad.price} تومان</Typography>
                <Typography variant='caption' >{timeAgo(ad.created_at)}</Typography>
            </CardContent>

            <CardMedia
                component="img"
                image={ad.main_picture}
                alt={ad.title}
                sx={{ width: '130px', aspectRatio: 1, objectFit: 'cover' }}
            />
        </Card>)
}

