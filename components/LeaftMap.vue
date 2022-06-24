<template>
  <div style="height: 600px;width:100%;">
    {{ coordenadas }}
    <client-only>
      <l-map :zoom="zoom" :center="center" style="height: 600px;width:100%">
        <l-tile-layer :url="url"
        :subdomains="subdomains"></l-tile-layer>
        <div v-if="coordenadas">
          <l-marker
            v-for="item in coordenadas"
            :key="item.numero_arvore"
            :lat-lng="[item.latitude, item.longitude]"
          >
            <l-popup
              :content="'Número da arvore: ' + item.numero_arvore"
              :options="{
                  autoClose: false
                }"
            ></l-popup>
          </l-marker>
          <l-marker :lat-lng="markerPos"><l-popup
              :content="'teste'"
              :options="{
                  autoClose: false
                }"
            ></l-popup></l-marker>
        </div>
      </l-map>
    </client-only>
  </div>
</template>
<script>

const centerMapDefault = [-2.08499685, -52.99070112488];

export default {

  name: 'MyMap',

  data() {
    return {
      zoom: 8,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      markerPos: [-2.08499685, -52.99070112488],
      subdomains: ['mt0','mt1','mt2','mt3']
    }
  },
  props: {
      coordenadas: {
          required: true,
          type: Array
      }
    },
  computed: {
    center() {
      return this.state && this.state.items.length
        ? this.state.items[0]._geoloc
        : centerMapDefault;
    },
  },
  mounted() {
    // Accessing leaflet API methods according to
    // @link https://korigan.github.io/Vue2Leaflet/#/quickstart?id=accessing-leaflet-api

    this.$nextTick(() => {
      
      // if (typeof this.$refs.mapRef !== 'undefined') {
      //   this.map = this.$refs.mapRef.mapObject;
      //   this.map.zoomControl.remove();
        
        // this.map.center(centerMapDefault);
      // }
    });

    // state is null
    // for (let item of this.state.items) {
    //  item.icon = this.defaultIcon;
    // }
  },
};
</script>