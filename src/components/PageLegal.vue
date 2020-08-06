<template>
	<div>
		<div class="text-align-left">
			
			<h2>Imprint</h2>
			<p>
				Tim Leonhard<br>
				Bergwies 29<br>
				66887 Jettenbach<br>
				Email: mail ( at ) bamboohero ( dot ) org
			</p>
			
			<h2>Privacy information</h2>
			<p>
				We take data protection very seriously. Your ip address, which our webserver needs to send you the page, will be written anonymously into the log file. Everything else you do on this page happens exclusively on your device. No personal data is send to any server. 
			</p>
			
			<h2>Technical information</h2>
			<p>
				{{ sitename }} is made with the awesome 
				<a 
					href="https://vuejs.org"
					target="_blank">
					Vue.js
				</a>
				JavaScript framework and the 
				<a 
					href="https://github.com/vuejs-templates/pwa"
					target="_blank">
					vue-pwa-boilerplate 
				</a>
				template.
			</p>
			<p>
				{{ sitename }} is hosted by 
				<a 
					href="https://www.manitu.de/"
					target="_blank">
					manitu
				</a>
				- one of the first hosting companies in Germany that powers its entire data center and its offices exclusively with electricity from 100% renewable energy sources.
			</p>
			<p>
				Graphics and icons were made by 
				<a 
					href="https://www.shutterstock.com/de/g/coffeemill/"
					target="_blank">
					Coffeemill
				</a>
				and
				<a 
					href="https://fontawesome.com/"
					target="_blank">
					Font Awesome
				</a>
				.
			</p>
			<h2>Thanks to everyone who supported this project!</h2>
			<p>
				Credits to
				Felix,
				<a 
					href="https://www.xing.com/profile/Florian_Wild17"
					target="_blank">
					Florian,
				</a>
				<a 
					href="https://www.instagram.com/marie_veganstudent/"
					target="_blank">
					Marie,
				</a>
				Michaela
				and Valerie
			</p>
		
		</div>

		<div 
			v-if="showChangelog"
			class="text-align-left">
			<h2>Changelog</h2>
			<h3>1.0.4</h3>
			<ul>
				<li>Updated npm packages</li>
			</ul>
			<h3>1.0.3</h3>
			<ul>
				<li>Updated npm packages</li>
				<li>Prerendering implemented for better search engine friendliness</li>
				
			</ul>
			<h3>1.0.2</h3>
			<ul>
				<li>Using native PWA installation abilities if browser is capable</li>
				<li>Installation instructions added for other browsers</li>
				<li>Changelog added</li>
			</ul>
			<h3>1.0.1</h3>
			<ul>
				<li>Animations changed for better compatibility with Safari on iOS</li>
				<li>Second rank renamed to "playful panda"</li>
			</ul>
			<h3>1.0.0</h3>
			<ul>
				<li>Initial release</li>
			</ul>
		</div>

		<div 
			class="bangers green-text version-nr"
			@click.prevent="showChangelog = !showChangelog">
			version {{ $store.state.versionNumber }}
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				showChangelog: false
			}
		}
	}
</script>

<style scoped>
	h3 {
		padding-left: 10px;
	}

	.version-nr {
		text-decoration: underline; 
		cursor: pointer
	}
</style>