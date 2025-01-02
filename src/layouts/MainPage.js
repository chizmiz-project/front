import { Box, Container, Grid } from '@mui/material'
import { AppBar } from '../components/AppBar'
import AdItem from '../components/advertisement/AdItem'
import { CategoryItem } from '../components/CategoryItem'
import { useEffect, useState } from 'react'
import ApiService from '../services/api'

const categories = [
  { title: 'املاک', value: 'real-estate' },
  { title: 'املاک', value: 'real-estate' },
  { title: 'املاک', value: 'real-estate' },
  { title: 'املاک', value: 'real-estate' },
  { title: 'املاک', value: 'real-estate' },
  { title: 'املاک', value: 'real-estate' },
]


export default function MainPage() {

  const [ads, setAds] = useState([])

  useEffect(() => {
      const fetchAds = async () => {
              const response = await ApiService.get('/advertisement/');
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
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <AppBar variant="main" />
      
      <Container sx={{ py: 2 }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {categories.map((category, index) => (
            <Grid item xs={4} key={index}>
              <CategoryItem {...category} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {ads.map((ad, index) => (
            <AdItem key={index} ad={ad} />
          ))}
        </Box>
      </Container>
    </Box>
  )
}

