import { FETCH_ERROR, HIDE_ERROR } from "../actions/errorAction";

const initialState = {
  isError: false,
  errorMessage: '',
}

const errorReducer = (state = initialState, action) => {

  switch (action.type) {
    case FETCH_ERROR:
      const error = action.error;
      console.log('true로 바뀜!!')
      return {...state, isError:true, errorMessage:error};
    case HIDE_ERROR:
      return {...state, isError:false};
    default:
      return state;
  }
}

export default errorReducer;
