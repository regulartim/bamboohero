<template>
	<div>			
		<h1>Load</h1>
		<div>
			<input 
				v-model="str" 
				type="text" 
				size="30" 
				placeholder="Please enter your ProgressID">
		</div>
		<div v-if="str">
			<div v-if="validProgressId(str)">
				<p>
					Do you really want to load this game?
				</p>
				<p>
					Bamboo collected:
					<span class="green-text"> 
						{{ scoreData.score }}
					</span>
				</p>
				<p>
					Rank:
					<span class="green-text">
						{{ scoreData.rank }}
					</span>
				</p>
				<app-button
					btnColor="blue"
					btnSymbol="upload"
					@btnClicked="loadFromProgressId(completedArray)">
					load
				</app-button>
			</div>
			<div v-else>
				<p>Sorry, this ID is invalid.</p>
			</div>
		</div>			
	</div>
</template>

<script>
	export default {
		data () {
			return {
				// String, that was transmittet via URL
				urlInput: this.$route.params.string
			}
		},
		computed: {
			// The string we are working with
			str: {
				get() {
					return this.urlInput;
				},
				set(value) {
					this.urlInput = value;
				}
			},

			// String, converted to a 'completed'-array
			completedArray() {
				return this.decodeProgressId(this.str);
			},

			// Game data, calculated from 'completed'-array
			scoreData() {
				return this.getScoreData(this.completedArray);
			}			
		},
		methods: {			
			// Load score from progressId
			loadFromProgressId(data) {
				this.$store.dispatch('loadFromProgressId', data);
				this.goTo("Welcome");
			}		
		}
	}
</script>