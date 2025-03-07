export const SET_LOGIN = 'user/SET_LOGIN';
export const SET_LOGOUT = 'user/SET_LOGOUT';

// 로그인 여부 저장
const setCalendarAction = (isLogin) => ({ type: SET_LOGIN, payload: isLogin });

const requestCalendarAction = (isLogin) => {
  return (dispatch) => {
    dispatch(setCalendarAction(isLogin));
  };
};

export default requestCalendarAction;