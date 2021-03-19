<template>
    <div class="card">
        <div class="img-movie">
            <font-awesome-icon class="favorite-icon btn-icons" :class="favorite ? 'favorite-color' : ''" icon="heart" @click="changeFavorite()" /> 
            <img v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="movie poster">
            <img v-else src="https://dummyimage.com/500x750/dfe6ed/000000.png&text=+" alt="movie poster">
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
            <p><small>R$ {{ price.toFixed(2).replace('.',',') }}</small></p>
        </div>
        <button class="btn-primary" @click="addCart()">Adicionar</button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

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
            favorite: false,
        }
    },
    watch: {
        favorites: function () {
            if(this.favorites.find( favorite => favorite.id === this.movie.id )) this.favorite = true
            else this.favorite = false
        },
    },
    computed: {
        ...mapGetters({
            favorites: 'movies/getFavorites',
            cart: 'movies/getCart',
        }),
        movieGenre(){
            if(this.movie.genre_ids.length > 0){
                let id = this.movie.genre_ids[0]
                let mainGenre = this.genreList.find( genre => genre.id === id )
                return mainGenre.name
            }
            else return ''
        },
        releaseDate(){
            if(this.movie.release_date){
                let splitDate = this.movie.release_date.split('-')
                let monthIndex = splitDate[1] - 1
                return `${splitDate[2]} de ${this.months[monthIndex]}, ${splitDate[0]}`
            } else {
                return '-'
            }
        },
        price(){
            //Para ter uma valor diferente cada filme peguei os 3 primeiros digitos do id e dividi por 100
            let calcPriceById = parseFloat(this.movie.id.toString().substring(0, 3))/100
            return calcPriceById
        }
    },
    methods: {
        ...mapActions({
            saveFavorites: 'movies/saveFavorites',
            saveCart: 'movies/saveCart',
        }),
        changeFavorite(){
            if(this.favorites.find( favorite => favorite.id === this.movie.id )) {
                let removeId = this.favorites.map(function(item) { return item.id; }).indexOf(this.movie.id)
                let newFavorites = this.favorites
                newFavorites.splice(removeId, 1)
                this.saveFavorites(newFavorites)
                this.favorite = false
            } else {
                this.movie.price = this.price
                let newFavorites = this.favorites
                newFavorites.push(this.movie)
                this.saveFavorites(newFavorites)
                this.favorite = true
            }
        },
        addCart(){
            let newCart = this.cart
            this.movie.price = this.price

            if(this.cart.find( movie => movie.id === this.movie.id )) {
                let movieId = this.cart.map(function(item) { return item.id; }).indexOf(this.movie.id)
                newCart[movieId].amount += 1
            }
            else {
                this.movie.amount = 1
                newCart.push(this.movie)
            }
            this.saveCart(newCart)
            this.$swal({
                title: 'Filme adicionado ao carrinho!',
                toast: true,
                icon: 'success',
                showConfirmButton: false,
                timer: 1250,
            });
        }
    }
}
</script>