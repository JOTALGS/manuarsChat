// actions.js
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SET_INPUT_MESSAGE = 'SET_INPUT_MESSAGE';

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: message,
});

export const setInputMessage = (message) => ({
  type: SET_INPUT_MESSAGE,
  payload: message,
});

export const createChat = (chatData) => async (dispatch) => {
  const response = await fetch('/api/create-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(chatData),
  });
  const newChat = await response.json();
  dispatch({ type: 'ADD_CHAT', payload: newChat });
};
