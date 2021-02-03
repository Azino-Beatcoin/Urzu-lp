import React from 'react';
import Merchant from '../Components/Merchant/Merchant';
import Merchants from '../Components/Merchants/Merchants';
import MainPage from './../Components/MainPage/MainPage';

const Routes = {
  '/': () => <MainPage />,
  '/merchants': () => <Merchants />,
  '/merchants/:id': ({id}) => <Merchant merchantID={id} />
};
export default Routes;