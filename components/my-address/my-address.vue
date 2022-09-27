<template>
	<view>
		<!-- 选择收货地址盒子 -->
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
		</view>
		<!-- 收货信息盒子 -->
		<view class="address-info-box" v-else  @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="username">
						收货人：<text>{{address.userName}}</text>
					</view>
				</view>
				<view class="row1-right">
					<view class="phone">
						电话：<text>{{address.telNumber}}</text>
					</view>
					<uni-icons type="arrowright"></uni-icons>
				</view>
				
			</view>
			
			<view class="row2">
				<view class="row2-left">收货地址：</view>
				<view class="row2-right">
					{{addstr}}
				</view>
			</view>
		</view>
		<image src="../../static/cart_border@2x.png" class="address-border" mode=""></image>
	</view>
</template>

<script>
	
	import {mapState, mapMutations, mapGetters} from 'vuex'
	export default {
		name:"my-address",
		
		computed: {
			...mapState('m_user',['address']),
			...mapGetters('m_user',['addstr'])
		},
		data() {
			return {
				// address: {}
			};
		},
		methods: {
			...mapMutations('m_user',['updateAddress']),
			async chooseAddress(){
				const [err, succ] = await uni.chooseAddress().catch(err=>err)
				if(err === null && succ.errMsg === 'chooseAddress:ok')
				// this.address = succ
				
				this.updateAddress(succ)
			}
		}
	}
</script>

<style lang="scss">

	.address-border {
		display: block;
		height: 5px;
		width: 100%;
	}
	
	.address-choose-box{
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	.address-info-box{
		font-size: 12px;
		height: 90px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding: 0 5px;
		
		.row1{
			display: flex;
			justify-content: space-between;
			.row1-left{
				.username{
					
				}
			}
			.row1-right{
				
				display: flex;
				.phone{
					
				}
			}
		}
		.row2{
			display: flex;
			// justify-content: space-between;
			align-items: center;
			margin-top: 10px;
			
			.row2-left{
				white-space: nowrap; // 文本不换行
			}
			.row-right{
				
				
			}
		}
		
	}
</style>