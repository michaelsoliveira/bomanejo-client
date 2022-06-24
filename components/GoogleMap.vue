<template>
    <client-only>
        <gmap-map
            ref="googleMap"
            :center="locations.length > 0 ? 
                {lat: parseFloat(locations[0].latitude), lng: parseFloat(locations[0].longitude)} : 
                center"
            :zoom="6"
            map-type-id="terrain"
            style="width: 100%; height: 400px"
            >
            <gmap-cluster ref="cluster"
                :gridSize="30"
                :maxZoom="50" 
                :zoomOnClick="true" 
                :minimumClusterSize="10"
            >
                <gmap-marker
                    ref="markers"
                    :key="index"
                    v-for="(loc, index) in locations"
                    :position="{lat: parseFloat(loc.latitude), lng: parseFloat(loc.longitude)}"
                    :clickable="true"
                    :draggable="true"
                    @click="toggleInfoWindow(loc,index)"
                />
            </gmap-cluster>
            <gmap-info-window
                :options="infoOptions"
                :position="infoWindowPos"
                :opened="infoWinOpen"
                @closeclick="infoWinOpen=false"
            >
                <div v-html="infoContent"></div>
            </gmap-info-window>    
            
            </gmap-map>
        </client-only>
            
</template>
<script>
    export default {
        data(){
            return{
                infoContent: '',
                infoWindowPos: {
                lat: 0,
                lng: 0
                },
                infoWinOpen: false,
                currentMidx: null,
                //optional: offset infowindow so it visually sits nicely on top of our marker
                infoOptions: {
                pixelOffset: {
                        width: 0,
                        height: -35
                    }
                },
                center: { lat: -1.9, lng: -56.5 },
                pins: {
                    selected: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB...',
                    notSelected: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAM...'
                },
            
                mapStyle: [
                 
                ],
            
                currentLocation: {}
            }
        },
        props: {
            locations: {
                required: true,
                type: Array
            }
        },
        mounted(){
            
            this.$nextTick(() => {
                //set bounds of the map
                console.log(this.$refs.googleMap)
                // this.$refs.googleMap.$mapPromise.then((map) => {
                //     const bounds = new google.maps.LatLngBounds()
                //     for (let m of this.markers) {
                //         bounds.extend(m.position)
                //     }
                //     map.fitBounds(bounds);
                // });

            });
        },
        methods: {
            toggleInfoWindow: function (marker, idx) {
                this.infoWindowPos = {lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude)};
                this.infoContent = this.getInfoWindowContent(marker);
                

                //check if its the same marker that was selected if yes toggle
                if (this.currentMidx == idx) {
                this.infoWinOpen = !this.infoWinOpen;
                }
                //if different marker set infowindow to open and reset current marker index
                else {
                this.infoWinOpen = true;
                this.currentMidx = idx;
                }
            },

            getInfoWindowContent: function (marker) {
                return (`<div class="card">
                    <div class="card-image">
                        <figure class="image is-4by3">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="card-content">
                    <div class="media">
                    <div class="media-content">
                        <p class="title is-4">Nº Arvore: ${marker.numero_arvore}</p>
                    </div>
                    </div>
                    <div class="content">
                    [Lat, Long]: [${marker.latitude}, ${marker.longitude}]
                    </div>
                </div>
                </div>`);
            },
            }
    }
</script>