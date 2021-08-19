<template>
  <div class="w-full h-full bg-gradient-to-b from-blue-300 via-green-200 to-purple-300">
    <header class="fixed flex items-center justify-between w-full p-2 border-b-4 border-red-200 bg-gradient-to-b from-blue-400 h-28">
      <h1 class="w-full text-6xl text-center text-green-800 transition duration-500 ease-in-out cursor-pointer hover:text-white">
        WeatherApp
      </h1>
      <Burger/>
    </header>
    <Bar>
     <ul class="sidebar-panel-nav">
       <li><a href="#home">Home</a></li>
       <li><a href="#about">About</a></li>
       <li><a href="#contact">Contact</a></li>
     </ul>
   </Bar>
    <div class="grid h-screen grid-cols-4 pt-28 justify-items-stretch">
      <nav id="scrollable" class="h-full overflow-y-scroll">
      <ul class="flex-col justify-between w-full col-span-1 ">
        <div v-for="city in tab" :key="tab.indexOf(city)" class="w-full py-2">
          <div v-on:click="focusto(city)" class="relative flex items-center justify-center w-full overflow-hidden text-white transition duration-500 ease-in-out border-2 shadow-md cursor-pointer h-44 lg:h-96 hover:border-gray-900 rounded-3xl hover:text-transparent">
            <h1 class="absolute text-3xl uppercase lg:text-6xl">{{city.name}}</h1>
            <img class="object-cover w-full h-full shadow-lg" :src="city.img">
          </div>
        </div>
      </ul>
      </nav>
      <div v-if="loading" class="flex justify-center w-auto col-span-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="animate-spin h-48 w-48 mr-3 ..." fill="none" viewBox="0 0 24 24" stroke="white">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <div v-else class="flex-col col-span-3 pt-6 mx-6 space-y-6">
        <h1 class="text-6xl text-center text-red-500"> {{cityfocused.name}} - {{country}}</h1>
        <h2 class="text-3xl text-center text-white"> Température: {{temp}}°C </h2>
        <h2 class="text-3xl text-center text-white"> Vent à {{wind}}km/h - {{windDir}} </h2>
        <h2 class="text-3xl text-center text-white"> Humidité: {{humidity}}% </h2>
        <h2 class="text-3xl text-center text-white"> {{region}} - {{localtime}} </h2>
        <h2 class="text-3xl text-center text-white"> Dernière update: {{last_updated}} </h2> 

      </div>
    </div>
    
    <footer class="flex justify-between w-auto p-4 border-t-4 border-blue-500 bg-gradient-to-t from-yellow-300 via-blue-300 to-red-300 h-20">
        <h3 class="w-full text-3x1 text-left text-black-300">
        ceci est un footer (normalement)
        </h3>
    </footer>

  </div>
  
</template>

<script>
import Burger from '@/components/Menu/Burger.vue';
import Bar from '@/components/Menu/Bar.vue';

class city {
  constructor(name, img) {
    this.name = name,
    this.img = img
  }
}
let dieppe = new city("Dieppe", require("@/assets/city/dieppe.jpg"))
let paris = new city("Paris", require("@/assets/city/paris.jpg"))
let bourges = new city("Bourges", require("@/assets/city/bourges.jpg"))
let lehavre = new city("Le Havre", require("@/assets/city/lehavre.jpg"))
let lisboa = new city("Lisboa", require("@/assets/city/lisbonne.jpg"))
let nauplie = new city("Nafplio", require("@/assets/city/nauplie.jpg"))

export default {
  components: {
   Burger,
   Bar
 },
  data() {
    return {
      loading: true,
      cityfocused: null,
      tab: [dieppe, bourges, paris, lehavre, lisboa, nauplie],
      temp: 0,
      wind: 0,
      windDir: "",
      last_updated: "",
      humidity: 0,
      localtime: "",
      region: "",
      country: "",
    }
  },
  methods: {
    async focusto(city) {
      this.loading = true
      if (this.cityfocused != city) {
      this.cityfocused = city;
      const res = await this.fetchCityWeather(city)
      this.temp= res.current.temp_c
      this.wind= res.current.wind_kph
      this.windDir= res.current.wind_dir
      this.last_updated= res.current.last_updated
      this.humidity= res.current.humidity
      this.localtime= res.location.localtime
      this.region= res.location.region
      this.country=res.location.country
      console.log(this.loading)
      }
      this.loading = false
    },
    async fetchCityWeather(city) {
      console.log("fetching"+city.name)
      const res = await fetch('http://api.weatherapi.com/v1/current.json?key=f8191aee1aed4c54a8a124734212406&q='+city.name+'&aqi=no')
      const data = await res.json()
      console.log(data)
      return data
    }
  },
  mounted: function () {
    console.log('Mounting')
    this.focusto(dieppe)
  }

}

</script>

<style>
::-webkit-scrollbar {display:none;}
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

</style>
