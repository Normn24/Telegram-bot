const initialState = {
  count: 0,
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_COUNT':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DECREMENT_COUNT':
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default cardReducer;
