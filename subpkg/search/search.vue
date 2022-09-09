<template>
	<view>
		
		<view class="search-box" style="background-color: #c00000;">
			<uni-search-bar    @input="input"  radius="100"   cancelButton="none"  :focus="true">
			</uni-search-bar>	
	
		</view>
		<view class="sugg-list" v-if="searchList.length !== 0">
			<view class="sugg-item" v-for="(item,i) in searchList" :key="i" @click="gotoDetail(item)">
				<view class="goods-name">
					{{item.goods_name}}
				</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
			
		</view>
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" @click="clearHistory()"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag :text="item" :inverted="true" v-for="(item, i) in histories" :key="i" @click="navToGoodsList(item)"></uni-tag>
				<!-- <uni-tag text="item" ></uni-tag> -->
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				kw:'',
				searchList:[],
				historyList:['a','app','apple']
			};
		},
		onLoad(){
			this.historyList = JSON.parse(uni.getStorageSync('history') || '[]') 
			console.log(this.historyList)
		},
		computed:{
			histories(){
				// 改变历史记录得顺序，原数据为改变
				return [...this.historyList].reverse()
	
			}
		},
		methods:{
			input(e){
				clearTimeout(this.timer)
				
				this.timer = setTimeout(()=>{
					this.kw = e
					
					this.getSearchList()
					this.addHistory()
				},500)
				
			},
			async getSearchList(){
				if(this.kw ===''){
					this.searchList = []
					return 
				}
				const res = (await uni.$http.get('/api/public/v1/goods/qsearch',{ query: this.kw })).data
				if(res.meta.status !== 200){
					uni.$showMsg()
					return
				}
				// console.log(res.message)
				this.searchList = res.message
				
			},
			gotoDetail(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id'+item.goods_id
				})
				
			},
			addHistory(){
				const set = new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
				this.historyList = Array.from(set)
				// 将数据持久化
				uni.setStorageSync('history',JSON.stringify(this.historyList))
			},
			clearHistory(){
				this.historyList = []
				uni.setStorageSync('kw', '[]')
			},
			navToGoodsList(item){
				console.log(item)
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query='+item
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.search-box{
		position: sticky;
		top: 0;
		z-index: 999;
		
	}
	.sugg-list{
		padding: 0 5px;
		.sugg-item{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 13px 0 ;
			font-size: 12px;
			.goods-name{
				// 文字不允许换行（单行文本）
				white-space: nowrap;
				// 溢出部分隐藏
				overflow: hidden;
				// 文本溢出后，使用 ... 代替
				text-overflow: ellipsis;
				
			}
		}
		
	}
	.history-box{
		padding: 0 5px;
		.history-title{
			// font-size: 12px;
			display: flex;
			justify-content: space-between;
			height: 40px;
			align-items: center;
			font-size: 13px;
			border-bottom: 1px solid #efefef;
		}
		
		.history-list{
			display: flex;
			flex-wrap: wrap;
			uni-tag{
				margin-top: 5px;
				margin-right: 5px;
			}
		}
	}

</style>
