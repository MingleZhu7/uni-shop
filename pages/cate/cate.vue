<template>
	<view>
		<my-search @click="gotoSearch()"></my-search>
		<view class="scroll-view-container">
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh+'px'}">
				
				<view class="" v-for="(item,i) in cateList" :key="i">
					
					<view :class="['left-scroll-view-item', i === active?'active':'']" @click="activeChanged(i)">{{item.cat_name}}</view>
				</view>
				
				
			</scroll-view>
			<scroll-view scroll-y="true" :style="{height: wh+'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item, i) in cateLv2" :key="i" >
					<!-- 二级分类名称 -->
					<view class="cate-lv2-title">/ {{item.cat_name}} /</view>
					<!-- 三级分类项 -->
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item2, i2) in item.children" :key="i2" @click="navToGoodsList(item2)">
							<!-- 图片 -->
							<image :src="item2.cat_icon" ></image>
							<!-- 文字 -->
							<text>{{item2.cat_name}}</text>
							
						</view>
						
					</view>
				</view>
				
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [badgeMix] ,
		data() {
			return {
				wh:0,
				cateList:[],
				active:0,
				cateLv2:[],
				scrollTop:0
			};
		},
		onLoad() {
			const info = uni.getSystemInfoSync()
			this.wh = info.windowHeight-50
			
			this.getCateList()
		},
		methods:{
			async getCateList(){
				const res =(await uni.$http.get('/api/public/v1/categories')).data
				this.cateList = res.message
				this.cateLv2 = res.message[0].children
			
			},
			activeChanged(i){
				this.active = i;
				this.cateLv2 = this.cateList[i].children
				this.scrollTop = this.scrollTop === 1 ?0:1
				
			},
			navToGoodsList(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid='+item.cat_id
				})
			},
			gotoSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
				
			}
			
			
		}
		
		
	}
</script>

<style lang="scss">
	.scroll-view-container{
		display: flex;
		background-color: #ffffff;
		.left-scroll-view{
			width: 120px;
			.left-scroll-view-item{
				line-height: 60px;
				text-align: center;
				background-color: #f7f7f7;
				font-size: 12px;
				// 同时拥有两个类,用&代表父类
				&.active{
					background-color: #ffffff;
					position: relative;
					
					&::before{
						content: " ";
						display: block;
						width: 3px;
						height: 30px;
						background-color: #c00000;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
						
					}
				}
			}
			
		}
	}
	
	.cate-lv2-title{
		font-style: 12px;
		text-align: center;
		font-weight: bold;
		padding: 15px 0;
	}
	.cate-lv3-list{
		display: flex;
		flex-wrap: wrap;
		.cate-lv3-item{
			width: 33.33%;
			margin-top: 10px;
			display: flex;
			flex-direction: column; // 不是横向漂浮
			align-items: center; // 各项居中
			
			image{
				width: 60px;
				height: 60px;
			}
			text{
				font-size: 12px
				
			}
			
		}
	}
</style>
