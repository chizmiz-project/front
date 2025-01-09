import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Grid2, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ImageSlider } from '../../components/ImageSlider';
import ReportDialog from '../../components/ReportDialog';
import ApiService from '../../services/Api';
import timeAgo from '../../services/Calender';
import AppLayout from '../AppLayout';
import { getFormattedPrice } from '../../services/Utils';
import { CustomListGroup } from '../../components/list/CutomListGroup';
import { CutomListItem } from '../../components/list/CutomListItem';

export default function AdDetailsPage() {
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [ad, setAd] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchAd = async () => {
      const response = await ApiService.get(`/advertisement/${id}`);
      if (response.isSuccess) {
        console.log(response.data);
        setAd(response.data);
        setIsFavorite(response.data.isFavorite || false); // Initialize favorite status
      } else {
        console.error('Fetch failed:', response);
      }
    };

    fetchAd();
  }, [id]);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await ApiService.put(`/advertisement/${id}/delete_favorite/`);
      } else {
        await ApiService.put(`/advertisement/${id}/add_favorite/`);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Failed to toggle favorite status:', error);
    }
  };

  let adDetails = {
    id: id,
    title: ad.title,
    time: timeAgo(ad.created_at),
    images: [
      'https://static.vecteezy.com/system/resources/previews/053/092/596/non_2x/pixel-art-camper-van-game-asset-design-vector.jpg',
      'https://static.vecteezy.com/system/resources/previews/053/092/587/non_2x/pixel-art-delivery-truck-game-asset-design-vector.jpg',
      ad.main_picture,
    ],
    details: [{ key: 'قیمت', value: getFormattedPrice(ad.price) }],
    description: ad.description,
  };

  const handleReport = (reason) => {
    console.log('Report submitted:', reason);
    setIsReportDialogOpen(false);
  };

  return (
    <AppLayout title={adDetails.title}>
      <Grid2 direction={'row-reverse'} container spacing={1}>
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <ImageSlider images={adDetails.images} />
        </Grid2>
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <Box p={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h1" gutterBottom>
                {adDetails.title}
              </Typography>
              <IconButton onClick={toggleFavorite}>
                {isFavorite ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon color="error" />
                )}
              </IconButton>
            </Box>

            <Typography variant="subtitle1" gutterBottom>
              {adDetails.time}
            </Typography>

            <CustomListGroup>
              {adDetails.details.map((detail) => (
                <CutomListItem type="key-value" label={detail.key} value={detail.value} />
              ))}
            </CustomListGroup>

            <Typography variant="h2" gutterBottom>
              توضیحات
            </Typography>

            <Typography variant="body1">{adDetails.description}</Typography>
          </Box>
        </Grid2>
      </Grid2>

      <Button
        variant="outlined"
        size="large"
        fullWidth
        onClick={() => setIsReportDialogOpen(true)}
      >
        گزارش آگهی
      </Button>

      <ReportDialog
        open={isReportDialogOpen}
        onClose={() => setIsReportDialogOpen(false)}
        onSubmit={handleReport}
      />
    </AppLayout>
  );
}
