import { createContext, useContext, useState, useMemo } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { backgroundColor_dark, backgroundColor_light, backgroundColorTop_dark, backgroundColorTop_light, borderRadius, dividerColor_dark, dividerColor_light, dividerColorTransparent_dark, dividerColorTransparent_light, fillColorTertiary_dark, fillColorTertiary_light, labelColor_dark, labelColor_light, labelSecondary_dark, labelSecondary_light, labelTertiary_dark, labelTertiary_light, primaryColor, textColor_dark, textColor_light } from './Configs';

const ThemeContext = createContext({
  toggleTheme: () => { },
  mode: 'light',
});

export const useTheme = () => useContext(ThemeContext);

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#007AFF',
    },
    background: {
      default: mode === 'light' ? backgroundColor_light : backgroundColor_dark,
      paper: mode === 'light' ? backgroundColorTop_light : backgroundColorTop_dark,
    },
    text: {
      primary: mode === 'light' ? textColor_light : textColor_dark,
      secondary: mode === 'light' ? labelSecondary_light : labelSecondary_dark,
      tertiary: mode === 'light' ? labelTertiary_light : labelTertiary_dark,
    },
    divider: mode === 'light' ? dividerColorTransparent_light : dividerColorTransparent_dark,
    active: primaryColor,
    inActive: mode === 'light' ? labelSecondary_light : labelSecondary_dark,
  },
  typography: {
    fontFamily: 'Vazirmatn',
    color: mode === 'light' ? textColor_light : textColor_dark,
    h1: {
      fontSize: '1.1rem',
      fontWeight: '600',
      lineHeight: '1.7rem',
      color: mode === 'light' ? textColor_light : textColor_dark,
    },
    h2: {
      fontSize: '1rem',
      fontWeight: '600',
    },
    h6: {
      fontWeight: '400',
    },
    subtitle1: {
      fontSize: '0.95rem',
      marginBottom: 5,
    },
    subtitle2: {
      fontWeight: '400',
      marginBottom: 5,
    },
  },
  direction: 'rtl',
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          textWrap: 'nowrap',
        },
      },
    },
    
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          border: 'none',
          borderRadius: borderRadius,
          '& fieldset': {
            borderColor: 'transparent',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          border: 'none',
          backgroundColor: mode === 'light' ? fillColorTertiary_light : fillColorTertiary_dark,
          color: mode === 'light' ? labelSecondary_light : labelSecondary_dark
        }
      }
    },
    
    MuiInputLabel: {
      styleOverrides: {
        root: {
          border: 'none',
          color: mode === 'light' ? labelTertiary_light : labelTertiary_dark,
        }
      }
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: mode === 'light' ? labelSecondary_light : labelSecondary_dark
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          height: '46px',
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        secondary: {
          color: mode === 'light' ? textColor_light : textColor_dark
        },
        root: {
          color: mode === 'light' ? textColor_light : textColor_dark
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: primaryColor
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
          borderRadius: borderRadius,
          boxShadow: 'none',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          marginLeft: '1rem',
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: mode === 'light' ? labelColor_light : labelColor_dark,
          opacity: '30%'
        }
      }
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          background: mode === 'light' ? fillColorTertiary_light : fillColorTertiary_dark,
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          padding: '.5rem',
        },
      },
    },
  },
});

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light');

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}

