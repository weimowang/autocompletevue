<template>
  <div>
    <h1 class="title">google map autocomplete</h1>
    <div class="testwrap">
      <div class="top">
        <input type="text" id="pacInput" ref="site" />
      </div>
      <div id="map"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      map: "",
      place: "",
    };
  },
  methods: {
    initmap() {
      this.map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 25.0476133, lng: 121.5174062 },
        zoom: 13,
      });
      let marker = new window.google.maps.Marker({
        map: this.map,
        position: { lat: 25.0476133, lng: 121.5174062 },
      });
      marker.setMap(this.map);
    },
    g_autocomplete() {
      let _map = this.map;
      const options = {
        componentRestrictions: { country: "tw" },
        fields: ["formatted_address", "geometry", "name"],
      };

      const autocomplete = new window.google.maps.places.Autocomplete(
        this.$refs.site,
        options
      );

      autocomplete.addListener("place_changed", () => {
        this.place = autocomplete.getPlace();
        //回來資料沒有經緯度
        if (!this.place.geometry || !this.place.geometry.location) {
          alert("it's not exist");
          return;
        }
        if (this.place.geometry) {
          //資料有經緯度
          console.log("location : " + JSON.stringify(this.place.geometry));
          _map.setCenter(this.place.geometry.location);
          _map.setZoom(17);

          let marker = new window.google.maps.Marker({
            map: _map,
            position: this.place.geometry.location,
          });
          marker.setVisible(true);
          marker.setMap(_map);

          let infowindow = new window.google.maps.InfoWindow({
            content: this.place.formatted_address,
          });
          infowindow.open(_map, marker);
        }
      });
    },
  },
  mounted() {
    this.initmap();
    this.g_autocomplete();
  },
};
</script>
<style scoped>
#map {
  margin-top: 1em;
  width: 640px;
  height: 480px;
}
.title {
  color: rgb(1, 76, 141);
  text-align: center;
}
.testwrap {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  align-items: center;
  align-content: center;
}
.testwrap .top,
.testwrap .bottom {
  width: 100%;
  margin: auto 0;
}

.testwrap .top input {
  width: 100%;
  margin: 0 auto;
  align-items: center;
}
</style>
