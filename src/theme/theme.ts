import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      contrastText: '#FFFFFF',
    },

    text: {
      primary: '#000000',
    },

    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },

    divider: 'rgba(0, 0, 0, 0.12)',

    grey: {
      100: '#D9D9D9',
      200: 'rgba(0, 0, 0, 0.08)',
      300: 'rgba(0, 0, 0, 0.12)',
      400: 'rgba(0, 0, 0, 0.24)',
      500: 'rgba(0, 0, 0, 0.38)',
    },
  },
});
