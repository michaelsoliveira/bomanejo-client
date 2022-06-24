<template>
    <b-container>
        <b-row>
            <b-col lg="6">
                <b-form-group
                label="Projeto"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                label-for="projeto"
                class="mb-0"
                >
                    <b-form-select
                    v-model="databaseSelected"
                    :options="options"
                    class="mb-3"
                    value-field="dbname"
                    text-field="dbname"
                    >
                        <template v-slot:first>
                            <option :value="null">-- Selecione um projeto --</option>
                        </template>
                    </b-form-select>
                </b-form-group>
                </b-col>
                <b-col lg="6" v-if="databaseSelected">
                <b-form-group
                label="POA"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                label-for="POA"
                class="mb-0"
                >
                    <b-form-select
                    v-model="poa"
                    :options="poas"
                    class="mb-3"
                    value-field="id_poa"
                    text-field="descricao"
                    >
                        <template v-slot:first>
                            <option :value="null">-- Selecione um POA --</option>
                        </template>
                    </b-form-select>
                </b-form-group>
                </b-col>
            </b-row>
            <b-row v-if="databaseSelected">
            <b-col lg="6">
                <b-form-group
                label="Situação"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                label-for="Situacao"
                class="mb-0"
                >
                    <b-form-select
                    v-model="situacao"
                    :options="situacoes"
                    class="mb-3"
                    value-field="id_situacao"
                    text-field="nome"
                    >
                        <template v-slot:first>
                            <option :value="null">-- Selecione uma Situação --</option>
                        </template>
                    </b-form-select>
                </b-form-group>
                </b-col>
                <b-col lg="6" v-if="poa">
                <b-form-group
                label="UT"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                label-for="UT"
                class="mb-0"
                >
                    <b-form-select
                    v-model="ut"
                    :options="uts"
                    class="mb-3"
                    value-field="id_ut"
                    text-field="numero_ut"
                    >
                        <template v-slot:first>
                            <option :value="null">-- Selecione uma UT --</option>
                        </template>
                    </b-form-select>
                </b-form-group>
                </b-col>
            </b-row>
    </b-container>
</template>

<script>    
    import { mapGetters, mapActions } from 'vuex'

    export default {
        data() {
            return {
                
                databaseSelected: null,
                ut: null,
                poa: null,
                situacao: null
            }
        },

        methods: {
            ...mapActions({
                setDatabase: 'setDatabase',
                getArvores: 'arvore/getArvores',
                setPoa: 'arvore/setPoa',
                setUt: 'arvore/setUt',
                setSituacao: 'arvore/setSituacao',
                setUts: 'setUts'
            })
        },

        computed: {
            ...mapGetters({
                options: 'databases',
                poas: 'poas',
                uts: 'uts',
                arvoresDetails: 'arvore/arvoresDetails',
                situacoes: 'situacoes'
            })
        },
        watch: {
            'databaseSelected'() {
                this.ut = null;
                this.poa = null;
                this.situacao = null;
                this.state = {...this.state, 'arvore/arvoresDetails': []}
                this.setDatabase(this.databaseSelected);
                this.$emit('inputDatabase', this.databaseSelected);
            },
            'poa' () {
                this.ut = null;
                this.setPoa(this.poa)
                // this.$emit('inputPoa', this.poa)
                this.setUts({database: this.databaseSelected, poa: this.poa})
            },
            'situacao' () {
                this.setSituacao(this.situacao)
            },
            'ut' () {
                this.setUt(this.ut)
            }
        }
    }
</script>