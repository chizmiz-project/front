import { Box, Container } from '@mui/material'
import AdItem from '../components/advertisement/AdItem'
import { AppBar } from '../components/AppBar'
import ads from '../resources/ads.json'
import AppLayout from './AppLayout'

export default function CategoryPage() {
  return (
    <AppLayout variant='category'>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {ads.map((ad, index) => (
          <AdItem key={index} ad={ad} />
        ))}
      </Box>
    </AppLayout>
  )
}

