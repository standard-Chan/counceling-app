/**
 * 문자열을 분할 기준 문자(sep)를 사용하여 배열로 파싱하는 함수
 * @param {string} str - 분할할 문자열
 * @param {string} sep - 분할 기준 문자
 * @returns {Array} - 분할된 문자열 배열
 */

// parsingSepEnd === '#E#'
// parsingSep === '#/#'

export const parseString = (str, sep) => {
  if (typeof str !== 'string' || typeof sep !== 'string') {
    throw new Error('Both arguments must be strings');
  }
  return str.split(sep);
};
