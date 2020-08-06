<template>
	<div id="app">

		<header>
			<the-navbar></the-navbar>
		</header>
		
		<main>
			<transition 
				name="slide" 
				mode="out-in" 
				@after-leave="$root.$emit('triggerScroll')">
				<router-view></router-view>
			</transition>
		</main>
		
		<footer>
			<the-footer></the-footer>
		</footer>

	</div>
</template>

<script>
	import TheNavbar from "@/components/TheNavbar.vue";
	import TheFooter from "@/components/TheFooter.vue";

	export default {
		name: 'app',
		components: {
			theNavbar: TheNavbar,
			theFooter: TheFooter
		},
		created() {
			this.$store.dispatch('loadData');
		}
	}
</script>

<style>
/* MAIN STYLE CONFIGURATIONS */
	body {
		margin: 0;
		padding: 0;
		background: #35495E;
	}
	
	main {		
		text-align: center;
		color: #fff;
		max-width: 1200px;
		margin: 0 auto;
		padding: 5px;
	}
	#app {
		margin-top: 60px;
		margin-bottom: 50px;
		padding-top: 10px;
		font-family: 'Ubuntu', sans-serif;
		
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		-webkit-tap-highlight-color: rgba(0,0,0,0);
		-webkit-tap-highlight-color: transparent; 
	}
	h1, h2, h3 {
		margin-left: 10px;
		margin-right: 10px;
	}
	h1, h2, h3, b, .bangers {
		font-family: 'Bangers' , sans-serif;
		font-weight: normal;
	}
	p {
		margin: 20px;
		font-size: 16pt;
	}
	main a , a:visited {
		color: #41b883;
		text-decoration: none;
		word-wrap: break-word;
	}
	input[type=text] {
		background-color: #35495E;
		color: white;
		border: 3px solid white;
		border-radius: 5px;
		padding: 5px;
	}
	::placeholder {
		color: lightgrey;
	}
	:focus {
		outline: none;
	}

	.green-text {
		color: #41b883;
	}

	.text-align-left {
		text-align: left
	}

/* BACKGROUND COLORS */
	.green {
		background-color: #41b883 !important;
	}
	.yellow {
		background-color: #f1ec74 !important;
	}
	.blue {
		background-color: #27b7b5 !important;
	}
	.grey {
		background-color: lightgray !important;
	}
	.red {
		background-color: #dc5b70 !important;
	}
	.white {
		background-color: white !important;
	}
	.black {
		background-color: #222 !important;
	}
	.lightbluegray {
		background-color: #5c6c7d !important;
	}
	
/* BUTTON AND SYMBOL STYLES */
	.helper {
		display: inline-block;
		height: 100%;
		vertical-align: middle;
	}
	.wrapper {
		display: inline-block;
		vertical-align: top;
	}

/* CLEARFIX */
	.clearfix::before, .clearfix::after {
		content: " ";
		display: table;
	} 

	.clearfix::after {
		clear: both;
	}

/* OVERLAYS */
	.ov-shadow {
		position: fixed;
		display: block;
		top: 0;
		left: 0;
		right: 0;  
		bottom: 0;
		z-index: 2; 
	}

	.ov-shadow-light {
		background-color: rgba(0,0,0,0.6);
	}

	.ov-shadow-dark {
		background-color: rgba(0,0,0,0.9);
	}

/* FADE ANIMATIONS */
	.fade-enter{
		opacity: 0;
	}

	.fade-enter-active {
		animation: .5s ease 0s normal forwards 1 fade-in;
	}

	.fade-enter-active-2s {
		animation: 2s ease 0s normal forwards 1 fade-in;
	}	

	.fade-enter-active-2s-delayed {
		animation: 3s ease 0s normal forwards 1 fade-in-delayed;
	}

	.fade-leave-active {
		animation: .5s ease 0s normal forwards 1 fade-out;
	}

	.fade-leave-active-point2s {
		animation: .2s ease 0s normal forwards 1 fade-out;
	}
	
	@keyframes fade-in {
		0% { opacity:0; }
		100% { opacity:1; }
	}

	@keyframes fade-in-delayed {
		0% { opacity:0; }
		33% { opacity:0; }
		100% { opacity:1; }
	}

	@keyframes fade-out{ 
		0% { opacity:1; }
		100% { opacity:0; }
	}

/* SLIDE ANIMATION */
	.slide-enter{  
		opacity: 0;      
	}
	.slide-enter-active{
		transition: opacity .2s;
		animation: slide-in .2s ease-out forwards;
	}
	.slide-leave-active{
		transition: opacity .2s;
		opacity: 0;
		animation: slide-out .2s ease-out forwards;     
	}

	@keyframes slide-in {
		from {
			transform: translateY(-20px);
		} to {
			transform: translateY(0);
		}
	}
	@keyframes slide-out {
		from {
			transform: translateY(0);
		} to {
			transform: translateY(-20px);
		}
	}

/* FLIP ANIMATION */
	.flip-enter-active{
		animation: flip-in .2s ease-out forwards;
	}
	.flip-leave-active{
		animation: flip-out .2s ease-out forwards;
	}

	@keyframes flip-out {
		from {
			transform: rotateY(0deg);
		}to{
			transform: rotateY(90deg);
		}
	}
	@keyframes flip-in {
		from {
			transform: rotateY(90deg);
		}to{
			transform: rotateY(0deg);
		}
	}

/* FONTS */
	@font-face {
		font-family: 'Ubuntu';
		font-display: fallback;
		font-style: normal;
		font-weight: 400;
		src: local('Ubuntu Regular'), local('Ubuntu-Regular'), url(/fonts/ubuntu.woff2) format('woff2');
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}

	@font-face {
		font-family: 'Bangers';
		font-display: fallback;
		font-style: normal;
		font-weight: 400;
		src: local('Bangers Regular'), local('Bangers-Regular'), url(/fonts/bangers.woff2) format('woff2');
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	} 

</style>
