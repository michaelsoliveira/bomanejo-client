export const state = () => ({
    arvores: [],
    changed: false,
    poa: null,
    ut: null,
    situacao: null,
})

export const getters = {
    arvores (state) {
        return state.arvores
    },

    poa (state) {
        return state.poa
    },

    situacao (state) {
        return state.situacao
    },

    ut (state) {
        return state.ut
    },
    
    count (state) {
        return state.arvores.length
    },

    changed (state) {
        return state.changed
    },

    arvoresDetails(state, getters, rootState){
        return state.arvores.map(arvoreItem => {
            const situacao = rootState.situacoes.find((sit) => sit.id_situacao === arvoreItem.id_situacao)
            const especie = rootState.especies.find((esp) => esp.id_especie === arvoreItem.id_especie)
            return {
                id_arvore: arvoreItem.id_arvore,
                numero_arvore: arvoreItem.numero_arvore,
                latitude: arvoreItem.latitude,
                longitude: arvoreItem.longitude,
                dap: arvoreItem.dap,
                altura: arvoreItem.altura,
                volume: arvoreItem.volume,
                situacao: (typeof situacao === 'undefined' ? 
                            { id_situacao: null, nome: null }:
                            { id_situacao: situacao.id_situacao, nome: situacao.nome } 
                        ),
                especie: (typeof especie === 'undefined' ? 
                            { id_especie: null, nome: null } :
                            { id_especie: especie.id_especie, nome: especie.nome } 
                        )
            }
        })
    }
}

export const mutations = {
    SET_ARVORES (state, arvores) {
        state.arvores = arvores
    },

    SET_POA (state, poa) {
        state.poa = poa
    },

    SET_SITUACAO (state, situacao){
        state.situacao = situacao
    },
    
    SET_UT (state, ut) {
        state.ut = ut
    },

    SET_CHANGED (state, changed) {
        state.changed = changed
    }
}

export const actions = {
    async getArvores ({ commit, state, getters, rootState }) {
        console.log(rootState.dbSelected)
        let response = await this.$axios.$get('arvores', {
            params: {
                database: rootState.dbSelected,
                poa: state.poa,
                situacao: state.situacao,
                ut: state.ut
            }
        })
        commit('SET_ARVORES', response.data)
        
        return response
    },

    async setPoa({dispatch, commit}, data){
            commit('SET_POA', data)

            dispatch('getArvores')
    },

    async setSituacao({ dispatch, commit }, data){
        commit('SET_SITUACAO', data)

        dispatch('getArvores')
    },

    async setUt({dispatch, commit}, data){
            commit('SET_UT', data)

            dispatch('getArvores')
    },

    async destroy ({ dispatch }, arvoreId) {
        let response = await this.$axios.$delete(`arvore/${arvoreId}`)
        
        dispatch('getArvores')
    },

    async update ({ dispatch }, arvoreId) {
        let response = await this.$axios.$patch(`arvore/${arvoreId}`)
        
        dispatch('getArvores')
    },

    async store ({ dispatch }, arvores) {
        if (!this.$auth.loggedIn){
            this.$toast.error("É necessário logar no sistema")
        } else {
            try{
                let response = await this.$axios.$post('arvore', {
                    arvores
                });
            }catch(e){
                this.$toast.error("Erro tentando adicionar item ao carrinho!")
            }
            
            dispatch('getArvores')
        }
    }
}