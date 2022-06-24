<template>
    <div class="container">
        <div class="col-md-6 offset-md-3">
            <div class="card mt-4">
                <div class="card-header">
                    <p>Register</p>
                </div>
                <div class="card-body">
                    <b-form @submit.prevent="register">
                    <div class="form-group">
                        <label for="Nome">Nome</label>
                        <input v-model="form.name" type="text" class="form-control" placeholder="Entre com o nome">
                    </div>
                    <div class="form-group">
                        <label for="Email">Email</label>
                        <input v-model="form.email" type="email" class="form-control" placeholder="Entre com o email">
                    </div>
                    <div class="form-group">
                        <label for="Senha">Senha</label>
                        <input v-model="form.password" type="password" class="form-control" placeholder="Entre com a senha">
                    </div>
                    <b-form-group>
                        <b-button type="submit" variant="primary">Cadastrar</b-button>
                    </b-form-group>
                    </b-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            async register(){
                await this.$axios.post('/auth/register', this.form);

                this.$auth.login({data: this.form});

                this.$router.push({name: 'index'});
            }
        }
    }
</script>