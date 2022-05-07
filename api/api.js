/**
 * 接口调用
 * auth：fmq
 */




//引入store
import store from '@/store/index.js'




/**
 * api get请求 
 * 
 * @param {Object} url
 * @param {Object} param
 * @param {Object} contentType
 */
export function apiGet(url, param, contentType) {
	return sendHttpRequest(url, param, 'GET', contentType)
}

/**
 * api post请求
 * 
 * @param {Object} url
 * @param {Object} param
 * @param {Object} contentType
 */
export function apiPost(url, param, contentType) {
	return sendHttpRequest(url, param, 'POST', contentType)
}

/**
 * 发送http请求
 * @param {Object} url
 * @param {Object} param
 * @param {Object} method
 * @param {Object} contentType
 */
export function sendHttpRequest(url, param, method, contentType) {
	let fullUrl = getApiBase() + url
	let authorization = store.state.token;
	let ct = !!contentType ? contentType : 'application/x-www-form-urlencoded';
	return new Promise((resolve, reject) => {
		uni.request({
			url: fullUrl,
			data: param,
			header: {
				'content-type': ct,
				'Authorization': authorization
			},
			method: method
		}).then(res => {
			// console.log('request:', JSON.stringify(res));
			let [error, data] = res
			let result = data.data
			if (!error) {
				if(404 == data.statusCode){
					uni.showModal({
						title: '请求失败',
						content: '无法连接服务器，请稍后重试',
						confirmText: '重试',
						showCancel: false,
						success(r) {
							if (r.confirm) {
								store.commit('logout');
								uni.reLaunch({
									url: '/pages/launcher/transition'
								})
							}
						}
					});
					reject()
				}
				else if (40003 == result.code) {
					// token失效，重新登录
					uni.showModal({
						content: '身份信息已失效，请重新登录',
						confirmText: '重新登录',
						showCancel: false,
						success(r) {
							if (r.confirm) {
								store.commit('logout');
								uni.reLaunch({
									url: '/pages/launcher/transition'
								})
							}
						}
					});
					reject(result);
				} else {
					resolve(result);
				}
			} else {
				if (40003 == result.code) {
					// token失效，重新登录
					uni.showModal({
						content: '身份信息已失效，请重新登录',
						confirmText: '重新登录',
						showCancel: false,
						success(r) {
							if (r.confirm) {
								store.commit('logout');
								uni.reLaunch({
									url: '/pages/launcher/transition'
								})
							}
						}
					});
					reject(result);
				} else {
					uni.showToast({
						title: '无法连接服务器，请稍后重试',
						duration: 2000,
						icon: 'none'
					});

					reject(error);
				}
			}
		}).catch((e) => {
			uni.hideLoading();
			uni.stopPullDownRefresh();
			uni.showModal({
				title: '请求失败',
				content: '无法连接服务器，请稍后重试',
				showCancel: false
			});
			reject();
		});
	})
}
