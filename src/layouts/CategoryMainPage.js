import { Box, Container } from '@mui/material'
import AdItem from '../components/advertisement/AdItem'
import { AppBar } from '../components/AppBar'

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
  },
]

export default function CategoryPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <AppBar variant="category" />
      
      <Container sx={{ py: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {ads.map((ad, index) => (
            <AdItem key={index} {...ad} />
          ))}
        </Box>
      </Container>
    </Box>
  )
}

