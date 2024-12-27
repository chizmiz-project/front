import { Box, Container } from '@mui/material'
import AdItem from '../components/advertisement/AdItem'
import { AppBar } from '../components/AppBar'
import ads from '../resources/ads.json'

export default function CategoryPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <AppBar variant="category" />
      
      <Container sx={{ py: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {ads.map((ad, index) => (
            <AdItem key={index} ad={ad} />
          ))}
        </Box>
      </Container>
    </Box>
  )
}

