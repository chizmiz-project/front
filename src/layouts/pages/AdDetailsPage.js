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
import { CustomListGroup } from '../../components/list/CustomListGroup';
import { CustomListItem } from '../../components/list/CustomListItem';

export default function AdDetailsPage() {
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [ad, setAd] = useState({
      id: 0,
      title: "در حال دریافت",
      time: timeAgo(0),
      pictures: [],
      details: [],
      description: "",
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [contactButtonText, setContactButtonText] = useState("شماره تماس");
  const { id } = useParams();

  useEffect(() => {
    const fetchAd = async () => {
      const response = await ApiService.get(`/advertisement/${id}`);
      if (response.isSuccess) {
        setAd(response.data);
        setIsFavorite(response.data.favorite || false); // Initialize favorite status
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

  const fetchPhoneNumber = async () => {
    try {
      const response = await ApiService.get(`/advertisement/${id}/owner-phone/`);
      if (response.isSuccess) {
        setContactButtonText(response.data.phone_number);
      } else {
        console.error('Failed to fetch phone number:', response);
      }
    } catch (error) {
      console.error('Error fetching phone number:', error);
    }
  };

  let adDetails = {
    id: id,
    title: ad.title,
    time: timeAgo(ad.created_at),
    images: ad.pictures.map(obj => obj.picture),
    details: [{ key: 'قیمت', value: getFormattedPrice(ad.price) }],
    description: ad.description,
  };

  const handleReport = (reason) => {
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
              <IconButton sx={{opacity: .9}} onClick={toggleFavorite}>
                {isFavorite ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon color="error" />
                )}
              </IconButton>
            </Box>

            <Typography mb={3} variant="subtitle1" gutterBottom>
              {adDetails.time}
            </Typography>

            <CustomListGroup>
              {adDetails.details.map((detail) => (
                <CustomListItem type="key-value" label={detail.key} value={detail.value} />
              ))}
            </CustomListGroup>  

            <Typography mt={3} variant="h2" gutterBottom>
              توضیحات
            </Typography>

            <Typography variant="body1">{adDetails.description}</Typography>
          </Box>
        </Grid2>
      </Grid2>

      <Box display="flex" flexDirection="column" gap={2}>
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={fetchPhoneNumber}
        >
          {contactButtonText}
        </Button>

        <Button
          variant="outlined"
          size="large"
          fullWidth
          onClick={() => setIsReportDialogOpen(true)}
        >
          گزارش آگهی
        </Button>
      </Box>

      <ReportDialog
      open={isReportDialogOpen}
      onClose={() => setIsReportDialogOpen(false)}
      onSubmit={handleReport}
      adId={ad.id}
      />
    </AppLayout>
  );
}
