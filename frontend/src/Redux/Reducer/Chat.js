import { createReducer } from '@reduxjs/toolkit';

  
  export const chatsReducer = createReducer({chats:[]}, (builder) => {
    builder
      .addCase('setChats', (state,action) => {
        state.chats = action.payload;
      })
      .addCase('setSelectedChats', (state,action) => {
        state.selectedChat = action.payload;
      })
     
  });
