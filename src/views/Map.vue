<template lang="pug">
  .map
    preloader.map__preloader(v-if="isLoading" :size="50" line-bg-color="#eaeaea" line-fg-color="#b12726")
    .map__view(:style="viewStyle")
      .map__container(ref="map" style="width: 100%; height: 580px;")
      .map__employees.employees
        .employee(v-for="(user, i) in users")
          .employee__avatar
            img(:src="user.avatar")
          .employee__name {{ `${user.lastName} ${user.firstName} ${user.patronymic}` }}
          .employee__marker(v-html="markers[i]")
</template>

<script>
import { mapState } from "vuex";
import "here-js-api/scripts/mapsjs-core";
import "here-js-api/scripts/mapsjs-service";
import "here-js-api/scripts/mapsjs-ui";
import "here-js-api/scripts/mapsjs-mapevents";
import "here-js-api/scripts/mapsjs-clustering";
import Preloader from 'vue-simple-spinner';
import * as feather from "feather-icons";

const getMarkerByColor = (color) =>
  `<svg enable-background="new 0 0 20.961 26.25" height="26.25px" id="Capa_1" version="1.1" viewBox="0 0 20.961 26.25" width="20.961px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <path fill="${color}" d="M20.961,10.481C20.961,4.692,16.27,0,10.481,0C4.692,0,0,4.692,0,10.481c0,1.036,0.153,2.036,0.433,2.983  C1.925,19.5,10.528,26.25,10.528,26.25s9.718-7.623,10.291-13.911l-0.023-0.005C20.902,11.732,20.961,11.114,20.961,10.481z   M10.624,12.815c-2.368,0-4.288-1.92-4.288-4.288c0-2.368,1.92-4.288,4.288-4.288c2.367,0,4.287,1.92,4.287,4.288  C14.91,10.895,12.991,12.815,10.624,12.815z"/>
  </svg>`;

export default {
  name: "Map",
  components: {
    Preloader,
  },
  data() {
    return {
      isLoading: true,
      colors: ["#23b2f4", "#c69326", "#de4241", "#75b45c", "#8215e7"]
    };
  },
  computed: {
    ...mapState({
      users: state => state.users
    }),
    viewStyle() {
      return { opacity: this.isLoading ? 0 : 1 };
    },
    markers() {
      return this.colors.map(getMarkerByColor);
    }
  },
  async mounted() {
    await this.$store.dispatch("getCombinations");

    const platform = new H.service.Platform({
      app_id: "WrRxwrtpbzvxLHrOpHyw",
      app_code: "piJRCl5pH_GmE9birwhupg",
      ml: "rus",
      useHTTPS: true
    });

    const pixelRatio = window.devicePixelRatio || 1;
    const defaultLayers = platform.createDefaultLayers({
      tileSize: pixelRatio === 1 ? 256 : 512,
      ppi: pixelRatio === 1 ? undefined : 320,
      lg: "RUS"
    });

    this.$refs.map.addEventListener('DOMNodeInserted', () => {
      clearTimeout(this.$options.timer);
      this.$options.timer = setTimeout(() => {
        this.isLoading = false;
      }, 500);
    });


    const map = new H.Map(
      this.$refs.map,
      defaultLayers.normal.map,
      {
        center: new H.geo.Point(55.75370903771494, 37.619813382625585),
        zoom: 6,
        pixelRatio: pixelRatio
      }
    );
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    map.setCenter({ lat: 55.75370903771494, lng: 37.619813382625585 });
    map.setZoom(10);

    const markers = [];

    this.$store.state.combinations.forEach((combination, idx) => {
      const userIndex = this.users.findIndex((user) => user.id === combination.user.id);
      const icon = new H.map.Icon(this.markers[userIndex]);

      combination.contracts.forEach(contract => {
        markers.push(
          new H.map.Marker(
            {
              lat: parseFloat(contract.latitude),
              lng: parseFloat(contract.longitude)
            },
            {
              icon
            }
          )
        );
      });
    });

    markers.forEach(marker => {
      map.addObject(marker);
    });
  }
};
</script>

<style lang="scss" scoped>
.map {
  &__view {
    display: flex;
    justify-content: space-between;
    transition: opacity .3s ease;
  }

  &__preloader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  &__container {
    flex-grow: 1;
  }

  &__employees {
    margin-left: 40px;
    width: 330px;
  }

  .employees {
    flex-shrink: 0;
    background: white;
    padding: 10px 30px;
    border-radius: 10px;
  }
}
.employee {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #dedede;
  &:last-child {
    border-bottom: none;
  }
  &__avatar {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
    }
  }
  &__marker {
    margin-left: auto;
    margin-right: 0;
  }
}
</style>
