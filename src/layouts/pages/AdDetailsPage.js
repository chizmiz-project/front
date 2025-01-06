import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import { ImageSlider } from '../../components/ImageSlider';
import ReportDialog from '../../components/ReportDialog';
import ApiService from '../../services/api';
import timeAgo from '../../services/calender';
import AppLayout from '../AppLayout';
import { getFormattedPrice } from '../../services/Utils';
import { CustomListGroup } from '../../components/setting/CutomListGroup';
import { CutomListItem } from '../../components/setting/CutomListItem';


export default function AdDetailsPage() {
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const { id } = useParams();

  let adDetails;

  const [ad, setAd] = useState({})

  useEffect(() => {
    const fetchAd = async () => {
      const response = await ApiService.get(`/advertisement/${id}`);
      if (response.isSuccess) {
        console.log(response.data);
        setAd(response.data);
      } else {
        console.error('Fetch failed:', response);
      }
    };

    fetchAd();
  }, []);

  adDetails = {
    id: id,
    title: ad.id,
    time: timeAgo(ad.created_at),
    images: [
      'https://static.vecteezy.com/system/resources/previews/053/092/596/non_2x/pixel-art-camper-van-game-asset-design-vector.jpg',
      'https://static.vecteezy.com/system/resources/previews/053/092/587/non_2x/pixel-art-delivery-truck-game-asset-design-vector.jpg',
      ad.main_picture
    ],
    details: [
      { key: 'قیمت', value: getFormattedPrice(ad.price) },
    ],
    description: ad.description
  };

  const handleReport = (reason) => {
    console.log('Report submitted:', reason);
    setIsReportDialogOpen(false);
  };

  return (
    <AppLayout title={adDetails.title}>
      <Box>
        <ImageSlider images={adDetails.images} />

        <Box p={2}>
          <Typography variant="h1" gutterBottom>
            {adDetails.title}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            {adDetails.time}
          </Typography>

          <CustomListGroup>
            {adDetails.details.map((detail) => 
              <CutomListItem
                type='key-value'
                label={detail.key}
                value={detail.value}
              />
            )}
          </CustomListGroup>

          <Typography variant="h2" gutterBottom>
            توضیحات
          </Typography>

          <Typography variant="body1" paragraph>
            {adDetails.description}
          </Typography>

        </Box>
      </Box>
      <Button
        variant="outlined"
        size='large'
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

