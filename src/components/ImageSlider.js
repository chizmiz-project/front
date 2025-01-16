import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { backgroundColor, backgroundColorTop } from '../context/Configs';

export function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', aspectRatio: '4/3' }}>
      <Box
        component="img"
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          bgcolor: 'grey.100',
          borderRadius: '0.5rem'
        }}
      />
      
      {images.length > 1 && (
        <>
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'background.default',
              '&:hover': { bgcolor: 'background.paper' }
            }}
          >
            <ChevronRight />
          </IconButton>
          
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'background.default',
              '&:hover': { bgcolor: 'background.paper' }
            }}
          >
            <ChevronLeft />
          </IconButton>

          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 1
            }}
          >
            {images.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: index === currentIndex ? 'primary.main' : 'grey.300'
                }}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

