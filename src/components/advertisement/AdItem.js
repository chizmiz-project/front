import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import timeAgo from '../../services/calender';
import {getFormattedPrice} from '../../services/Utils';

export default function AdItem({ ad }) {
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
                <Typography variant="h1" maxWidth={'180px'} noWrap>
                    {ad.title}
                </Typography>
                <Typography variant='subtitle2' mt={2}>{getFormattedPrice(ad.price)} تومان</Typography>
                <Typography marginTop={'auto'} variant='subtitle1' >{timeAgo(ad.created_at)}</Typography>
            </CardContent>

            <CardMedia
                component="img"
                image='https://static.vecteezy.com/system/resources/thumbnails/052/934/746/small/pixel-art-yellow-car-game-asset-design-vector.jpg'
                alt={ad.title}
                sx={{ width: '130px', aspectRatio: 1, objectFit: 'cover' }}
            />
        </Card>)
}

