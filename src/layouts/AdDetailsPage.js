import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import { AppBar } from '../components/AppBar';
import { ImageSlider } from '../components/ImageSlider';
import ReportDialog from '../components/ReportDialog';

// Mock data - in a real app, this would come from an API
const mockAd = {
  id: '1',
  title: 'پژوپارس عروسک',
  time: '۳ ساعت پیش در صادقیه',
  images: [
    'https://preview.free3d.com/img/2018/11/2269257440501433508/ms6k8q3i.jpg',
    'https://preview.free3d.com/img/2020/06/2337162504616019433/tyildfpv.jpg',
    'https://as2.ftcdn.net/v2/jpg/01/83/04/39/1000_F_183043926_r1JkOE0kNtYNm9dOpLpu6wp2v31Qwuwd.jpg'
  ],
  details: [
    { key: 'مدل', value: '۱۳۹۸' },
    { key: 'کارکرد', value: '۵۰,۰۰۰ کیلومتر' },
    { key: 'قیمت', value: '۵۷۰,۰۰۰,۰۰۰ تومان' }
  ],
  description: `آپارتمان ۳۰۰ متری جنوبی
بازسازی شده بسیار شیک و فوق العاده
خواب مستر دو تا بالکن فایلهای مشابه و مناسب بودجه شما موجود است.`
};

export default function AdDetailsPage() {
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const { id } = useParams();

  const handleReport = (reason) => {
    console.log('Report submitted:', reason);
    setIsReportDialogOpen(false);
  };

  return (
    <Box style={{ minHeight: '100vh', backgroundColor: 'grey.50' }}>
      <AppBar variant="category" title="آگهی" />
      
      <Container maxWidth="sm" style={{ paddingBottom: '16px' }}>
        <ImageSlider images={mockAd.images} />
        
        <Box style={{ padding: '16px' }}>
          <Typography variant="h6" gutterBottom>
            {mockAd.title}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {mockAd.time}
          </Typography>

          <List style={{ marginBottom: '16px' }}>
            {mockAd.details.map((detail, index) => (
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
            {mockAd.description}
          </Typography>

          <Button
            variant="outlined"
            fullWidth
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
    </Box>
  );
}

