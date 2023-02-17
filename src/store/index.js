import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    todos: [],
  },
  mutations: {
    storeTodos(state, payload) {
      state.todos = payload;
    },
    storeTodo(state, payload) {
      //unshift serve para adicionar em ordem um novo item
      // push adiciona um novo item no final da lista

      const index = state.todos.findIndex((todos) => todos.id === payload.id);

      if (index >= 0) {
        state.todos.splice(index, 1, payload);
      } else {
        state.todos.unshift(payload);
      }
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex((todos) => todos.id === id);
      if (index >= 0) {
        state.todos.splice(index, 1);
      }
    },
  },
  getters: {},
  actions: {
    getTodos({ commit }) {
      return new Promise((resolve) => {
        setTimeout(async () => {
          const response = await axios.get("https://63efc3db271439b7fe75c13d.mockapi.io/adicionar");
          commit("storeTodos", response.data);
          resolve();
        }, 1000);
      });
    },
    async addTodo({ commit }, data) {
      const response = await axios.post("https://63efc3db271439b7fe75c13d.mockapi.io/adicionar", data);
      commit("storeTodo", response.data);
    },
    updateTodo({ commit }, { id, data }) {
      return axios
        .put(`https://63efc3db271439b7fe75c13d.mockapi.io/adicionar/${id}`, data)
        .then((response) => {
          commit("storeTodo", response.data);
        });
    },
    deleteTodo({ commit }, id) {
      return axios
        .delete(`https://63efc3db271439b7fe75c13d.mockapi.io/adicionar/${id}`)
        .then(() => {
          commit("deleteTodo", id);
        });
    },
  },
  modules: {},
});
