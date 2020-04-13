<template>
	<div>
		<router-link to='/nodes' class="btn btn-primary">Create node</router-link>

        <div v-for="n in nodes" :key="n.wallet.address" class="m-0">
            <NodeBlock :node='n'></NodeBlock>
        </div>
	</div>
</template>

<script>

import NodeBlock from '../components/NodeBlock'

export default {
	data() {
		return {
			nodes: []
		};
	},

	mounted() {
		this.$api.get("/nodes").then(res => (this.nodes = res.data.data));
    },

    components: {
        NodeBlock
    }
};
</script>

<style>
</style>