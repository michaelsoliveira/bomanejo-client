export const state = () => ({
    databases: [],
    poas: [],
    especies: [],
    situacoes: [],
    uts: [],
    dbSelected: null
})

export const getters = {
    databases (state) {
        return state.databases
    },

    poas (state) {
        return state.poas
    },

    especies (state) {
        return state.especies
    },

    uts (state) {
        return state.uts
    },

    situacoes (state) {
        return state.situacoes
    },

    dbSelected (state) {
        return state.dbSelected
    }
}

export const mutations = {
    SET_DATABASES (state, databases) {
        state.databases = databases
    },

    SET_DATABASE (state, dbSelected) {
        state.dbSelected = dbSelected
    },

    SET_POAS (state, poas) {
        state.poas = poas
    },

    SET_ESPECIES(state, especies){
        state.especies = especies
    },

    SET_UTS(state, uts){
        state.uts = uts
    },
    
    SET_SITUACOES(state, situacoes){
        state.situacoes = situacoes
    }
}

export const actions = {
    async nuxtServerInit({ dispatch, commit }, { req }) {
        // if (this.$auth.loggedIn) {
        //     await dispatch('arvore/getArvores')
        // }
            await this.$axios.$get('database')
            .then(response => {
                commit('SET_DATABASES', response.data)
            })
            .catch(e => {
                console.log(e.message)
            })
    },

    setDatabase({commit}, data){
        commit('SET_DATABASE', data)
    },

    async setPoas({commit}, data){
        await this.$axios.$get('poa', {
            params: {
                database: data
            }
        })
        .then(response => {
            commit('SET_POAS', response.data)
        })
        .catch(e => {
            console.log(e.message)
        })
    },

    async setUts({commit},  data ){
        await this.$axios.$get('ut', {
            params: {
                database: data.database,
                poa: data.poa
            }
        })
        .then(response => {
            commit('SET_UTS', response.data)
        })
        .catch(e => {
            console.log(e.message)
        })
    },

    async setEspecies({commit}, data){
        let response = await this.$axios.$get('especie', {
            params: {
                database: data
            }
        })
        .then(response => {
            
            commit('SET_ESPECIES', response)
        })
        .catch(e => {
            console.log(e.message)
        })
    },

    async setSituacoes({commit}, data){
        await this.$axios.$get('situacao', {
            params: {
                database: data
            }
        })
        .then(response => {
            commit('SET_SITUACOES', response)
        })
        .catch(e => {
            console.log(e.message)
        })
    }
}