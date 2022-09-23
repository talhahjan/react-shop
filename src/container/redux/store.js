import { configureStore } from '@reduxjs/toolkit'
import CartReducer from './reducers/cartReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer ,FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER} from 'redux-persist'; 
import { combineReducers } from 'redux';
import FilterReducer from './reducers/filterReducer';
const persistConfig={
  key:'root',
  version:1,
  storage,
}



const reducer=combineReducers({
  cart:CartReducer,
  filter:FilterReducer
});

const persistedReducer=persistReducer(persistConfig,reducer);



export const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

