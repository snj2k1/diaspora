const INITIAL_STATE = {
  nationality: 'all',
  country: 'all',
  gender: null,
  minAge: null,
  maxAge: null,
};

export const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHANGE_SEARCH':
      return {
        nationality: action.payload.nationality,
        country: action.payload.country,
        gender: action.payload.gender ? action.payload.gender : null,
        minAge: action.payload.minAge ? action.payload.minAge : null,
        maxAge: action.payload.maxAge ? action.payload.maxAge : null,
      };

    default:
      return state;
  }
};
