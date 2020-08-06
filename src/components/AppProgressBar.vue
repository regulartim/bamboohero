<template>
	<div class="progress-bar progress-bar-outer lightbluegray">
		<div 
			class="progress-bar progress-bar-inner"
			:style="{width: pbWidth}"
			:class="color">
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			filled: Number,
			total: Number,
			color: String
		},
		computed: {
			pbWidth() {
				const percentage = 
					95 * (this.filled) / (this.total) + 5;
				return percentage + "%";
			}
		}
	}
</script>

<style scoped>
	.progress-bar {
		height: 20px;
	}
	.progress-bar-outer {
		width: 100%;
		max-width: 400px;
		margin: auto;
		border-radius: 10px;
	}

	.progress-bar-inner {
		text-align: left;
		border-radius: 10px;
		animation: 1s ease 0s normal forwards 1 expandWidth;
	}	

	@keyframes expandWidth {
		0% { width: 0; }
	}
</style>