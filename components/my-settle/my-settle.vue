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
		<view class="btn-settle">结算({{checkedCount}})</view>
		
	</view>
</template>

<script>
	import {mapGetters, mapMutations} from "vuex"
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		computed: {
			...mapGetters('m_cart', ['checkedCount','total','checkedGoodsAmount']),
			isFullChecked(){
				// console.log(this.total === this.checkedCount);
				return this.total === this.checkedCount
			}
		},
		methods: {
			...mapMutations('m_cart', ['updateAllGoodsState']),
			changeAllState(){
				
				this.updateAllGoodsState(!this.isFullChecked)
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