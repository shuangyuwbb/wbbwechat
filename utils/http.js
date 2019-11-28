import { config } from '../config.js'
class HTTP {
    request(params) {
        if (!params.method) {
            params.method = 'GET'
        }
        wx.request({
            url: config.api_base_url + params.url,
            data: params.data,
            method: params.method,
            header: {
                'content-type' : 'application/json',
            },
            success:(res) => {
                console.log('成功请求');
                let code = res.statusCode.toString();
                if(code.startsWith('2')){
                    
                }
            },
            fail:(res) => {
                console.log('网络出小茶'+res)
            }
        })
    }
}
export {HTTP};