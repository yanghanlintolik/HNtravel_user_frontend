import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
		// 默认主题色
		themeColor: {		
			title: '海蓝',
			name: 'blue',
			color: '#d0eafe'
		}
		
    },
    mutations: {
		// 设置整体主题色
		setThemeColor(state, val) {
			state.themeColor = val
			// 缓存在本地
			uni.setStorageSync('memberStaff_themeColor', val)
		},
    }
})

export default store
