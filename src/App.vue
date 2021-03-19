<template>
    <div id="app">
        <Header/>
        <div>
			<transition name="slide" mode="out-in">
            <router-view></router-view>
			</transition>
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
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity 2s;
	}
	
	@keyframes slide-in {
		from { transform: translateY(-30px); opacity: 0; }
		to { transform: translateY(0px); opacity: 1; }
	}

	@keyframes slide-out {
		from { transform: translateY(0px); opacity: 1; }
		to { transform: translateY(-30px); opacity: 0; }
	}

	.slide-enter-active {
		animation: slide-in 0.3s ease;
	}

	.slide-leave-active {
		animation: slide-out 0.3s ease;
}
</style>