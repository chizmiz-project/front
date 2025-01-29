import AppLayout from '../AppLayout'
import { useEffect, useState } from 'react';
import ApiService from '../../services/Api';
import { useParams } from 'react-router-dom';
import AdGrid from '../../components/advertisement/AdGrid';

export default function CategoryPage() {
  const { id } = useParams();
  const [ads, setAds] = useState([])

  useEffect(() => {
    const fetchAds = async () => {
      const response = await ApiService.get(`/advertisement/`, {
        category: id
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
    <AppLayout hasFloatButton variant='search'>
        <AdGrid ads={ads}/>
    </AppLayout>
  )
}

