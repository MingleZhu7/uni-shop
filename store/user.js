export default{
	namespaced: true,
	state: ()=>({
		address: JSON.parse(uni.getStorageSync('address')|| '{}')
	}),
	mutations:{
		updateAddress(state, address){
			state.address = address
			this.commit('m_user/saveAdd')
		},
		saveAdd(state){
			const str = JSON.stringify(state.address)
			uni.setStorageSync('address', str)
			
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