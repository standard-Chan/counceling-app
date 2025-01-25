

export const FETCH_ERROR = 'error/FETCH_ERROR';
export const HIDE_ERROR = 'error/HIDE_ERROR';

export const errorAction = (type, errorMessage) => {
  if (!type.endsWith('_ERROR')) {
    console.log('[ERROR] : _ERROR로 끝나지 않는 action type은 처리할 수 없습니다.');
    throw new Error('action type이 잘못되었습니다.');
  }
  console.log('[ERROR]발생 : ', errorMessage);

  return {
    type,
    error: errorMessage
  };
};

export const hideErrorAction = () => ({ type: HIDE_ERROR });
