<template>
	<div>{{error}}
		<div>NodePage</div>
		<div class="btn btn-primary" @click="save()">Save</div>
		<div class="btn btn-secondary" @click="cancel()">Cancel</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			name: "mynode",
			nodes: [],
			error: ''
		};
	},

	mounted() {
		this.$api.get("/nodes").then(res => (this.nodes = res.data.data));
	},

	methods:{
		save(){
			this.$api.post("/nodes").then(() => {
				// (this.nodes = res.data.data)
				this.$router.push('/')
			}).catch(ex => this.error = ex);
			
		},

		cancel(){
			this.$router.push('/')
		}
	}
};
</script>

<style>
</style>