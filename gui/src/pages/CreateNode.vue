<template>
    <div>
        <input v-model="name" /><br/>
        <div class="btn btn-primary btn-xl" @click="create_node()">Создать ноду</div>

        <router-link to='/'>Home</router-link>
    </div>
</template>

<script>
export default {
    data(){return{
        name: 'mynode'
    }},

    methods: {
        create_node(){
            this.$api.call('create_node', {name: this.name}).then(r => window.console.log(r))
        }
    }
}
</script>