<template>
    <div class="container checkout">
        <h2>Finalizar Compra</h2>
        <div class="checkout-grid">
            <div class="form-checkout">
                <div class="grid-row-1">
                    <input type="text" name="nome" placeholder="Nome" id="nome" v-model="user.nome">
                </div>
                <div class="grid-row-1-1">
                    <input type="text" name="cpf" placeholder="CPF" id="cpf" v-model="user.cpf" v-mask="'###.###.###-##'">
                    <input type="text" name="celular" placeholder="Celular" id="celular" v-model="user.celular" v-mask="'(##) #####-####'">
                </div>
                <div class="grid-row-1">
                    <input type="text" name="email" placeholder="E-mail" id="email" v-model="user.email">
                </div>
                <div class="grid-row-1-3">
                    <input type="text" name="cep" placeholder="CEP" id="cep" v-model="user.cep" v-mask="'##.###-###'">
                    <input type="text" name="endereco" placeholder="Endereço" id="endereco" v-model="user.endereco">
                </div>
                <div class="grid-row-1-1">
                    <input type="text" name="cidade" placeholder="Cidade" id="cidade" v-model="user.cidade">
                    <input type="text" name="estado" placeholder="Estado" id="estado" v-model="user.estado">
                </div>
            </div>
            <div>
                <template v-if="this.cart.length > 0">
                    <div class="movies cart">
                        <h4 class="my-0">Imagem</h4>
                        <h4 class="my-0">Nome</h4>
                        <h4 class="my-0">Qtd</h4>
                        <h4 class="my-0">Preço</h4>
                    </div>
                    <div class="cart-movies">
                        <div class="movies cart movies-checkout" v-for="(movie, i) in cart" :key="i">
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
                        <button class="btn-primary" @click="buy()">Finalizar</button>
                    </div>
                </template>
                <div v-else>
                    <center>
                        <p>Nenhum filme adicionado no carrinho!</p>
                    </center>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data: function () {
        return {
            user:{
                nome: null,
                cpf: null,
                celular: null,
                email: null,
                cep: null,
                endereco: null,
                cidade: null,
                estado: null
            }
        }
    },
    computed: {
        ...mapGetters({
            cart: 'movies/getCart',
            totalCart: 'movies/getTotalCart',
        })
    },
    methods: {
        ...mapActions({
            saveCart: 'movies/saveCart',
        }),
        removeCart(id){
            let removeId = this.cart.map(function(item) { return item.id; }).indexOf(id)
            let newCart = this.cart
            newCart.splice(removeId, 1)
            this.saveCart(newCart)
        },
        buy(){
            let listaErros = []
            // Apenas uma validação simplificada dos campos
            if(!this.user.nome || this.user.nome.length < 3){
                listaErros.push(' nome')
            } 
            if(!this.user.cpf || this.user.cpf.length < 14){
                listaErros.push(' CPF')
            } 
            if(!this.user.celular || this.user.celular.length < 15){
                listaErros.push(' celular')
            } 
            if(!this.user.email || !this.user.email.includes('@')){
                listaErros.push(' e-mail')
            } 
            if(!this.user.cep || this.user.cep.length < 10){
                listaErros.push(' CEP')
            } 
            if(!this.user.endereco || this.user.endereco.length < 10){
                listaErros.push(' endereço')
            } 
            if(!this.user.cidade || this.user.cidade.length < 3){
                listaErros.push(' cidade')
            } 
            if(!this.user.estado || this.user.estado.length < 2){
                listaErros.push(' estado')
            } 
            
            if(listaErros.length > 0){
                let msg
                msg = listaErros.length == 1 ? `Campo${listaErros[0]} não foi preenchido corretamente!` : `Campos${listaErros} não foram preenchidos corretamente!`
                this.$swal({
                    title: 'Ops...',
                    text: msg,
                    icon: 'error',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'btn-primary w-80'
                    }
                });
            } else {
                this.$swal({
                    title: `Obrigado ${this.user.nome}!`,
                    text: 'Sua compra foi finalizada com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'Ir para loja',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'btn-primary w-80'
                    },
                    onClose: () => {
                        this.saveCart([])
                        this.$router.push('/')
                    }
                });
            }
        }
    }
}
</script>

<style>

</style>