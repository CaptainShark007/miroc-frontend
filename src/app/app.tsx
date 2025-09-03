import Router from '@app/Router';
import { store } from '@app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ErrorBoundary } from '@components/ErrorBoundary';
import ErrorFallback from '@components/ErrorFallback';
import LazyFallback from '@components/LazyFallback';
import { theme } from '@/shared/constants/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme} defaultMode='light'>
      <CssBaseline enableColorScheme />
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<LazyFallback />}>
          <Provider store={store}>
            <QueryClientProvider client={new QueryClient()}>
              <BrowserRouter>
                <Router />
              </BrowserRouter>
            </QueryClientProvider>
          </Provider>
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
