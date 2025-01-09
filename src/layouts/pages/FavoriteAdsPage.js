import AppLayout from '../AppLayout'
import { useEffect, useState } from 'react';
import ApiService from '../../services/Api';
import AdGrid from '../../components/advertisement/AdGrid';
import EmptyState from '../../components/EmptyState';

export default function FavoriteAdsPage() {
  const [ads, setAds] = useState([])

  useEffect(() => {
    const fetchAds = async () => {
      const response = await ApiService.get(`/advertisement/`, {
        favorite: true
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
        {ads.length === 0 && <EmptyState />}
        <AdGrid ads={ads}/>
    </AppLayout>
  )
}

