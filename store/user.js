export default{
	namespaced: true,
	state: ()=>({
		address: JSON.parse(uni.getStorageSync('address')|| '{}'),
		
		token: uni.getStorageSync('token') || '',
		
		userinfo: JSON.parse(uni.getStorageSync('userinfo')|| '{}'),
		
		redirectInfo: null
	}),
	mutations:{
		updateAddress(state, address){
			state.address = address
			this.commit('m_user/saveAdd')
		},
		saveAdd(state){
			const str = JSON.stringify(state.address)
			uni.setStorageSync('address', str)
			
		},
		// 将 userinfo 持久化存储到本地
		saveUserInfoToStorage(state) {
			uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		},
		updateUserInfo(state, userinfo){
			state.userinfo = userinfo;
			this.commit('m_user/saveUserInfoToStorage')
		},
		updateToken(state, token){
			state.token = token
			
			this.commit('m_user/saveTokenToStorage')
		},
		saveTokenToStorage(state){
			uni.setStorageSync('token',state.token)
			
		},
		
		updateRedirectInfo(state, info){
			
			state.redirectInfo = info
			// console.log(info);
			
		}
		
	},
	
	// 数据包装器
	getters: {
		addstr(state){
			if(!state.address.provinceName){
				return ''
			}else{
				return  state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfo
			}
			
		}
		
	},
	
}