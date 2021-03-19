<template>
    <div>
        <div class="header">
            <div class="logo" @click="navigateTo('/')">LOGO</div>
            <div class="search-container">
                <input type="text" class="search" @keyup="searchMovie()" v-model="search" placeholder="Pesquisa">
                <font-awesome-icon icon="search" class="search-icon" />
            </div>
            <div class="header-icons">
                <font-awesome-icon class="icons btn-icons" icon="heart" @click="openFavorite()" />
                <font-awesome-icon class="cart-icon icons btn-icons" icon="shopping-cart" @click="openCart()" />
                <div v-if="totalCart.movies > 0" class="total-movies" @click="openCart()">{{ totalCart.movies }}</div>
            </div>
        </div>
        <transition
        :css="false"
        @before-enter="beforeEnter"
        @enter="enter"
        
        @before-leave="beforeLeave"
        @leave="leave">
                <div class="collapse overflow-y" v-if="show.favorite">
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
        </transition>

        <transition
        :css="false"
        @before-enter="beforeEnter"
        @enter="enter"
        
        @before-leave="beforeLeave"
        @leave="leave">
            <div class="collapse" v-if="show.cart">
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
                    <div class="total-group">
                        <div class="total">
                            <h4>Total:</h4>
                            <h2>R$ {{ totalCart.value.toFixed(2).replace('.',',') }}</h2>
                        </div>
                        <button class="btn-primary" @click="navigateTo('checkout')">Finalizar compra</button>
                    </div>
                </template>
                <div v-else>
                    <p>Nenhum filme adicionado no carrinho!</p>
                </div>
            </div>
        </transition>
        
        <div v-if="show.favorite || show.cart" class="backdrop-filter" @click="closeCollapse()"/>
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
            },
            search: null,
            collapseWidth: 0,
            animationSpeed: 0
        }
    },
    mounted () {
        this.scroll()
        if(window.innerWidth <= 576){
            this.collapseWidth = 100
            this.animationSpeed = 2
        } else if(window.innerWidth <= 768){
            this.collapseWidth = 80
            this.animationSpeed = 2
        } else if(window.innerWidth <= 1023){
            this.collapseWidth = 60
            this.animationSpeed = 2
        } else {
            this.collapseWidth = 30
            this.animationSpeed = 1
        }
    },
    computed: {
        ...mapGetters({
            favorites: 'movies/getFavorites',
            cart: 'movies/getCart',
            totalCart: 'movies/getTotalCart',
            currentPage: 'movies/getCurrentPage',
        }),
    },
    methods: {
        ...mapActions({
            saveFavorites: 'movies/saveFavorites',
            loadMovies: 'movies/loadMovies',
            saveCart: 'movies/saveCart',
            searchMovies: 'movies/searchMovies',
        }),
        openFavorite(){
            this.show.favorite = !this.show.favorite
            this.show.cart = false
        },
        openCart(){
            this.show.favorite = false
            this.show.cart = !this.show.cart
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
            this.search = ''
            this.loadMovies({
                page: 1,
                language: 'pt-BR'
            })
            window.scrollTo(0,0);
            this.$router.push(route);
        },
        searchMovie(){
            if(this.search){
                window.scrollTo(0,0);
                this.searchMovies({
                    query: this.search,
                    language: 'pt-BR',
                    page: 1
                })
            } else {
                this.loadMovies({
                    page: 1,
                    language: 'pt-BR'
                })
            }
        },
        scroll () {
            window.onscroll = () => {
                let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight

                if (bottomOfWindow) {
                    if(this.search){
                    this.searchMovies({
                        query: this.search,
                        language: 'pt-BR',
                        page: this.currentPage + 1
                    })
                    } else {
                        this.loadMovies({
                            page: this.currentPage + 1,
                            language: 'pt-BR'
                        })
                    }
                }
            }
        },
		animation(el, done, leave) {
			let currentRigth = 1
			const interval = setInterval(() => {
				const newRigth = (leave ? -currentRigth : currentRigth - this.collapseWidth)
				el.style.right = `${newRigth}%`
				currentRigth+= this.animationSpeed
				if(currentRigth > this.collapseWidth) {
					clearInterval(interval)
					done()
				}
			}, 10)
		},
		beforeEnter(el) {
			el.style.right = `-${this.collapseWidth}%`
		},
		enter(el, done) {
			this.animation(el, done, false)
		},
		beforeLeave(el) {
			el.style.right = '0'
		},
		leave(el, done) {
			this.animation(el, done, true)
		},
    }
  
}
</script>