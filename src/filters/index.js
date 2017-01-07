import common from 'utils/common'

/**
 * 格式化金钱
 * num: 原始值
 */
export function formatMoney (num) {
  return common.formatMoney(num)
}

export function formatMoneyKeepTwo (num) {
  return common.formatMoney(num, 2)
}

/**
 * 格式化日期
 * data {String} YYYYMMDD
 * return {String} YYYY年MM月DD日
 */
export function formatDateA (data) {
  return `${data.substr(0, 4)}年${data.substr(4, 2)}月${data.substr(6, 2)}日`
}

/**
 * 格式化日期
 * 去掉年份
 * return {String} MM月DD日
 */
export function formatDateB (data) {
  return `${data.substr(4, 2)}月${data.substr(6, 2)}日`
}

/**
 * 返回星期
 * return {String}
 */
export function formatDateGetWeek (date) {
  let dateFormat = common.dateFormat2(date)
  let week = new Date(dateFormat).getDay()
  let o = { 0: '星期日', 1: '星期一', 2: '星期二', 3: '星期三', 4: '星期四', 5: '星期五', 6: '星期六' }
  return o[week]
}

/**
 * 删除字符串首尾的空白符
 * return {String}
 */
export function trim (string) {
  return $.trim(string)
}

/**
 * 保留两位小数
 */
export function toFixed2 (money) {
  if (isNaN(money)) {
    money = money.toFixed(2)
  }
  return money
}

/**
 * 截止日期格式化
 */
export function deadDate (str) {
  if (str) {
    return str.replace('M', '月').replace('Y', '年').replace('D', '天')
  } else {
    return ''
  }
}
