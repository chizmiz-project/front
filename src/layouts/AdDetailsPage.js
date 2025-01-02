import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import { AppBar } from '../components/AppBar';
import { ImageSlider } from '../components/ImageSlider';
import ReportDialog from '../components/ReportDialog';
import ApiService from '../services/api';
import timeAgo from '../services/calender';
import AppLayout from './AppLayout';

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
      ad.main_picture
    ],
    details: [
      { key: 'قیمت', value: ad.price },
    ],
    description: ad.description
  };

  const handleReport = (reason) => {
    console.log('Report submitted:', reason);
    setIsReportDialogOpen(false);
  };

  return (
    <AppLayout>
      <Container style={{ paddingTop: '1rem', paddingBottom: '16px' }}>
        <ImageSlider images={adDetails.images} />

        <Box style={{ padding: '16px' }}>
          <Typography variant="h6" gutterBottom>
            {adDetails.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            {adDetails.time}
          </Typography>

          <List style={{ marginBottom: '16px' }}>
            {adDetails.details.map((detail, index) => (
              <Box key={index}>
                {index > 0 && <Divider />}
                <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                  <ListItemText
                    primary={detail.key}
                    secondary={detail.value}
                  />
                </ListItem>
              </Box>
            ))}
          </List>

          <Typography variant="h6" gutterBottom>
            توضیحات
          </Typography>

          <Typography variant="body1" paragraph>
            {adDetails.description}
          </Typography>

          <Button
            variant="outlined"
            fullWidth
            size='large'
            onClick={() => setIsReportDialogOpen(true)}
          >
            گزارش آگهی
          </Button>
        </Box>
      </Container>

      <ReportDialog
        open={isReportDialogOpen}
        onClose={() => setIsReportDialogOpen(false)}
        onSubmit={handleReport}
      />
    </AppLayout>

  );
}

