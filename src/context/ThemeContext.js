import { createContext, useContext, useState, useMemo } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import * as Configs from './Configs';

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
      default: mode === 'light' ? Configs.backgroundColor_light : Configs.backgroundColor_dark,
      paper: mode === 'light' ? Configs.backgroundColorTop_light : Configs.backgroundColorTop_dark,
    },
    text: {
      primary: mode === 'light' ? Configs.textColor_light : Configs.textColor_dark,
      secondary: mode === 'light' ? Configs.labelSecondary_light : Configs.labelSecondary_dark,
      tertiary: mode === 'light' ? Configs.labelTertiary_light : Configs.labelTertiary_dark,
    },
    divider: mode === 'light' ? Configs.dividerColorTransparent_light : Configs.dividerColorTransparent_dark,
    active: Configs.primaryColor,
    inActive: mode === 'light' ? Configs.labelSecondary_light : Configs.labelSecondary_dark,
  },
  typography: {
    fontFamily: 'Vazirmatn',
    color: mode === 'light' ? Configs.textColor_light : Configs.textColor_dark,
    h1: {
      fontSize: '1.1rem',
      fontWeight: '600',
      lineHeight: '1.7rem',
      color: mode === 'light' ? Configs.textColor_light : Configs.textColor_dark,
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
          borderRadius: Configs.borderRadius,
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
          backgroundColor: mode === 'light' ? Configs.fillColorTertiary_light : Configs.fillColorTertiary_dark,
          color: mode === 'light' ? Configs.labelSecondary_light : Configs.labelSecondary_dark
        }
      }
    },
    
    MuiInputLabel: {
      styleOverrides: {
        root: {
          border: 'none',
          color: mode === 'light' ? Configs.labelTertiary_light : Configs.labelTertiary_dark,
        }
      }
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: mode === 'light' ? Configs.labelSecondary_light : Configs.labelSecondary_dark
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
          color: mode === 'light' ? Configs.textColor_light : Configs.textColor_dark
        },
        root: {
          color: mode === 'light' ? Configs.textColor_light : Configs.textColor_dark
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: Configs.primaryColor
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
          borderRadius: Configs.borderRadius,
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
          color: mode === 'light' ? Configs.labelColor_light : Configs.labelColor_dark,
          opacity: '30%'
        }
      }
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          background: mode === 'light' ? Configs.fillColorTertiary_light : Configs.fillColorTertiary_dark,
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          borderRadius: Configs.borderRadius,
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

