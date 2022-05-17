<template>
    <div class="wrap">
        user1
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    created(){
        this.$apis.getAllUser().then(res=>{
            console.log(res)
        })
    }
}
</script>

<style lang="scss" scoped>

</style>
