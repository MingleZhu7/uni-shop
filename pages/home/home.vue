<template>
	<view>
		<!-- uni swiper组件 -->
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			
			<swiper-item v-for="(item,i) in swiperList" :key="i">
				<view class="swiper-item" @click="toDetail(item.goods_id)">
					<img :src="item.image_src" >
				</view>
				
			</swiper-item>
		</swiper>
		
		<!-- 分类导航 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
				<img :src="item.image_src">
			</view>
		</view>
		
		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item, i) in floorList" :key="i">
				<!-- 楼层标题区域 -->
				<image :src="item.floor_title.image_src"  class="floor-title"></image>
				<!-- 楼层图片区 -->
				<view class="floor-img-box">
					<!-- 左侧大图片 -->
					<view class="left-img-box">
						
						<image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"
						@click="navToGoodsList(item.product_list[0].url)"></image>
						
					</view>
					<view class="right-img-box">
						<view class="right-img-item" v-for="(item2,i2) in item.product_list" :key="i2" v-if=" i2 != 0" >
							<image :src="item2.image_src"  :style="{width: item2.image_width + 'rpx'}" mode="widthFix" 
							@click="navToGoodsList(item2.url)"></image>
							
						</view>
					</view>
					
					
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//轮播图数据列表
				swiperList: [],
				//导航栏数据列表
				navList: [],
				//楼层数据列表
				floorList: []
				
			};
		},
		onLoad() {
			//获取数据
			this.getSwiperList()
			
			this.getNavList()
			this.getFloorList()
			
		},
		methods:{
			
			async getSwiperList(){
				
				const res = (await uni.$http.get('/api/public/v1/home/swiperdata')).data;
				// const res = await uni.$http.get('api/public/v1/home/swiperdata');
				// const res = await uni.$http.get('https://unidemo.dcloud.net.cn/api/news');
				// console.log(res)
				if(res.meta.status != 200){
					return uni.$showMsg()
				}
				
				this.swiperList = res.message
				// uni.$showMsg("数据请求成功")
			},
			async getFloorList(){
				const res = (await uni.$http.get('/api/public/v1/home/floordata')).data
				
				if(res.meta.status != 200){
					return uni.$showMsg()
				}
				//进行数据处理，加上url
				res.message.forEach(floor=>{
					floor.product_list.forEach(pro=>{
						pro.url = '/subpkg/goods_list/goods_list?'+pro.navigator_url.split('?')[1]
					})
				})
				
				this.floorList = res.message
			},
			async getNavList(){
				
				const res = (await uni.$http.get('/api/public/v1/home/catitems')).data
				
				if(res.meta.status != 200){
					return uni.$showMsg()
				}
				this.navList = res.message
			},
			toDetail(e){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+e
				})
				// console.log(e)
			},
			navClickHandler(item){
				
				// console.log(item.name)
				if(item.name == '分类'){
					uni.switchTab({
						url:'/pages/cate/cate'
					})
				}
			},
			navToGoodsList(url){
				uni.navigateTo({
					url
				})
			}
			
		}
	}
</script>

<style lang="scss">
	swiper{
		height: 330rpx;
		
		.swiper-item, img {
			height: 100%;
			width: 100%;
		}
		
	}
	.nav-list{
		display: flex;
		justify-content: space-around;
		margin: 15px 0;
		img{
			width: 128rpx;
			height: 140rpx;
		}
		
	}
	.floor-title{
		height: 60rpx;
		width: 100%;
		display: flex;
	}
	.right-img-box{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	.floor-img-box{
		display: flex;
		padding-left: 10rpx;
	}
</style>
