<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Procurar"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Entre com iniciais para procurar"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Limpar</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filtrar por"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          description="Desmarque tudo para filtrar todos os campos"
          class="mb-0">
          <b-form-checkbox-group v-model="filterOn" class="mt-1">
            <b-form-checkbox value="numero_arvore">Nº Arvore</b-form-checkbox>
            <b-form-checkbox value="especie">Espécie</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>
      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="por Página"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select
            v-model="perPage"
            id="perPageSelect"
            size="sm"
            :options="pageOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col sm="7" md="6" class="my-1">
        <b-pagination
            v-model="page"
            :total-rows="this.totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
    <b-row>
    <b-table striped responsive="sm"
        caption-top
        ref="table"
        id="tab-Arvores"
        :busy="isBusy"
        :per-page="perPage"
        :items="arvores"
        :filterIncludedFields="filterOn"
        :current-page="page"
        :filter="filter"
        :fields="fields"
        @filtered="onFiltered"
        :style="{ width: '100%' }"
    >
      <template v-slot:table-caption>Total de árvores: {{ totalRows }}</template>
      <template v-slot:cell(acao)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}}
        </b-button>
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>DAP:</b></b-col>
            <b-col>{{ row.item.dap }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Altura:</b></b-col>
            <b-col>{{ row.item.altura }}</b-col>

            <b-col sm="3" class="text-sm-right"><b>Especie:</b></b-col>
            <b-col>{{ row.item.especie.nome }}</b-col>            
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Fuste:</b></b-col>
            <b-col>{{ row.item.fuste }}</b-col>

            <!-- <b-col sm="3" class="text-sm-right"><b>UT:</b></b-col>
            <b-col>{{ row.item.ut.numero_ut }}</b-col> -->
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Volume:</b></b-col>
            <b-col>{{ row.item.volume }}</b-col>
          </b-row>

          <b-button size="sm" @click="row.toggleDetails">Esconder</b-button>
        </b-card>
      </template>
      <template v-slot:cell(especie)="data">
        {{ data.item.especie.nome }}
      </template>
        <!-- <template v-slot:cell(ut)="data">
          {{ data.item.ut.numero_ut }}
        </template> --> -->
      <template v-slot:cell(situacao)="data">
        {{ data.item.situacao.nome }}
      </template>
    </b-table>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data () {
      return {
        isBusy: false,
        filter: null,
        filterOn: [],
        pageOptions: [5,10,20],
        page: null,
        perPage: 10,
        totalRows: null,
        fields: [
          { key: 'numero_arvore', label: 'Número Arvore', sortable: true, sortDirection: 'desc', class: 'text-center' },
        //   {
        //     key: 'isActive',
        //     label: 'is Active',
        //     formatter: (value, key, item) => {
        //       return value ? 'Yes' : 'No'
        //     },
        //     sortable: true,
        //     sortByFormatted: true,
        //     filterByFormatted: true
        //   },
          // { key: 'dap', label: 'DAP' },
          // { key: 'altura', label: 'Altura' },
          { key: 'especie', label: 'Espécie', sortable: true, sortDirection: 'desc' },
          // { key: 'ut', label: 'UT' },
          { key: 'longitude', label: 'Longitude' },
          { key: 'latitude', label: 'Latitude' },
          { key: 'situacao', label: 'Situação' },
          { key: 'acao', label: 'Ação'}
        ]
      }
    },

    computed: {
      ...mapGetters({
        poas: 'poas',
        especies: 'especies',
        situacoes: 'situacoes',
        uts: 'arvore/uts'
      })
    },

    methods: {
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    },
    watch:{
        'arvores' () {
          this.totalRows = this.arvores.length
        }
    },
  props: {
    arvores: {
    //   type: Array,
      required: true
    },
    
  },
//   watch: {
//       'page' () {
//         //   console.log(this.page)
//           this.$emit('pageLoad', this.page);
//       },
//       'perPage' () {
//           this.$emit('changePerPage', this.perPage);
//       }
//   }
};
</script>

<style scoped>

</style>
