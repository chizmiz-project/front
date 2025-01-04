import { Box } from '@mui/material'
import AdItem from '../../components/advertisement/AdItem'
import AppLayout from '../AppLayout'
import { useEffect, useState } from 'react';
import ApiService from '../../services/api';
import { useParams } from 'react-router-dom';

export default function CategoryPage() {
  const { id } = useParams();
  const [ads, setAds] = useState([])

  useEffect(() => {
    const fetchAds = async () => {
      const response = await ApiService.get(`/advertisement/`, {
        category: id
      });
      if (response.isSuccess) {
        console.log(response.data);
        setAds(response.data);
      } else {
        console.error('Fetch failed:', response);
      }
    };

    fetchAds();
  }, []);

  return (
    <AppLayout variant='search'>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {ads.map((ad, index) => (
          <AdItem key={index} ad={ad} />
        ))}
      </Box>
    </AppLayout>
  )
}

