<template>
	<view  class="login-container" > 
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<button type="primary" class="btn-login"  @click="getUserInfo">一键登录</button>
		<view class="tips-text">登录后尽享更多权益</view>
	</view>
</template>

<script>
	import {mapMutations, mapState} from "vuex"
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('m_user', ['redirectInfo'])
		},
		methods: {
			...mapMutations('m_user',['updateUserInfo','updateToken','updateRedirectInfo']),
			getUserInfo(){
				uni.getUserProfile({
					desc: '获取信息',
					success: (res) => {
						// console.log(res.userInfo);
						
						this.updateUserInfo(res.userInfo)
						this.getToken(res)
					},
					fail: (res) => {
						uni.$showMsg('您取消了登录授权！')
					}
				})
				
			},
			async getToken(info){
				const [err,succ] = await uni.login().catch(err=>err)
				if(err || succ.errMsg !=='login:ok') return uni.$showMsg('登录失败')
				// 获取token
				const query = {
					code: succ.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
					
				}
				// console.log(query);
				const {data: loginRes} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
				
				if(loginRes.meta.status === 200)  return uni.$showMsg('登录失败！')
				
				const token = '123asdc'
				// console.log(loginRes);
				this.updateToken(token)
				if(this.redirectInfo && this.redirectInfo.type === 'switchTab'){
					uni.switchTab({
						url:this.redirectInfo.from,
						complete: () => {
							this.updateRedirectInfo(null)
						}
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.login-container{
		height: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #f8f8f8;
		position: relative;
		
		&::after {
			content: ' ';
			display: block;
			position: absolute;
			width: 100%;
			height: 40px;
			left: 0;
			bottom: 0;
			background-color: white;
			border-radius: 100%;
			transform: translateY(50%);
		}
		
		.btn-login{
			width: 90%;
			background-color: #c00000;
			border-radius: 100px;
			margin: 15px 0;
		}
		.tips-text{
			font-size: 12px;
			color: gray;
		}
		

	}
</style>