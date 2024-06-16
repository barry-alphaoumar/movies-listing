'use client'
import React from 'react';
import { Provider } from 'react-redux';

import store from '../app/redux/store';
import App from './components/App';



export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Provider store={store}>
        <App />
      </Provider>
    </main>
  );
}
