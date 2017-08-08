let reqUrl = ''
var env = process.env.NODE_ENV

const VERSION = 'V1'
if (env === 'development') { // 本地调试接口
  reqUrl = `http://192.168.23.231:33003/api-manager/${VERSION}/`
  // reqUrl = `http://testsmi.assets.smi170.com/api-manager/${VERSION}/`
  // reqUrl = `http://192.168.23.231:33003/api-manager/${VERSION}/`
  // reqUrl = `http://192.168.68.25:33003/api-manager/${VERSION}/`
}
else if (env === 'production') {  // 线上接口
  // reqUrl = `http://api.fans.smi170.com/api/${VERSION}/`
  reqUrl = `http://192.168.68.25:33003/api-manager/${VERSION}/`
  
}

export const API_ROOT = reqUrl
export const CONTENT_TYPE = 'application/x-www-form-urlencoded'
export const MOCK_MODE = false // 模拟数据模式

// 模拟请求地址
export const mockUrlConfig = {
  'order_set_list': '/order/setlist/'
}

// 线上请求地址
export const urlConfig = {
  'order_set_list': '/user/list'
}