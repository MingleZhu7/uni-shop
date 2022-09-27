<template>
	<view class="container" v-if="cart.length !== 0">
		<my-address></my-address>
		<!-- 标题区域 -->
		<view class="cart-title">
			<!-- 左侧图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		
		<uni-swipe-action>
			<view  v-for="(goods, i ) in cart" :key="i">
				<uni-swipe-action-item :right-options="options"  @click="swipeActionClickHandler(goods)">
					<my-goods :item ="goods" :showRadio="true" :showNum="true"  @radio-change='radioClickHandler' @num-change='numChangeHandler'></my-goods>
				</uni-swipe-action-item>
			</view>
		</uni-swipe-action>
		
		<my-settle></my-settle>
	</view>
	
	<view class="empty-cart" v-else>
		<image src="@/static/cart_empty@2x.png" mode="" class="empty-img"></image>
		<text class="tip-text">空空如也~</text>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {mapState, mapMutations} from "vuex"
	export default {
		mixins: [badgeMix] ,
		computed:{
			...mapState('m_cart',['cart'])
		},
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
						
					}
				}]
			};
		},
		methods:{
			...mapMutations('m_cart',['changeState','changeNum', 'deleteGoods']),
			
			radioClickHandler(e){
				this.changeState(e)
			},
			numChangeHandler(e){
				this.changeNum(e);
			},
			swipeActionClickHandler(goods){
				
				this.deleteGoods(goods)
			}
		}
	}
</script>

<style lang="scss">
	.container{
		padding-bottom: 50px;
		
		.cart-title{
			height: 40px;
			display: flex;
			align-items: center;
			font-size: 14px;
			padding-left: 5px;
			border-bottom: solid 1px #efefef;
			.cart-title-text{
				margin-left: 10px;
			}
		}
		
	}
	.empty-cart{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;
		.empty-img{
			height: 90px;
			width: 90px;
		}
		.tip-text{
			font-size: 12px;
			color: gray;
			margin-top: 15px;
		}
		
	}

</style>
