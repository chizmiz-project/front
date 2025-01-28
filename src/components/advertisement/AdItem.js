import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import timeAgo from '../../services/Calender';
import {getFormattedPrice} from '../../services/Utils';

export default function AdItem({ ad }) {
    console.log(ad)
    return (
        <Card elevation={0} sx={{
            textDecoration: 'none',
            maxHeight: '130px',
            display: 'flex',
            padding: '0.5rem',
            justifyContent: 'space-between'
        }}
            component={Link} to={`/ad/details/${ad.id}`}>
            <CardContent>
                <Typography variant="h1">
                    {ad.title}
                </Typography>
                <Typography variant='subtitle2' mt={2}>{getFormattedPrice(ad.price)} تومان</Typography>
                <Typography marginTop={'auto'} variant='subtitle1' >{timeAgo(ad.created_at)}</Typography>
            </CardContent>

            <CardMedia
                component="img"
                image={ad.main_picture}
                alt={ad.title}
                sx={{ width: '130px', aspectRatio: 1, objectFit: 'cover' }}
            />
        </Card>)
}

