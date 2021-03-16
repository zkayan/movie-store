<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  beforeMount(){
    this.loadMovies({
      page: '1',
      language: 'pt-BR'
    })

    console.log('Filmes: ',this.movies);
    console.log('Página: ',this.currentPage);
  },
  computed: {
    ...mapGetters({
      movies: 'movies/getMovies',
      currentPage: 'movies/getCurrentPage',
    })
  },
  methods: {
    ...mapActions({
      loadMovies: 'movies/loadMovies'
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
