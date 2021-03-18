<template>
    <transition name="slide-card" mode="out-in">
        <div class="card-list container" v-if="loadedMovies.length > 0 && genreList.length > 0">
            <div v-for="(movie, i) in loadedMovies" :key="i" class="mb-30">
                <Card :movie="movie" :genreList="genreList"/>
            </div>
        </div>
    </transition>
</template>

<script>
import Card from './../components/Card.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        Card
    },
    data: function () {
        return {
            loadedMovies: [],
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

<style>

</style>