export default {
	// 为当前模块开启命名空间
	namespaced: true,
	// 模块的 state 数据
	state: () => ({
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count,goods_small_logo, goods_state }
		cart: JSON.parse(uni.getStorageSync('cart') ||'[]')
	}),
	// 模块的 mutations 方法
	mutations: {
		addToCart(state, goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			// console.log(findResult);
			
			if(! findResult){ // 商品不存在就加入购物车
				state.cart.push(goods)
			}else { // 存在 就 count ++
				findResult.goods_count++
			}
			this.commit('m_cart/saveCart')
		},
		saveCart(state){
			uni.setStorageSync('cart', JSON.stringify(state.cart))
			
		},
		changeState(state,goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			
			if(findResult){
				findResult.goods_state = goods.goods_state
				this.commit('m_cart/saveCart')
			}
		},
		changeNum(state,goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			
			if(findResult){
				findResult.goods_count = goods.goods_count
				this.commit('m_cart/saveCart')
			}
		},
		deleteGoods(state, goods){
			state.cart = state.cart.filter(x => x.goods_id !== goods.goods_id)
			
			this.commit('m_cart/saveCart')
		},
		updateAllGoodsState(state, newState){
			state.cart.forEach(x=> x.goods_state = newState)
			
			this.commit('m_cart/saveCart')
		}
		
	},
	// 模块的 getters 属性
	getters: {
		total(state){
			let c = 0
			state.cart.forEach(x=> c+=x.goods_count)
			
			return c
		},
		checkedCount(state){
			return state.cart.filter(x=>x.goods_state).reduce((total, item)=> total+= item.goods_count, 0)
		},
		checkedGoodsAmount(state){
			return state.cart.filter(x=>x.goods_state).reduce((total, item)=> total+= item.goods_count* item.goods_price, 0).toFixed(2)
			
		}
		
	},
}