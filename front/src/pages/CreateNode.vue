<template>
    <div>
        <input v-model="name" /><br/>
        <div class="btn btn-primary btn-xl" @click="create_node()">Создать ноду</div>

        {{nodes}}
        <router-link to='/'>Home</router-link>
    </div>
</template>

<script>
export default {
    data(){return{
        name: 'mynode',
        nodes: []
    }},

    mounted(){
        this.$api.get('/nodes').then(res => this.nodes = res.data.data)
    },

    methods: {
        create_node(){
            this.$api.call('create_node', {name: this.name}).then(r => window.console.log(r))
        }
    }
}
</script>