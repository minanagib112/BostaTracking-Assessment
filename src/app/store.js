import { configureStore } from '@reduxjs/toolkit';
import shipmentDataReducer  from './shipment_slice';

const store = configureStore({
  reducer:{shipment: shipmentDataReducer},
});

export default store