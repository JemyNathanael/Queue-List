import React from 'react';
import type { NextPage } from 'next';
import type { AppProps, AppContext } from 'next/app';
import type { Session } from 'next-auth';
import App from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import { SessionProvider } from 'next-auth/react';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import '../css/index.css';

type NextPageWithLayout = NextPage & {
    layout?: (page: React.ReactElement) => React.ReactNode;
}

type AppPropsWithLayout = AppProps<{
    session?: Session;
}> & {
    Component: NextPageWithLayout;
}

function CustomApp({
    Component,
    pageProps: { session, ...pageProps }
}: AppPropsWithLayout): JSX.Element {
    const withLayout = Component.layout ?? (page => page);
    return (
        <SessionProvider session={session} refetchInterval={60} refetchOnWindowFocus={false}>
            {withLayout(<Component {...pageProps} />)}
        </SessionProvider>
    );
}

// This disables the ability to perform Automatic Static Optimization... (Sadge)
// Causing every page in the app to be server-side rendered,
// but allowing the use of runtime configuration in Docker-based Environment!
CustomApp.getInitialProps = async (appContext: AppContext) => {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);
    return { ...appProps };
}

NProgress.configure({
    showSpinner: false
});

Router.events.on('routeChangeStart', NProgress.start);
Router.events.on('routeChangeComplete', NProgress.done);
Router.events.on('routeChangeError', NProgress.done);

export default CustomApp;
