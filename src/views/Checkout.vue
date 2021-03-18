<template>
    <div class="container checkout">
        <h2>Finalizar Compra</h2>
        <div class="checkout-grid">
            <div class="form-checkout">
                <input type="text" name="" id="">
                <input type="text" name="" id="">
                <input type="text" name="" id="">
                <input type="text" name="" id="">
                <input type="text" name="" id="">
                <input type="text" name="" id="">
                <input type="text" name="" id="">
                <input type="text" name="" id="">
            </div>
            <div>
                filmes
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data: function () {
        return {
        }
    },
    computed: {
        ...mapGetters({
            cart: 'movies/getCart',
        })
    },
    methods: {
        ...mapActions({
            saveCart: 'movies/saveCart',
        })
    }
}
</script>

<style>

</style>