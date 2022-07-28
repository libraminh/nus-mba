import React from 'react';

import Layout from '../components/Layout';

import 'antd/dist/antd.css';
import '../styles/tailwind.css';
import '../styles/main.scss';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import LoadingScreen from '../components/LoadingScreen';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/store/index';

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
});

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;

function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnmount: false,
            cacheTime: twentyFourHoursInMs,
            suspense: true,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                fallbackRender={({ error, resetErrorBoundary }) => (
                  <LoadingScreen />
                )}
                onReset={reset}
              >
                <React.Suspense fallback={<h1>Loading projects...</h1>}>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </React.Suspense>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
