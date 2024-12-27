import { Box, Container, Grid } from '@mui/material'
import { AppBar } from '../components/AppBar'
import AdItem from '../components/advertisement/AdItem'
import { CategoryItem } from '../components/CategoryItem'

const categories = [
  { title: 'املاک', value: 'real-estate' },
  { title: 'املاک', value: 'real-estate' },
  { title: 'املاک', value: 'real-estate' },
  { title: 'املاک', value: 'real-estate' },
  { title: 'املاک', value: 'real-estate' },
  { title: 'املاک', value: 'real-estate' },
]

const ads = [
  {
    title: 'پژو پارس ۹۸ عروسک',
    price: '۵۷,۰۰۰,۰۰۰',
    time: '۳',
    imageUrl: '/placeholder.svg?height=100&width=100'
  },
  {
    title: 'پژو پارس ۹۸ عروسک',
    price: '۵۷,۰۰۰,۰۰۰',
    time: '۳',
    imageUrl: '/placeholder.svg?height=100&width=100'
  },
  {
    title: 'پژو پارس ۹۸ عروسک',
    price: '۵۷,۰۰۰,۰۰۰',
    time: '۳',
    imageUrl: '/placeholder.svg?height=100&width=100'
  }
]

export default function MainPage() {
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

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {ads.map((ad, index) => (
            <AdItem key={index} {...ad} />
          ))}
        </Box>
      </Container>
    </Box>
  )
}

