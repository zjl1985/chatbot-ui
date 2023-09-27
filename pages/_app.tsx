import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import LoginForm from '../components/Settings/LoginForm';
import Cookies from 'js-cookie';

import { useState, useEffect } from 'react';

import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';
import {PUBLIC_PASSWORD, PUBLIC_USERNAME} from "@/utils/app/const";

const inter = Inter({ subsets: ['latin'] });
const isBrowser = typeof window !== 'undefined';


function App({ Component, pageProps }: AppProps<{}>) {
  const queryClient = new QueryClient();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (isBrowser) {
            setIsLoggedIn(Cookies.get('isLoggedIn') === 'true');
        }
    }, []);

    if (!isLoggedIn) {
        // If the user is not logged in, show the login form
        return (
            <LoginForm
                onLogin={() => setIsLoggedIn(true)}
                username={PUBLIC_USERNAME}
                password={PUBLIC_PASSWORD}
                bypassAuth={process.env.NEXT_PUBLIC_BYPASS_LOGIN === 'true'}
            />
        );
    }
  return (
    <div className={inter.className}>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  );
}

export default appWithTranslation(App);
