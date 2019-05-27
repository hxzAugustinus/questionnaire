export default {
  getQueryString: name => {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
    let r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return unescape(decodeURI(r[2]))
    }
    return null
  }
}
