<template>
	<view class="my-search-container"> 
		<view class="my-search-box" @click="gotoSearch()">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
		methods:{
			gotoSearch(){
				// console.log("------")
				this.$emit("click")
			}
			
		}
	}
</script>

<style lang="scss">
	.my-search-container{
		background-color: #c00000;
		height: 50px;
		display: flex;
		align-items: center;
		.my-search-box{
			background-color: #ffffff;
			height: 36px;
			border-radius: 15px;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			
			text{
				margin-left: 5px;
			}
			
		}
		
	}
</style>