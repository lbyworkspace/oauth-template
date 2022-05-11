<template>
    <div class="wrap">
        <el-form class="poa bgf" :model="loginForm" :rules="formRules" ref="form">
            <el-form-item>
                <div class="title tc fwb">模版后台系统</div>
            </el-form-item>
            <el-form-item prop="username">
                <el-input v-model="loginForm.username" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="loginForm.password" :show-password="true" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :loading="loading" type="success" @click.prevent="submitForm" native-type="submit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            loginForm:{
                username:'',
                password:''
            },
            formRules:{
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
            },
            loading:false,
            redirect: undefined,
            otherQuery: {}
        }
    },
    watch: {
        $route: {
        handler: function(route) {
            const query = route.query
            if (query) {
            this.redirect = query.redirect
            this.otherQuery = this.getOtherQuery(query)
            }
        },
        immediate: true
        }
    },
    methods:{
        getOtherQuery(query) {
            return Object.keys(query).reduce((acc, cur) => {
                if (cur !== 'redirect') {
                acc[cur] = query[cur]
                }
                return acc
            }, {})
        },
        submitForm(){
            this.$refs.form.validate((valid)=>{
                if (valid) {
                  this.loading = true
                  this.$store.dispatch('user/login', this.loginForm)
                  .then(() => {
                    this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                    this.loading = false
                  }).catch((err) => {
                    console.log(err)
                    this.loading = false
                  })
                } 
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.wrap{
    background-color: #444444 !important;
    height: 100vh;
    .el-form{
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 360px;
        border-radius: 4px;
        height: 290px;
        padding: 35px 40px 50px;
        .title{
            font-size: 26px;
            color: #444;
            font-family: "微软雅黑",Arial,Helvetica,sans-serif;
        }
        .el-button{
            width: 280px;
            background: linear-gradient(#5b9cf8,#4f8fe9);
            box-shadow: inset 0 1px 2px #5b9cf8;
            text-shadow: #5b9cf8 0 -1px 0;
            &:active{
                background: linear-gradient(#5b9cf8,#3f87ec);
            }
        }
        .el-button--success{
            border: none;
        }
        /deep/ .el-input__inner{
            &:focus{
                border: 1px solid #5b9cf8;
            }
        }
    }
}
</style>