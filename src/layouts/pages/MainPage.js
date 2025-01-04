import { Box, CircularProgress, debounce, Grid } from '@mui/material'
import AdItem from '../../components/advertisement/AdItem'
import { CategoryItem } from '../../components/CategoryItem'
import { useEffect, useState } from 'react'
import ApiService from '../../services/api'
import AppLayout from '../AppLayout'
import { useDebounce } from '../../components/useDebounce'
import EmptyState from '../../components/EmptyState'

export default function MainPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [ads, setAds] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const debouncedSearch = useDebounce(searchQuery, 300)

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await ApiService.get('/category/')
      console.log(response)
      if (response.isSuccess)
        setCategories(response.data)
    }

    fetchCategories();
  }, [])

  useEffect(() => {
    const fetchAds = async () => {
      setIsLoading(true)
      try {
        const response = await ApiService.get('/advertisement/', {
          search: searchQuery
        });
        if (response.isSuccess) {
          setAds(response.data);
        } else {
          console.error('Fetch failed:', response);
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchAds()
  }, [debouncedSearch])

  return (
    <AppLayout variant='search' hasNavigate={false} onSearchChange={setSearchQuery}>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {categories.map(category => (
          <Grid item xs={4} key={category.id}>
            <CategoryItem category={category} />
          </Grid>
        ))}
      </Grid>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : ads.length > 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {ads.map((ad, index) => (
            <AdItem key={index} ad={ad} />
          ))}
        </Box>
      ) : searchQuery ? (
        <EmptyState />
      ) : null}
    </AppLayout>

  )
}

