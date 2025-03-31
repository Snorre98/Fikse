import { StrictMode } from 'react'
import './index.css'
import { RouterProvider } from 'react-router';
import ReactDOM from 'react-dom/client';
import { router } from './Router/router.tsx';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.error(error);
    },
  }),
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on HTTP 404 responses
        if (error instanceof AxiosError && error.response?.status === 404) {
          return false;
        }
        // max 2 retries
        return failureCount < 2;
      },
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <QueryClientProvider client={queryClient}>
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
  </QueryClientProvider>
,
)
