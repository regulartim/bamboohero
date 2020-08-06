<template>
	<transition 
		:name="navbarTransition.name" 
		:enter-active-class="navbarTransition.class"
		appear>
		<div class="navbar bangers">
			<transition name="fade" mode="out-in">
				<div 
					v-show="showMenu"
					class="ov-shadow ov-shadow-light"
					@click="showMenu=false">
				</div>
			</transition>
			<div id="menuToggle">
				<input 
					id="hamburger" 
					type="checkbox" 
					v-model="showMenu">			
				<span></span>
				<span></span>
				<span></span>
				<ul id="menu">
					<li>
						<a @click="goTo('Welcome')">Home</a>
					</li>
					<li>
						<a @click="goTo('Challenges')">Challenges</a>
					</li>
					<li>
						<a @click="goTo('Progress')">Progress</a>
					</li>
					<li>
						<a @click="goTo('Load')">Load</a>
					</li>
					<li>
						<a @click="goTo('Save')">Save</a>
					</li>
					<li 
						v-if="developmentMode">
						<a @click="goTo('Suggest')">Karte vorschlagen</a>
					</li>
					<li>
						<a @click="goTo('Legal')">Legal / About</a>
					</li>
					<li>
						<a @click="showCard(27)">Donate</a>
					</li>
				</ul>			
			</div>
			<div class="heading">
				<h1>{{ sitename }}</h1>
			</div>
			<div 
				v-if="playerData.score > 0"
				class="score" 
				@click="goTo('Progress')"> 
				{{ playerData.score }} 
				<img 
					src="@/assets/bamboo_white.svg"
					alt="bamboo">
			</div>
		</div>		
	</transition>
</template>

<script>
</script>

<style scoped>
	.navbar {
		margin: 0;
		height: 56px;
		width: 100%;
		top: 0px;
		background-color: #222;
		color: #ffffff;
		position: fixed;
		z-index: 2;
	}

	#menuToggle	{
		display: inline-block;
		position: absolute;
		top: 20px;
		left: 20px;
		z-index: 2;
		-webkit-user-select: none;
		user-select: none;
	}

	#menuToggle input {
		display: block;
		width: 40px;
		height: 32px;
		position: absolute;
		top: -7px;
		left: -5px;
		cursor: pointer;
		opacity: 0;
		z-index: 2;
		-webkit-touch-callout: none;
	}

	#menuToggle span {
		display: block;
		width: 33px;
		height: 4px;
		margin-bottom: 5px;
		position: relative;
		background: white;
		border-radius: 3px;
		z-index: 1;
		transform-origin: 4px 0px;
		transition: 
			transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
			background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
			opacity 0.55s ease;
	}

	#menuToggle span:first-child {
		transform-origin: 0% 0%;
	}

	#menuToggle span:nth-last-child(2) {
		transform-origin: 0% 100%;
	}

	#menuToggle input:checked ~ span {
		opacity: 1;
		transform: rotate(45deg) translate(-2px, -1px);
		background: #232323;
	}

	#menuToggle input:checked ~ span:nth-last-child(3) {
		opacity: 0;
		transform: rotate(0deg) scale(0.2, 0.2);
	}

	#menuToggle input:checked ~ span:nth-last-child(2) {
		transform: rotate(-45deg) translate(0, -1px);
	}

	#menu {
		position: absolute;
		width: 200px;
		margin: -100px 0 0 -50px;
		padding: 50px;
		padding-top: 125px;
		background: white;
		list-style-type: none;
		-webkit-font-smoothing: antialiased;
		transform-origin: 0% 0%;
		transform: translate(-100%, 0);
		transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
	}

	#menu li {
		padding: 10px 0;
		font-size: 22px;
		color: #222;
		cursor: pointer;
	}

	#menuToggle input:checked ~ ul {
		transform: none;
	}

	h1 {
		position: relative;
		font-size: 30px;
		line-height: 1;
		font-weight: 400;
		box-sizing: border-box;
		padding-top: 16px;
		text-align: center;
		margin-top: 0;
		user-select: none;
	}

	.heading {
		width: 100%;
		display: inline-block;
		float: center;
	}

	.score{
		display: inline-block;
		color: white;
		position: absolute;
		top: 16px;
		right: 20px;
		z-index: 1;
		white-space: nowrap;
		cursor: pointer;
		font-size: 160%;
	}

	.score img {
		height: 18px
	} 
</style>