<template>
    <div id="app">
        <Header/>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
    name: 'App',
    components: {
        Header,
    },
}
</script>

<style>
	@keyframes slide-card-in {
		from { transform: translateY(-10px); opacity: 0; }
		to { transform: translateY(0px); opacity: 1; }
	}

	@keyframes slide-card-out {
		from { transform: translateY(0px); opacity: 1; }
		to { transform: translateY(-10px); opacity: 0; }
	}

	.slide-card-enter-active {
		animation: slide-card-in 0.7s ease;
	}

	.slide-card-leave-active {
		animation: slide-card-out 0.7s ease;
	}
</style>