<template>
	<div class="wrapper">
		<button 
			class="btn" 
			:class="btnColor"
			@click="btnClicked"
			>			
			<img 
				:src="getImgUrl(btnSymbol)"
				:alt="btnSymbol">
		</button>
		<div class="bangers btn-text">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			btnColor: String,
			btnSymbol: String
		},
		methods: {
			btnClicked() {
				this.$emit("btnClicked");
			}
		}
	}
</script>

<style scoped>
	
	.btn{
		width: 80px;
		height: 80px;
		margin: 10px;
		display: inline-block;
		border: 0;
		border-radius: 40px;
		cursor: pointer;
		user-select: none;
	}
	.btn img {
		height: 50%;
		vertical-align: middle;
	}
	.btn-text {
		color: white;
	}
	
</style>