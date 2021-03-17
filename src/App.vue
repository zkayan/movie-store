<template>
  <div id="app">
    <Header/>
    <div class="card-list" v-if="loadedMovies.length > 0 && genreList.length > 0">
      <!-- <Card  :movie="loadedMovies[0]" :genreList="genreList"/> -->
      <div v-for="(movie, i) in loadedMovies" :key="i" class="mb-30">
        <Card :movie="movie" :genreList="genreList"/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Card from './components/Card.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    Header,
    Card
  },
  data: function () {
    return {
      loadedMovies: [],
      currentCart: [],
      genreList: []
    }
  },
  watch: {
    movies: function () {
      this.loadedMovies = this.movies
    },
    genre: function () {
      this.genreList = this.genre
    }
  },
  beforeMount: async function(){
    await this.loadMovies({
      page: '1',
      language: 'pt-BR'
    })
    await this.loadGenre({
      language: 'pt-BR'
    })
  },
  computed: {
    ...mapGetters({
      movies: 'movies/getMovies',
      currentPage: 'movies/getCurrentPage',
      genre: 'movies/getGenre',
    })
  },
  methods: {
    ...mapActions({
      loadMovies: 'movies/loadMovies',
      loadGenre: 'movies/loadGenre'
    })
  }
}
</script>