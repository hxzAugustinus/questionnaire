/*
 * @Date: 2019-05-15 15:06:27
 * @LastEditors: hxz
 * @LastEditTime: 2019-05-15 15:34:43
 * dsc:过滤器
 */

let rightAnswers = val => {
  if (Array.isArray(val)) {
    return val.filter(item => {
      return item.is_right == 1
    })
  } else {
    return val
  }
}

export { rightAnswers }
