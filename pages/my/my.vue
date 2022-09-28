<template>
	<view class="container">
		<my-login v-if="!token"></my-login>
		
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import badgeMin from "@/mixins/tabbar-badge.js"
	import {mapState} from "vuex"
	
	export default {
		mixins:[badgeMin],
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('m_user', ['token'])
			
		}
	}
</script>

<style lang="scss">
	page,
	.container{
		height: 100%;
	}
	
</style>
