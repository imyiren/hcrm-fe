/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const mailExpr = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/
  const phoneExpr = /^[0-9]{11}$/
  const usernameExpr = /^[a-zA-Z]+[a-zA-Z0-9_-]{4,16}$/
  return (mailExpr.test(str) || phoneExpr.test(str) || usernameExpr.test(str))
}
