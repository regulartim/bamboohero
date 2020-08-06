<template>
	<div 
		class="card-preview"
		:class="cardColor"
		@click="showCard(cardId)"
		@mouseenter="hover=true"
		@mouseleave="hover=false"
		@touchstart="hover=true"
		@touchend="hover=false"
		@touchcancel="hover=false"
		>
		<div  
			class="card-overlay"
			:class="{'active-overlay': hover}">
		</div>
		<div
			class="card-overlay-text"
			:class="{'active-overlay-text': hover}"
			v-html="shorten(cardPreText, 80)">
		</div>
		
		<span class="helper"></span>
		<img 
			:src="getImgUrl(cardSymbol)"
			:alt="cardSymbol"
			class="symbol">
		<div 
			class="level"
			v-if="cardLevel > 1">
			<b> {{ cardLevel }} </b>
		</div>				
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// Control for displaying overlay
				hover: false
			}
		},
		props: {
			cardId: Number, 
			cardColor: String,
			cardPreText: String,
			cardSymbol: String,
			cardLevel: Number
		},
		methods: {
			// Shorten card text for preview
			shorten(string, n) {
				if(string.length > n) {
					string = string.substring(0,n)+"...";
				}
				return string;
			}
		}
	}
</script>

<style scoped>

	.card-preview{
		width: 150px;
		height: 220px;
		margin: 10px;
		margin-bottom: 50px;
		display: inline-block;
		border-radius: 10px;
		cursor: pointer;
		position: relative;
	}

	.symbol{
		height: 40%;
		vertical-align: middle;
	}

	.level {
		color: black;
		position: absolute;
		bottom: 10px;
		right: 20px;
		font-size: 2em;
	}

	.card-overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 10px;
		background-color: black;
		opacity: 0;
		user-select: none;
	}
	
	.card-overlay-text {
		position: absolute;
		width: 100%;
		height: 100%;
		margin-top: 10px;
		font-size: 16pt;
		opacity: 0;				
		user-select: none;
	}

	.active-overlay {
		transition: .5s ease;		
		opacity: 0.5;
	}

	.active-overlay-text {
		transition: .5s ease;
		opacity: 1;
	}	
	
	
	
</style>