import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#7124CB',
          light: '#9B59D1',
          dark: '#5A1C9F',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#A230C7',
          light: '#B85DD3',
          dark: '#7A2396',
          contrastText: '#ffffff',
        },
        background: {
          default: '#fafafa',
          paper: '#ffffff',
        },
        text: {
          primary: '#1a1a1a',
          secondary: '#666666',
        },
        divider: '#e0e0e0',
        action: {
          hover: '#f5f5f5',
          selected: '#e3f2fd',
        },
        info: {
          main: '#00bcd4',
          light: '#26c6da',
          dark: '#0097a7',
          contrastText: '#000000',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#9B59D1',
          light: '#B885DB',
          dark: '#7124CB',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#B85DD3',
          light: '#C785DD',
          dark: '#A230C7',
          contrastText: '#ffffff',
        },
        background: {
          default: '#121212',
          paper: '#1e1e1e',
        },
        text: {
          primary: '#ffffff',
          secondary: '#b3b3b3',
        },
        divider: '#333333',
        action: {
          hover: '#2a2a2a',
          selected: '#3a3a3a',
        },
        info: {
          main: '#26c6da',
          light: '#4dd0e1',
          dark: '#00acc1',
          contrastText: '#000000',
        },
        warning: {
          main: '#ff9800',
          light: '#ffb74d',
          dark: '#f57c00',
          contrastText: '#000000',
        },
        error: {
          main: '#f44336',
          light: '#ef5350',
          dark: '#d32f2f',
          contrastText: '#ffffff',
        },
        success: {
          main: '#4caf50',
          light: '#66bb6a',
          dark: '#388e3c',
          contrastText: '#ffffff',
        },
      },
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: 'background-color 0.3s ease, color 0.3s ease',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0px 2px 4px rgba(0, 0, 0, 0.5)'
              : '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.palette.info.main,
          color: theme.palette.info.contrastText,
          transition: 'background-color 0.3s ease',
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
          borderColor: theme.palette.divider,
        }),
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: () => ({
          '& .MuiSwitch-thumb': {
            transition: 'background-color 0.3s ease',
          },
          '& .MuiSwitch-track': {
            transition: 'background-color 0.3s ease',
          },
        }),
      },
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
});
