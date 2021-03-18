<template>
    <div>
        <div class="header">
            <div class="logo" @click="navigateTo('/')">LOGO</div>
            <div class="search-container">
                <input type="text" class="search" placeholder="Pesquisa">
                <font-awesome-icon icon="search" class="search-icon" />
            </div>
            <div class="header-icons">
                <font-awesome-icon class="icons btn-icons" icon="heart" @click="openFavorite()" />
                <font-awesome-icon class="cart-icon icons btn-icons" icon="shopping-cart" @click="openCart()" />
                <div v-if="totalCart.movies > 0" class="total-movies" @click="openCart()">{{ totalCart.movies }}</div>
            </div>
        </div>
        <div v-show="show.favorite">
            <div class="collapse overflow-y">
                <div class="collapse-header">
                    <h4>Meus Favoritos</h4>
                    <a @click="clearFavorites()" class="clear">Esvaziar</a>
                </div>
                <div v-if="this.favorites.length > 0">
                    <div class="movies favorites" v-for="(movie, i) in favorites" :key="i">
                        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="movie poster">
                        <p>{{ movie.title }}</p>
                        <p>R$ {{ movie.price.toFixed(2).replace('.',',') }}</p>
                        <font-awesome-icon class="collapse-icons btn-icons" v-tooltip.bottom-end="'Adicionar ao carrinho'" icon="shopping-cart" @click="addCart(movie)" />
                        <font-awesome-icon class="collapse-icons btn-icons" v-tooltip.bottom-end="'Remover dos favoritos'" icon="trash" @click="removeFavorite(movie.id)" />
                    </div>
                </div>
                <div v-else>
                    <p>Nenhum filme adicionado na lista de favoritos!</p>
                </div>
            </div>
            <div class="backdrop-filter" @click="closeCollapse()"/>
        </div>

        <div v-show="show.cart">
            <div class="collapse">
                <div class="collapse-header">
                    <h4>Meu Carrinho</h4>
                    <a @click="clearCart()" class="clear">Esvaziar</a>
                </div>
                <template v-if="this.cart.length > 0">
                    <div class="cart-movies">
                        <div class="movies cart" v-for="(movie, i) in cart" :key="i">
                            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="movie poster">
                            <p>{{ movie.title }}</p>
                            <p>{{ movie.amount }}</p>
                            <p>R$ {{ (movie.price*movie.amount).toFixed(2).replace('.',',') }}</p>
                            <font-awesome-icon class="collapse-icons btn-icons" icon="trash" v-tooltip.bottom-end="'Remover do carrinho'" @click="removeCart(movie.id)" />
                        </div>
                    </div>
                    <div class="collapse-footer">
                        <div class="total">
                            <h4>Total:</h4>
                            <h2>R$ {{ totalCart.value.toFixed(2).replace('.',',') }}</h2>
                        </div>
                        <button class="btn-primary w-80" @click="navigateTo('checkout')">Finalizar compra</button>
                    </div>
                </template>
                <div v-else>
                    <p>Nenhum filme adicionado no carrinho!</p>
                </div>
            </div>
            <div class="backdrop-filter" @click="closeCollapse()"/>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Header',
    data: function () {
        return {
            show: {
                favorite: false,
                cart: false,
            }
        }
    },
    computed: {
        ...mapGetters({
            favorites: 'movies/getFavorites',
            cart: 'movies/getCart',
            totalCart: 'movies/getTotalCart',
        }),
    },
    methods: {
        ...mapActions({
            saveFavorites: 'movies/saveFavorites',
            saveCart: 'movies/saveCart',
        }),
        openFavorite(){
            this.show.favorite = true
            this.show.cart = false
        },
        openCart(){
            this.show.favorite = false
            this.show.cart = true
        },
        closeCollapse(){
            this.show.favorite = false
            this.show.cart = false
        },
        addCart(movie){
            let newCart = this.cart

            if(this.cart.find( movieCart => movieCart.id === movie.id )) {
                let movieId = this.cart.map(function(item) { return item.id; }).indexOf(movie.id)
                newCart[movieId].amount += 1
            }
            else {
                movie.amount = 1
                newCart.push(movie)
            }

            this.saveCart(newCart)
            this.$swal({
                title: 'Filme adicionado ao carrinho!',
                toast: true,
                icon: 'success',
                showConfirmButton: false,
                timer: 1250,
            });
        },
        removeFavorite(id){
            let removeId = this.favorites.map(function(item) { return item.id; }).indexOf(id)
            let newFavorites = this.favorites
            newFavorites.splice(removeId, 1)
            this.saveFavorites(newFavorites)
        },
        removeCart(id){
            let removeId = this.cart.map(function(item) { return item.id; }).indexOf(id)
            let newCart = this.cart
            newCart.splice(removeId, 1)
            this.saveCart(newCart)
        },
        clearFavorites(){
            if(this.favorites.length < 1){
                this.$swal({
                    title: 'Lista de filmes favoritos já está vazia!',
                    toast: true,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1700,
                });
            }
            else {
                this.$swal({
                    title: 'Lista de filmes favoritos esvaziada!',
                    toast: true,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1700,
                });
                this.saveFavorites([])
            }
        },
        clearCart(){
            if(this.cart.length < 1){
                this.$swal({
                    title: 'Carrinho de compras já está vazio!',
                    toast: true,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1700,
                });
            }
            else {
                this.$swal({
                    title: 'Carrinho de compras esvaziado!',
                    toast: true,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1700,
                });
                this.saveCart([])
            }
        },
        navigateTo(route){
            this.closeCollapse()
            this.$router.push(route);
        }
    }
  
}
</script>