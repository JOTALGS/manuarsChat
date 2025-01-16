// reducers.js

const initialState = {
  messages: [],
  inputMessage: '',
  currentRoom: null,
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
    default:
      return state;
  }
};

export default chatReducer;
