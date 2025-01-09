import { Box, CircularProgress, Grid2 } from '@mui/material'
import { useEffect, useState } from 'react'
import ApiService from '../../services/Api'
import AppLayout from '../AppLayout'
import { useDebounce } from '../../components/useDebounce'
import EmptyState from '../../components/EmptyState'
import AdGrid from '../../components/advertisement/AdGrid'
import { CategoryItem } from '../../components/category/CategoryItem'

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
      <Box>
        <Grid2 container spacing={2} mb={2}>
          {categories.map(category => (
            <Grid2 item size={{ xs: 4, md: 3, lg: 2 }} key={category.id}>
              <CategoryItem category={category} />
            </Grid2>
          ))}
        </Grid2>

        {isLoading ? (
          <Box display='flex' justifyContent={'center'} py={4}>
            <CircularProgress />
          </Box>
        ) : null}

        <AdGrid ads={ads}/>

        {ads.length === 0 && searchQuery && <EmptyState />}

      </Box>
    </AppLayout>
  )
}

