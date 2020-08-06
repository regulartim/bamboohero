<template>
	<div>
		<app-overlay-share 
			v-if="showOverlayShare"
			@close="showOverlayShare = false"
			:text="shareMsg"
			:url="currentUrl"
			:socialMedia="true">
		</app-overlay-share>

		<div 
			class="card-head bangers" 
			:class="card.color">

			<div 
				class="card-head-left">
				<img
					v-if="icons" 
					:src="getImgUrl(card.symbol)"
					:alt="card.cat">
			</div>
			
			<span>
				<slot></slot>
			</span>			

			<div
				class="card-head-right" 
				@click="share(shareMsg, currentUrl)">
				<img
					v-if="icons" 
					src="@/assets/share-alt.svg"
					alt="share">
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		props: {
			card: Object,
			icons: Boolean
		},
		computed: {
			shareMsg() {
				if (this.card.completed) {
					return "Hey! I just completed this challenge on "
						+ this.sitename 
						+ "!";
				}
				return "Hey, here is a challenge for you!";
			}		
		}
	}
</script>

<style scoped>
	img{
		margin: 8px;
		height: 25px;
	}

	span {
		line-height: 40px;
	}

	.card-head{
		height: 40px;
		color: black;
		font-size: 30px;
		padding: 5px;
		border-radius: 18px 18px 0 0;
	}

	.card-head-left{
		display: inline-block;
		text-align: left;
		float: left;
		max-height: 40px;
	}

	.card-head-right{
		display: inline-block;
		text-align: right;
		float: right;
		max-height: 40px;
		white-space: nowrap;
		cursor: pointer;
	}
</style>