const INITIAL_STATE = {
  chatId: 'null',
  user: {},
};

export const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHANGE_USER':
      return {
        user: action.payload.data,
        chatId:
          action.payload.currentUserId > action.payload.data.uid
            ? action.payload.currentUserId + action.payload.data.uid
            : action.payload.data.uid + action.payload.currentUserId,
      };
    case 'RESET_USER':
      return {
        chatId: 'null',
        user: {},
      };
    default:
      return state;
  }
};
