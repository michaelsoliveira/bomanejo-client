<template>
    <section class="is-fullheight">
        <div class="container has-text-centered">
            <div class="column is-4 is-offset-4">
                <Notification 
                    :message="error"
                    v-if="error !== ''"
                    :notification="notification"
                    :closeNotification="checkNotification"
                />

                <div class="notification is-info" style="width: 100px;" v-if="$auth.$state.redirect">
                    You have to login before accessing to <strong>{{ $auth.$state.redirect }}</strong>
                </div>
                <!-- <h3 class="title has-text-info">Login</h3> -->
                <div class="box">
                    <figure class="avatar">
                        <img src="~/assets/imgs/user.png">
                    </figure>
                    <form action="" @submit.prevent="login">
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input class="input" type="email" placeholder="Email" 
                                    v-model="form.email" required>
                                <span class="icon is-small is-left">
                                    <i class="fa fa-envelope"></i>
                                </span>
                                <span class="icon is-small is-right">
                                    <i class="fa fa-check"></i>
                                </span>
                            </p>
                        </div>

                        <div class="field">
                            <p class="control has-icons-left">
                                <input class="input" type="password" placeholder="Password"
                                    v-model="form.password" required>
                                <span class="icon is-small is-left">
                                <i class="fa fa-lock"></i>
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <label class="checkbox">
                        <input type="checkbox">
                            Lebrar Senha
                        </label>
                        </div>
                        <button class="button is-block is-info is-fullwidth">Login</button>
                    </form>
                </div>
                <p class="has-text-grey">
                    <a href="../">Cadastre-se</a> &nbsp;&nbsp;
                    <a href="../">Esqueceu a Senha?</a> &nbsp;&nbsp;
                </p>
            </div>
        </div>
    </section>
</template>
<style scoped>
    .hero.is-success {
        background: #FFFFFF;
    }
    .hero .nav, .hero.is-success .nav {
        -webkit-box-shadow: none;
        box-shadow: none;
    }
    .box {
        margin-top: 70px;
    }
    .avatar {
        margin-top: -70px;
        padding-bottom: 20px;
    }
    .avatar img {
        padding: 5px;
        background: #fff;
        border-radius: 50%;
        -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
        box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
        width: 100px;
        height: 100px;
    }
    input {
        font-weight: 300;
    }

    p {
        font-weight: 700;
    }
    p.subtitle {
        padding-top: 1rem;
    }
</style>

<script>
import busyOverlay from '~/components/busy-overlay'
import Notification from '~/components/Notification'

export default {
    async created () {
        if (this.$auth.loggedIn){
            this.$router.push('/')
        }
    },


    components: {
        busyOverlay,
        Notification
    },

    data () {
        return {
            form: {
                email: '',
                password: ''
            },
            error: null,
            notification: false
        }
    },
    
    methods: {
        async login () {
            try {
                this.$toast.show('Logando...')
                await this.$auth.loginWith('local', {
                    data: this.form
                })
                this.$toast.success('Autentição Realizada com Sucesso!')
                this.notification = false;
                this.$router.push('/')
            } catch (e) {
                this.notification = true;
                this.error = e.response.data.errors.message
                this.$toast.error('Usuário ou senha inválidos!');
            }
        },        

        checkNotification(){
            this.notification = !this.notification;
            
        }
    }
}
</script>
