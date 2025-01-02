import { createTheme } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';

const borderColor = blueGrey[50]
const border = `1px solid ${borderColor}`
const borderRadius = '0.5rem'
const large_borderRadius = '0.8rem'

const theme = createTheme({
    typography: {
      fontFamily: 'Vazirmatn',
      h3: {
        fontSize: '1rem',
        fontWeight: 500
      }
    },
    direction: 'rtl',
    shape: {
      borderRadius: borderRadius,
      border: border
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: 'white',
            borderBottom: border
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            border: border,
            borderRadius: large_borderRadius,
          },
        },
      },
      MuiCardMedia: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius
          }
        }
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: '.5rem'
          }
        }
      }
    }
  });
  
  export default theme;