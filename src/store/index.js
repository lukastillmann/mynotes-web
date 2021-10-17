import {createStore} from "vuex";
import config from "@/config";
import api from "@/store/api";

export default createStore({
    state: {
        categories: [],
        category: null,
        messages: [],
        notes: [],
    },
    mutations: {
        "categories/update": (state, categories) => {
            state.categories = categories;
        },
        "category/update": (state, category) => {
            state.category = category;
        },
        "notes/update": (state, notes) => {
            state.notes = notes;
        },
        "notes/clear": (state) => {
            state.notes = [];
        },
        "messages/add": (state, {text, status = "info"}) => {
            state.messages.push({text, status});
        },
        "messages/remove": (state, message) => {
            state.messages.splice(state.messages.indexOf(message), 1);
        },
        "note/update": (state, note) => {
            state.note = note;
        },
        "note/reset": (state) => {
            state.note = null;
        },
    },
    actions: {
        "categories/load": ({commit}) => {
            const url = config.api.categories;
            return api
                .get(url)
                .then((response) => {
                    if (response.error) {
                        commit("messages/add", {
                            text: `${response.error.name}: ${response.message}`,
                            status: "error",
                        });
                    } else {
                        commit("categories/update", response.categories);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    commit("messages/add", {text: error.message, status: "error"});
                });
        },
        "notes/load": ({commit, state}, cat) => {
            const category = cat || state.category;
            const url = config.api.notes.expand({category: category});

            return api
                .get(url)
                .then((response) => {
                    commit("messages/add", {text: "Getting notes", status: "info"});
                    commit("notes/update", response.notes);
                })
                .catch((error) => {
                    console.error(error);
                    commit("messages/add", {text: error, status: "error"});
                });
        },
        "note/load": ({commit, state}, note) => {
            const category = note.category || state.category;
            const title = note.title;
            const url = config.api.note.expand({category: category, note: title});
            return api
                .get(url)
                .then((response) => {
                    commit("note/update", {note: response.note, metadata: response.metadata});
                })
                .catch((error) => {
                    commit("messages/add", {text: error, status: "error"});
                });
        },
        "note/save": ({commit, state}, note) => {
            const category = note.category || state.category;
            const title = note.title;
            const url = config.api.note.expand({category: category, note: title});

            return api
                .post(url, note.markdown)
                .then((response) => {
                    commit("messages/add", {text: "Notiz gespeichert"});
                    commit("note/update", response.markdown);
                })
                .catch((x) => {
                    console.error(x);
                });
        },
    },
    modules: {},
});
