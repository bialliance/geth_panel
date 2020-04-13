<template>
	<div class="m-2 col-5 panel border border-primary float-left p-2" style="border-radius: 4px">
		<div><b>address</b>: {{node.wallet.address}}</div>
		<div><b>rpc</b>: {{node.rpcport}}</div>
		<div><b>cluster</b>: {{node.clusterport}}</div>
		<div class="p-0">
			<div class="btn btn-primary mr-1" @click="edit(node.wallet.address)">Edit</div>
			<div class="btn btn-danger mr-1" @click="remove(node.wallet.address)">Remove</div>
			<router-link :to="rpc_adr(node.wallet.address)" class="btn btn-success mr-1">RPC</router-link>
			<div class="btn btn-primary mr-1" @click="fork(node.wallet.address)">Fork</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["node"],

	data() {
		return {
			name: "mynode",
			nodes: []
		};
	},

	mounted() {
		// this.$api.get("/nodes").then(res => (this.nodes = res.data.data));
	},

	methods: {
		rpc_adr(adr) {
			return `/nodes/rpc/${adr}`;
		},

		edit(adr) {
			return adr;
			// this.$api.delete(`/nodes/${adr}`).then(res => (this.nodes = res.data.data));
		},

		remove(adr) {
            this.$api.modal({title: `Are you really wont delete node ${adr}`})
			this.$refs["modal"].show().then(() => { });
			return adr;
			// this.$api.delete(`/nodes/${adr}`).then(res => (this.nodes = res.data.data));
		}
	}
};
</script>

<style>
</style>