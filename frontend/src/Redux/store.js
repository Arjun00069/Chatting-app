import { configureStore } from '@reduxjs/toolkit';
import { chatsReducer } from './Reducer/Chat.js';


const store = configureStore({
   reducer: {
     Chat: chatsReducer,
   },
 });
 
export const server = 'http://localhost:4000';
export default store;