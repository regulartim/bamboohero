<template>
	<div class="card-foot">
		<div
			v-if="cat" 
			class="card-foot-left">
			Category: {{ cat }}
		</div>
		<div 
			v-if="level" 
			class="card-foot-right">			
			{{ level }}
			<img 
				:src="getImgUrl('bamboo_small')"
				alt="bamboo">
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			cat: String,
			level: Number
		}
	}
</script>

<style scoped>
	.card-foot{
		border-top: 1px solid lightgrey;
		margin: 10px;
		margin-top: 0;
		padding: 5px;
	}

	.card-foot img{
		height: 18px;
	}

	.card-foot-left{
		display: inline-block;
		text-align: left;
		float: left;
		padding-top: 5px;
		max-height: 40px;
	}

	.card-foot-right{
		display: inline-block;
		text-align: right;
		float: right;
		max-height: 40px;
		white-space: nowrap;
		font-size: 150%;
	}
</style>