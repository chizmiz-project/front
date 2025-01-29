import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Grid2, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import { ImageSlider } from '../../components/ImageSlider';
import ReportDialog from '../../components/ReportDialog';
import ApiService from '../../services/Api';
import timeAgo from '../../services/Calender';
import AppLayout from '../AppLayout';
import { getFormattedPrice } from '../../services/Utils';
import { CustomListGroup } from '../../components/list/CustomListGroup';
import { CustomListItem } from '../../components/list/CustomListItem';
import { useSnackbar } from '../../context/SnackbarProvider';

export default function AdDetailsPage() {
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [ad, setAd] = useState({
    id: 0,
    title: "در حال دریافت",
    time: timeAgo(0),
    pictures: [],
    details: [],
    description: "",
    author: null,
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [contactButtonText, setContactButtonText] = useState("شماره تماس");
  const [userId, setUserId] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchAd = async () => {
      const response = await ApiService.get(`/advertisement/${id}`);
      if (response.isSuccess) {
        setAd(response.data);
        setIsFavorite(response.data.favorite || false);
      } else {
        console.error('Fetch failed:', response);
      }
    };

    const fetchUser = async () => {
      const response = await ApiService.get('/account/me');
      if (response.isSuccess) {
        setUserId(response.data.id);
      }
    };

    fetchAd();
    fetchUser();
  }, [id]);

  const toggleFavorite = async () => {
    try {
      let response;
      if (isFavorite) {
        response = await ApiService.put(`/advertisement/${id}/delete_favorite/`);
      } else {
        response = await ApiService.put(`/advertisement/${id}/add_favorite/`);
      }

      if (response.status === 403) {
        openSnackbar("لطفا ابتدا وارد حساب کاربری خود شوید!", "error");
      } else if (response.isSuccess) {
        setIsFavorite(!isFavorite);
      } else {
        console.error('Failed to toggle favorite status:', response);
        openSnackbar("خطا در تغییر وضعیت علاقه‌مندی", "error");
      }
    } catch (error) {
      console.error('Failed to toggle favorite status:', error);
      openSnackbar("مشکلی در تغییر وضعیت علاقه‌مندی پیش آمد", "error");
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

  const STATUS_CHOICES = {
    1: "فعال",
    2: "رزرو شده",
    3: "فروخته شد",
  };

  let adDetails = {
    id: id,
    title: ad.title,
    time: timeAgo(ad.created_at),
    images: ad.pictures.map(obj => obj.picture),
    details: [
      { key: 'قیمت', value: getFormattedPrice(ad.price) },
      { key: 'وضعیت', value: STATUS_CHOICES[ad.status] || "نامشخص" },
    ],
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
              <Box display="flex" alignItems="center">
                {userId === ad.author && (
                  <IconButton onClick={() => navigate(`/ad/details/${id}/edit`)}>
                    <EditIcon color="primary" />
                  </IconButton>
                )}
                <IconButton sx={{ opacity: .9 }} onClick={toggleFavorite}>
                  {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon color="error" />}
                </IconButton>
              </Box>
            </Box>

            <Typography mb={3} variant="subtitle1" gutterBottom>
              {adDetails.time}
            </Typography>

            <CustomListGroup>
              {adDetails.details.map((detail, index) => (
                <CustomListItem key={index} type="key-value" label={detail.key} value={detail.value} />
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
        <Button variant="contained" size="large" fullWidth onClick={fetchPhoneNumber}>
          {contactButtonText}
        </Button>

        <Button variant="outlined" size="large" fullWidth onClick={() => setIsReportDialogOpen(true)}>
          گزارش آگهی
        </Button>
      </Box>

      <ReportDialog open={isReportDialogOpen} onClose={() => setIsReportDialogOpen(false)} onSubmit={handleReport} adId={ad.id} />
    </AppLayout>
  );
}
