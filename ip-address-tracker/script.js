const app = Vue.createApp({
  data() {
    return {
      map: null,
      ipInputField: '',
      ipData: {
        ip: '8.8.8.8',
        location: {
          country: 'US',
          timezone: '-08:00',
          city: 'Mountain View',
          postalCode: '94035',
        },
        isp: 'Google LLC'
      },
      isLoading: false,
      marker: null,
      markerIcon: L.icon({
        iconUrl: './images/icon-location.svg',
        iconSize: [30, 35],
        iconAnchor: [30, 35],
      })
    }
  },
  mounted() {
    this.createMap()
    // this.addMarker(37.38605, -122.08385, '8.8.8.8')
    // this.goToLocation(37.38605, -122.08385)
  },
  methods: {
    searchIp() {
      this.isLoading = true

      fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_OBrf3swuhqKfZ97HrJ8a0OdJTHzVI&ipAddress=${this.ipInputField}`)
        .then(response => response.json())
        .then(response => {
          this.ipData = response

          this.marker && this.marker.remove()

          this.addMarker(response.location.lat, response.location.lng, response.ip)
          this.goToLocation(response.location.lat, response.location.lng)
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    goToLocation(latitude, longitude) {
      this.map.flyTo([latitude, longitude], 17)
    },
    addMarker(latitude, longitude, ip) {
      this.marker = L.marker(
        [latitude, longitude],
        {
          icon: this.markerIcon,
          title: `Marker for the IP location: "${ip}"`,
          alt: `Marker for the IP location: "${ip}"`,
          riseOnHover: true
        }
      )

      this.marker.addTo(this.map)
    },
    createMap() {
      this.map = L.map('map', {
        center: [51.505, -0.09], // Center London
        zoom: 13,
        preferCanvas: true,
        zoomControl: false,
        boxZoom: false,
        dragging: true,
        doubleClickZoom: false
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        boxZoom: false,
        maxZoom: 22,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
      }).addTo(this.map)
    }
  }
})

app.component('loader', {
  template: `
    <div class="lds-wrapper">
      <div class="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  `
})

app.mount('#app')
