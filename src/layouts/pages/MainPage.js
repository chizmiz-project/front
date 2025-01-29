import { Box, CircularProgress, Grid2, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/Api';
import AppLayout from '../AppLayout';
import { useDebounce } from '../../components/useDebounce';
import AdGrid from '../../components/advertisement/AdGrid';
import { CategoryItem } from '../../components/category/CategoryItem';
import { Add } from '@mui/icons-material';
import { useTheme, useMediaQuery } from '@mui/material';

export default function MainPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); // Detect if it's mobile size

  const [searchQuery, setSearchQuery] = useState('');
  const [ads, setAds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await ApiService.get('/category/');
      if (response.isSuccess) setCategories(response.data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchAds = async () => {
      setIsLoading(true);
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
        setIsLoading(false);
      }
    };

    fetchAds();
  }, [debouncedSearch]);

  // Only show Fab button on the main page
  const isMainPage = location.pathname === '/';

  return (
    <AppLayout hasFloatButton variant='search' hasNavigate={false} onSearchChange={setSearchQuery}>
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
      </Box>

      {isMainPage && isSmallScreen && (
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            transform: 'scale(1.1)',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
            zIndex: 1000,
          }}
          onClick={() => navigate('/add')}
        >
          <Add />
        </Fab>
      )}
    </AppLayout>
  );
}
