// import '@/styles/globals.css'
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from 'react-toastify';

// export default function App({ Component, pageProps }) {
//   const getLayout = Component.getLayout || ((page) => page)
//   return (
//     <>
//       {getLayout(<Component {...pageProps} />)}
//       <ToastContainer />
//     </>
//   )
// }
import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import App from 'next/app';
import Router from 'next/router';

import Loading from '@/components/Loading';
import { ToastContainer } from 'react-toastify';

class MyApp extends App {
  state = {
    loading: false
  };

  componentDidMount() {
    Router.events.on('routeChangeStart', this.startLoading);
    Router.events.on('routeChangeComplete', this.stopLoading);
    Router.events.on('routeChangeError', this.stopLoading);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.startLoading);
    Router.events.off('routeChangeComplete', this.stopLoading);
    Router.events.off('routeChangeError', this.stopLoading);
  }

  startLoading = () => {
    this.setState({ loading: true });
  };

  stopLoading = () => {
    this.setState({ loading: false });
  };

  render() {
    const { Component, pageProps } = this.props;
    const getLayout = Component.getLayout || ((page) => page)
    return (
      <>
        {getLayout(<Component {...pageProps} />)}
        <ToastContainer />
        {this.state.loading && <Loading />}
      </>
    );
  }
}

export default MyApp;





