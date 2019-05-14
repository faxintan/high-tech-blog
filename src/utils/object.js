/**
 * 根据源对象构造新对象，且仅包含指定的对象属性
 * @param object 源对象
 * @returns {object}
 */
export function pick(obj, props = []) {
  let newObj = Object(null);
  for (let key in obj) {
    if (props.includes(key)) newObj[key] = obj[key];
  }
  return newObj;
}

/**
 * 根据源对象构造新对象，且不包含指定的对象属性
 * @param object 源对象
 * @returns {object}
 */
export function omit(obj, props = []) {
  let newObj = Object(null);
  for (let key in obj) {
    if (!props.includes(key)) newObj[key] = obj[key];
  }
  return newObj;
}
