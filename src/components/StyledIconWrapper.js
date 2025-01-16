import { Box } from '@mui/material';
import { styled } from '@mui/system';

const IconWrapper = styled(Box)(({ backgroundColor = '#1976d2' }) => ({
  width: 28,
  height: 28,
  borderRadius: 6,
  backgroundColor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': {
    color: '#fff',
    fontSize: 19,
  }
}));

export function StyledIconWrapper({ children, backgroundColor, ...props }) {
  return (
    <IconWrapper backgroundColor={backgroundColor} {...props}>
      {children}
    </IconWrapper>
  );
}

