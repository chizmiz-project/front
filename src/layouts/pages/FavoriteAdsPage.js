import AppLayout from '../AppLayout';
import { useEffect, useState } from 'react';
import ApiService from '../../services/Api';
import AdGrid from '../../components/advertisement/AdGrid';
import { Box, CircularProgress } from '@mui/material';
import { useDebounce } from '../../components/useDebounce';

export default function FavoriteAdsPage() {
  const [ads, setAds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    const fetchAds = async () => {
      setIsLoading(true);
      try {
        const response = await ApiService.get('/advertisement/', {
          favorite: true,
          search: debouncedSearch,
        });
        if (response.isSuccess) {
          setAds(response.data);
        } else {
          console.error('Fetch failed:', response);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAds();
  }, [debouncedSearch]);

  return (
    <AppLayout 
      variant="search" 
      hasNavigate={false} 
      onSearchChange={setSearchQuery}
    >
      <Box>
        {isLoading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : null}

        <AdGrid ads={ads} />
      </Box>
    </AppLayout>
  );
}
