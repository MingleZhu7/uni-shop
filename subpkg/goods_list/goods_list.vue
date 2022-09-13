<template>
	<view>
		<view class="goods-list" v-for="(item,i) in goodsList" :key="i" @click="gotoDetail(item)">
				
			<my-goods :item="item"></my-goods>
			
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				goodsList: [],
				isLoading: false,
				total: 0,
				defaultPic:
				'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		onLoad(option) {
			this.queryObj.query = option.query || ''
			this.queryObj.cid = option.cid || ''
			
			this.getGoodsList()
		},
		methods: {
			async getGoodsList(cb){
				this.isLoading = true
				const res = (await uni.$http.get('/api/public/v1/goods/search', this.queryObj)).data
				// 只要数据请求完毕，就立即按需调用 cb 回调函数，停止下拉
				cb && cb()
				if(res.meta.status !== 200){
					uni.$showMsg()
					return
				}
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
				
				this.isLoading = false
			},
			gotoDetail(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
				})
			}
		},
		onReachBottom() {
			if(this.total <= this.queryObj.pagesize*this.queryObj.pagenum) {
				uni.$showMsg("数据加载完毕"); 
				return;
			}
			
			if(this.isLoading) return; // 防止重复请求
			this.queryObj.pagenum +=1;
			
			this.getGoodsList();
			
		},
		onPullDownRefresh() { // 下拉刷新
		// 初始化数据
			this.queryObj.pagenum = 1;
			this.total = 0;
			this.goodsList = [];
			
			// 请求数据
			this.getGoodsList(()=>uni.stopPullDownRefresh()) // 请求完数据后需要停止下拉
		}
		
	}
</script>

<style lang="scss">
	
</style>
