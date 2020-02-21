<template>
	<div>
		<router-link to='/nodes'>Create node</router-link>
		<div v-for="n in nodes" :key="n.wallet.address" class="m-2">
            <div>{{n.wallet.address}}</div>
            <div>rpc: {{n.rpcport}}</div>
            <div>cluster: {{n.clusterport}}</div>
            <div class="btn btn-primary">Edit</div>
            <div class="btn btn-primary">Remove</div>
            <router-link :to="rpc_adr(n.wallet.address)" class="btn btn-success">RPC</router-link>
        </div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			name: "mynode",
			nodes: []
		};
	},

	mounted() {
		this.$api.get("/nodes").then(res => (this.nodes = res.data.data));
    },

    methods:{
        rpc_adr(adr){
            return `/nodes/rpc/${adr}` 
        }
    }
};
</script>

<style>
</style>