import axios from 'axios'

// Initial state
const initialState = () => ({
  movies: [],
  currentPage: '',
	cart: [],
  favorites: [],
  genre: [],
})

// State object
const state = initialState()

// Getters
const getters = {
  getMovies(state) {
    return state.movies
  },
  getCurrentPage(state) {
    return state.currentPage
  },
	getCart(state) {
		return state.cart
	},
	getFavorites(state) {
		return state.favorites
	},
	getGenre(state) {
		return state.genre
	},
}

// Actions
const actions = {
	clearState({ commit }) { commit('RESET') },
  loadMovies({ commit }, { page, language }) {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=cb29b272563ee0631c4b4ea675c478e2&language=${language}&page=${page}`)
      .then(response => {
        commit('setMovies', response.data.results)
        commit('setCurrentPage', response.data.page)
      })
  },
  loadGenre({ commit }, { language }) {
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=cb29b272563ee0631c4b4ea675c478e2&language=${language}`)
      .then(response => {
        commit('setGenre', response.data.genres)
      })
  },
	saveCart({ commit }, movies ) {
		commit('setCart', movies)
	},
	saveFavorites({ commit }, movies ) {
		commit('setFavorites', movies)
	},
}

// Mutations
const mutations = {
  RESET(state) {
    const newState = initialState()
    Object.keys(newState).forEach(key => {
      state[key] = newState[key]
    })
  },
  setMovies(state, data) {
    state.movies = data
  },
  setCurrentPage(state, data) {
    state.currentPage = data
  },
	setCart(state, data) {
		state.cart = data
	},
	setFavorites(state, data) {
		state.favorites = data
	},
	setGenre(state, data) {
		state.genre = data
	},
}

// Module exports
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
