const initialState = {
  usersdetails: [],
  isLoading: true,
  sudahLogin: false,
  singleData: {},
};

const myAccountReducer = (state = initialState, action) => {
  console.log('myAkun', action.type);
  console.log(action);
  switch (action.type) {
    case 'GET_MY_ACCOUNT': {
      return {
        ...state,
        isLoading: false,
        usersdetails: action.payload,
      };
    }
    case 'IS_LOGOUT': {
      return {
        ...state,
        isLoading: false,
        sudahLogin: false,
        usersdetails: [],
      };
    }
    case 'UPDATE_PICTURE': {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default myAccountReducer;
