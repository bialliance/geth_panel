<template>
	<div>
		NodeRPC {{node.wallet.address}} {{error}}
		<br />Method
		<input v-model='method' />
		<br />Params
		<textarea v-model='params'></textarea>
		<br />

		<div class="btn btn-primary" @click="send()">Send</div>
		<router-link to="/" class="btn btn-secondary">Home</router-link>

		<div class="border"><b>ANSWER</b>:<br>{{ans}}</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			name: "mynode",
			nodes: [],
			node: {},
			ans: "",

			method: '',
			params: '',
			error: ''
		};
	},

	methods: {
		send() {
			var json = {"jsonrpc":"2.0","method":this.method,"params": JSON.parse(this.params), "id": 1}
			// this.error = json

			this.$api
				.post("/nodes/" + this.$route.params.id + "/rpc", {json: json})
				.then(res => (this.ans = res.data.data));
		}
	},

	mounted() {
		this.$api
			.get("/nodes/" + this.$route.params.id)
			.then(res => (this.node = res.data.data));
	}
};
</script>

<style>
</style>