<template>
    <div class="container">
    <GoogleMap 
          :locations="locations"
        />

        <Database 
          @inputDatabase="getInputDatabase"
        />

        <Arvore 
          :arvores="arvores"
        />
    </div>
  
</template>

<script>
 
import GoogleMap from '@/components/GoogleMap'
import Arvore from '@/components/Arvore'
import { mapActions, mapGetters } from 'vuex'
import Database from '@/components/Database'

export default {
  components: {
    GoogleMap,
    Arvore,
    Database
  },
  data() {
    return {
      // locations: [],
      database: ''
    };
  },

  computed: {
        ...mapGetters({
            dbSelected: 'dbSelected',
            poa: 'arvore/poa',
            ut: 'arvore/ut',
            locations: 'arvore/arvores',
            arvores: 'arvore/arvoresDetails'
        })
    },


  methods: {
    ...mapActions({
      setPoas: 'setPoas',
      setEspecies: 'setEspecies',
      setSituacoes: 'setSituacoes'
    }),
    getInputDatabase(value){
      this.database = value;
      this.setPoas(value);
      this.setSituacoes(value);
      this.setEspecies(value);
    }
  },
};
</script>

<style scoped>
  .container {
    padding-top: 10px
  }
</style>
