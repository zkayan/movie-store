<template>
  <div class="card">
    <div class="img-movie">
      <font-awesome-icon class="favorite-icon" icon="heart" /> 
      <img :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`" alt="movie poster">
      <p>
        <small>{{ releaseDate }}</small>
      </p>
    </div>
    <div>
      <h4>
        {{ movie.title }}
      </h4>
      <p>
        <font-awesome-icon icon="star" /> <span class="vote">{{ movie.vote_average }}</span> <small>{{ movieGenre }}</small>
      </p>
      <p><small>R$ 9,99</small></p>
    </div>
    <button class="btn-primary">Adicionar</button>
  </div>
</template>

<script>

export default {
  name: 'Card',
  props: {
    movie: Object,
    genreList: Array
  },
  data: function () {
    return {
      months: [
        'Janeiro', 
        'Fevereiro', 
        'Março', 
        'Abril', 
        'Maio', 
        'Junho', 
        'Julho', 
        'Agosto', 
        'Setembro', 
        'Outubro', 
        'Novembro', 
        'Dezembro'
      ],
    }
  },
  computed: {
    movieGenre(){
      let id = this.movie.genre_ids[0]
      let mainGenre = this.genreList.find( genre => genre.id === id )
      return mainGenre.name
    },
    releaseDate(){
      let splitDate = this.movie.release_date.split('-')
      let monthIndex = splitDate[1] - 1
      
      return `${splitDate[2]} de ${this.months[monthIndex]}, ${splitDate[0]}`
    }
  },
}
</script>