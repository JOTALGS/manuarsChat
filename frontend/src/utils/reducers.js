// reducers.js

const initialState = {
  messages: [],
  inputMessage: '',
  currentRoom: null,
  chatName: '',
  token: null, 
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case 'SET_INPUT_MESSAGE':
      return { ...state, inputMessage: action.payload };
    case 'SET_CURRENT_ROOM':
      return { ...state, currentRoom: action.payload };
    case 'SET_CHAT_NAME':
      return { ...state, chatName: action.payload };
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'CLEAR_TOKEN':
      return { ...state, token: null };
    default:
      return state;
  }
};

export default chatReducer;
