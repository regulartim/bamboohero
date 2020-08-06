<template>
	<div>
		<div
			v-for="e in suggestions"
			:key="e.id"
			style="text-align: left"
			> 
			<h3>{{ e.author }}:</h3>
			<p>{{ e.cardText }}</p>
			<p>{{ e.cardHelp }}</p>
			<p>{{ e.catText }}</p>
			<button @click="deleteSuggestion(id)">
				löschen
			</button>
			<hr>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				suggestions: []
			}
		},
		methods: {
			deleteSuggestion(id) {
				const firebaseId = this.suggestions[id].firebaseId;
				this.$http.delete("https://vuejs-6e7d1.firebaseio.com/data/" + firebaseId + ".json");
				delete this.suggestions[id];
			}
		},
		created(){
			this.$http.get("https://vuejs-6e7d1.firebaseio.com/data.json")
			.then(response => {
				return response.json();				
			})
			.then(data => {
				const resultArray = [];
				for (let key in data) {
					resultArray.push({
						firebaseId: key,
						author: data[key].author,
						cardText: data[key].cardText,
						cardHelp: data[key].cardHelp,
						catText: data[key].catText
					});
				}
				this.suggestions = resultArray;
			});
		}
	}
</script>