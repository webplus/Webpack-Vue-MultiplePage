export default {
  /**
   * 获取URL参数值
   * @param  {[type]} paramName [要获取的参数名]
   * @return {[type]}           [参数值]
   */
  getParamVal: function (paramName) {
    var typeMatch = location.search.match(new RegExp('\\b' + paramName + '=([^&=]+)'))
    return typeMatch ? typeMatch[1] : ''
  },
  /**
   * 从localStorage里面取数据tg
   * returnData 返回Object数据格式
   */
  getStorage (keyName) {
    let returnData = ''
    if (keyName) {
      let storageStr = localStorage.getItem(keyName)
      returnData = JSON.parse(storageStr)
    }
    return returnData
  },
  /**
   * 储存数据到 localStorage
   * keyName 储存key
   * param 储存数据, Object格式
   */
  setStorage (keyName, param) {
    keyName = keyName || ''
    param = param || {}
    if (keyName) {
      localStorage.setItem(keyName, JSON.stringify(param))
    }
  },
  /**
   * 从 sessionStorage 里面取数据tg
   * returnData 返回Object数据格式
   */
  getSessionStorage (SessionKeyName) {
    let returnData = ''
    if (SessionKeyName) {
      let storageStr = sessionStorage.getItem(SessionKeyName)
      returnData = JSON.parse(storageStr)
    }
    return returnData
  },
  /**
   * 储存数据到 sessionStorage
   * sessionKeyName 储存key
   * sessionParam 储存数据, Object格式
   */
  setSessionStorage (sessionKeyName, sessionParam) {
    sessionKeyName = sessionKeyName || ''
    sessionParam = sessionParam || {}
    if (sessionKeyName) {
      sessionStorage.setItem(sessionKeyName, JSON.stringify(sessionParam))
    }
  },
  /**
   * 从 sessionStorage 删除数据
   */
  clearSessionStorage (SessionKeyName) {
    if (SessionKeyName) {
      sessionStorage.removeItem(SessionKeyName)
    }
  },
  /**
   * 获取cookie
   */
  getCookie (cookieName) {
    var allcookies = document.cookie
    var cookiePos = allcookies.indexOf(cookieName)
    if (cookiePos !== -1) {
      cookiePos += cookieName.length + 1
      var cookieEnd = allcookies.indexOf(';', cookiePos)
      if (cookieEnd === -1) {
        cookieEnd = allcookies.length
      }
      var value = unescape(allcookies.substring(cookiePos, cookieEnd))
      return value
    } else {
      return ''
    }
  },
  setCookie (cookieName, cookieVal, domain, path) {
    let cookieStr = ''
    if (cookieName && cookieVal) {
      cookieStr = (cookieName + '=' + cookieVal)
    }
    if (domain) {
      cookieStr += '; domain=' + domain
    }
    if (path) {
      cookieStr += '; path=' + path
    }
    document.cookie = cookieStr
  }
}
