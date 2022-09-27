<template>
	<view>
		<view class="goods-item">
			<!-- 左侧盒子 -->
			<view class="goods-left">
		
					<radio :checked='item.goods_state' color="#c00000"  v-if="showRadio" @click="radioClickHandler"/>
				
				<image :src="item.goods_small_logo || defaultPic" ></image>
			</view>
			<!-- 右侧盒子 -->
			<view class="goods-right">
				<view class="goods-name">
					{{item.goods_name}}
				</view>
				<view class="goods-info-box">
					<view class="goods-price">
						￥{{item.goods_price | tofixed}}
					</view>
					<uni-number-box :min="1"  :value="item.goods_count" v-if="showNum"  @change="numChangeHandler"></uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props: {
			item:{
				type: Object,
				default: {}
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showNum: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				goodsList: [],
				total: 0,
				defaultPic:
				'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		filters: {
			// 把数字处理为带两位小数点的数字
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		methods: {
			radioClickHandler(){
				this.$emit('radio-change', {
					goods_id : this.item.goods_id,
					goods_state: !this.item.goods_state
				})
				
			},
			numChangeHandler(val){
				this.$emit('num-change', {
					goods_id : this.item.goods_id,
					goods_count: val
				})
				
			}
		}
	}
</script>

<style lang="scss">
	.goods-item{
		display: flex;
		padding: 10px 5px;
		border: 1px solid #f5f5f5;
		
		.goods-left{
			display:  flex;
			justify-content: space-between;
			align-items: center;
			image{
				height: 100px;
				width: 100px;
				display: block;
				margin-right: 5px;
			}
		}
		.goods-right{
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;
			
			.goods-name{
				font-size: 13px
			}
			
			.goods-info-box{
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.goods-price{
					font-size: 16px;
					color: #c00000;
				}
				
			}
		}
	}
</style>