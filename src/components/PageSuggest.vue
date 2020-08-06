<template>
	<div>
		<p>Als grobe Orientierung, so stelle ich mir die Themenabdeckung der Karten vor:</p>
		<img src="@/assets/cards.png" alt="mindmap">
		<p>Vorschläge können hiervon aber auch gerne abweichen. 
		<br>Wichtig ist, dass sie:
			<br>-leicht verständlich sind,
			<br>-für möglichst viele Menschen durchführbar sind,
			<br>-und nur ins Ausnahmefällen Geld kosten.
		</p>

		<label for="">Kategorie</label>
		<select v-model="selected" @change="setCatText">
			<option 
				v-for="cat in categories"
				:key="cat.id"
				:value="cat.id"
				>
				{{ cat.name }}
			</option>
		</select>

		<br><br>
		<label>Kartentext</label><br>
		<textarea 
			v-model="suggestion.cardText"
			cols="50" 
			rows="10"
			>
		</textarea>

		<br><br>
		<label>Hilfetext</label><br>
		<textarea 
			v-model="suggestion.cardHelp" 
			cols="50" 
			rows="10"
			>
		</textarea>

		<br><br>
		<label>Kategorietext</label><br>
		<textarea 
			v-model="suggestion.catText" 
			cols="50" 
			rows="10"
			>
		</textarea>

		<br><br>
		<label>Author</label><br>
		<input 
			v-model="suggestion.author"
			type="text"
			>
		
		<br><br>
		<app-button
			btnColor="green"
			btnSymbol="save"
			@btnClicked="saveSuggestion">
			Speichern
		</app-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				id: parseInt(this.$route.params.id),
				categories: this.$store.state.cardCategories,
				selected: 0,
				suggestion: {
					cardText: "",
					cardHelp: "",
					catText: "",
					author: ""
				}
			}
		},
		methods: {
			saveSuggestion() {
				this.$http.post(
					"https://vuejs-6e7d1.firebaseio.com/data.json",
					this.suggestion
					)
				.then(() => {
					alert("Vorschlag wurde gesendet! Danke! :)");
					this.suggestion.cardText = "";
					this.suggestion.cardHelp = "";
					this.suggestion.author = "";
				}, error => {
					console.log(error);
					alert("Das hat leider nicht funktioniert... :(");
				});
			},
			setCatText(){
				let id = this.selected;
				this.suggestion.catText = this.$store.state.cardCategories[id].text;
			}
		},
		created() {
			if (!isNaN(this.id)) {
				const card = this.$store.getters.getCardById(this.id);
				this.suggestion.cardText = "ID:" + this.id + " - " + card.text;
				this.suggestion.cardHelp = card.helptext;
				this.selected = card.catId;
			}
			this.setCatText();


		}
	}
</script>

<style scoped>
	img {
		max-width: 100%
	}
</style>