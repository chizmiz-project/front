import { createTheme } from '@mui/material/styles';

export const light_mode = false;
export const borderColor = light_mode ? 'red' : 'green'
export const backgroundColorTop = light_mode ? 'white' : '#1C1C1E'
export const backgroundColor = light_mode ? '#F2F2F7' : '#000000'
export const labelColor = light_mode ? '#3C3C43' : '#EBEBF5'
export const TextFieldColor = light_mode ? '#7676802b' : 'blue'
export const dividerColor = light_mode ? '#C6C6C8' : '#38383A'
export const textColor = light_mode ? 'black' : 'white'

export const primaryColor = '#007AFF'
export const labelPrimary = light_mode ? '#000000' : '#FFFFFF'
export const labelSecondary = light_mode ? '#3C3C43AD' : '#EBEBF5AD'
export const labelTertiary = light_mode ? '#3C3C4347' : '#EBEBF552'

export const fillColorPrimary = light_mode ? '#7878802e' : '#7878804f'
export const fillColorSecondary = light_mode ? '#78788021' : '#78788045'
export const fillColorTertiary = light_mode ? '#7676801c' : '#76768036'

const borderRadius = '0.5rem'

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor
    }
  },
  typography: {
    fontFamily: 'Vazirmatn',
    h1: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: labelPrimary
    },
    h2: {
      fontSize: '1rem',
      fontWeight: '600',
      color: labelPrimary
    },
    h6: {
      fontWeight: '400',
      color: labelSecondary
    },
    subtitle1: {
      color: labelSecondary,
      fontSize: '0.95rem',
      marginBottom: 5
    },
    subtitle2: {
      color: labelPrimary,
      fontWeight: '400',
      marginBottom: 5
    },
    body1: {
      color: textColor
    },
    body2: {
      color: textColor
    }
  },
  direction: 'rtl',
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          border: 'none',
          color: labelTertiary
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          border: 'none',
          borderRadius: borderRadius,
          '& fieldset': {
            borderColor: 'transparent',
          }
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          border: 'none',
          backgroundColor: fillColorTertiary,
          color: labelSecondary,
        }
      }
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: labelSecondary
        }
      }
    },

    MuiListItem: {
      styleOverrides: {
        root: {
          height: '42px',
        }
      }
    },
    MuiListItemText:{
      styleOverrides: {
        secondary: {
          color: textColor
        },
        root: {
          color: textColor
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
          borderRadius: borderRadius,
          boxShadow: 'none',
          backgroundColor: backgroundColorTop,
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          marginLeft: '1rem',
          borderColor: dividerColor
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: labelColor,
          opacity: '30%'
        }
      }
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          background: fillColorTertiary
        }
      }
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
          display: 'flex',
          flexDirection: 'column',
          padding: '.5rem'
        }
      }
    }
  }
});

export default theme;