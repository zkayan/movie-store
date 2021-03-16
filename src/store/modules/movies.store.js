import axios from 'axios'

// Initial state
const initialState = () => ({
  movies: [],
  currentPage: '',
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
}

// Actions
const actions = {
  loadMovies({ commit }, { page, language }) {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=cb29b272563ee0631c4b4ea675c478e2&language=${language}&page=${page}`)
      .then(response => {
        commit('setMovies', response.data.results)
        commit('setCurrentPage', response.data.page)
      })
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
}

// Module exports
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
