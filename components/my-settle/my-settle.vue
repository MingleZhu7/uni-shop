<template>
	<view class="my-settle-container">

		<label class="radio" @click="changeAllState">
			<radio color="#C00000" :checked="isFullChecked" /><text>全选</text>
		</label>
		
		<!-- 合计区域 -->
		<view class="amount-box">
			合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
		</view>
		
		<!-- 结算按钮 -->
		<view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
		
	</view>
</template>

<script>
	import {mapGetters, mapMutations, mapState} from "vuex"
	export default {
		name:"my-settle",
		data() {
			return {
				second: 3,
				timer: null
			};
		},
		computed: {
			...mapGetters('m_cart', ['checkedCount','total','checkedGoodsAmount']),
			...mapGetters('m_user',['addstr']),
			...mapState('m_user', ['token']),
			isFullChecked(){
				// console.log(this.total === this.checkedCount);
				return this.total === this.checkedCount
			}
		},
		methods: {
			...mapMutations('m_cart', ['updateAllGoodsState']),
			...mapMutations('m_user', ['updateRedirectInfo']),
			changeAllState(){
				
				this.updateAllGoodsState(!this.isFullChecked)
			},
			settlement(){
				if(! this.checkedCount) return uni.$showMsg('请选择结算的商品！')
				
				if(! this.addstr) return uni.$showMsg('请选择收货地址！')
				
				if(! this.token) return this.delayNavi()
			},
			
			delayNavi(){
				this.second = 3
				this.showTips(this.second)
				this.timer = setInterval(()=>{
					this.second--
					if(this.second <=0){
						clearInterval(this.timer)
						uni.switchTab({
							url:'/pages/my/my',
							success: () => {
								this.updateRedirectInfo({
									type: 'switchTab',
									from: '/pages/cart/cart'
									
								})
								
							}
						})
						
						return
					}
					this.showTips(this.second)
				}, 1000)
				
			},
			showTips(n){
				uni.showToast({
					icon:"none",
					title:'请登录后再结算！' + n + ' 秒后自动跳转到登录页',
					mask: true,
					duration: 1500
				})
				
			}
			
		}
	}
</script>

<style lang="scss">
	.my-settle-container{
		height: 50px;
		background-color: white;
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
		
		.radio{
			display: flex;
			align-items: center;
		}
		.amount-box{
			.amount{
				color: #c00000;
				font-weight: bold;
			}
		}
		.btn-settle{
			background-color: #c00000;
			color: white;
			height: 50px;
			line-height: 50px;
			min-width: 100px;
			text-align: center;
			padding: 0 10px;
		}
		
		
	}
	
</style>