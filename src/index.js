import Vue from 'vue';

export default function(config) {
    return {
        actions: {

            create(store, data) {
                return new Promise((resolve, reject) => {
                    config.http().post(config.create.url, data).then(response => {
                        store.commit('push', config.getResponseData(response).data);
                        resolve(response);
                    }, response => {
                        reject(response);
                    });
                });
            },

            edit(store, data) {
                return new Promise((resolve, reject) => {
                    config.http().post(config.edit.url, data).then(response => {
                        resolve(response);
                    }, response => {
                        reject(response);
                    });
                });
            },

            load(store) {
                if (! store.getters.hasData) {
                    store.commit('loading', true);
                    config.http().get(config.load.url).then(response => {
                        store.commit('save', config.getResponseData(response));
                        store.commit('loading', false);
                        store.commit('hasData', true);
                    }, response => {
                        store.commit('loading', false);
                    });
                }
            },

            delete(store, id) {
                return new Promise((resolve, reject) => {
                    config.http().post(config.destroy.url, config.destroy.params(id)).then(response => {
                        store.commit('destroy', id);
                        resolve(response);
                    }).catch(response => {
                        reject(response);
                    });
                });
            }
        },

        getters: {

            count(state) {
                return state.count;
            },

            elements: state => (page = 1, perPage = 10) => {
                let start = (page - 1) * perPage;
                return state.elements.slice(start, start + perPage);
            },

            find: state => id => {
                let element = state.elements.find(element => {
                    if (element) {
                        return element.id == id;
                    }
                });

                if (! element) {
                    element = config.default;
                }

                return element;
            },

            hasData: state => {
                return state.hasData
            },

            isLoading(state) {
                return state.status.loading;
            },
        },

        mutations: {
            clear: (state) => {
                state.elements = [];
                state.hasData = false;
            },

            destroy: (state, id) => {
                let index = state.elements.findIndex(element => element.id == id);
                state.elements.splice(index, 1);
                state.count--;
            },

            edit: (state, new_element) => {
                let index = state.elements.findIndex(element => element.id == new_element.id);
                state.elements.splice(index, 1, new_element);
            },

            hasData: (state, value) => {
                state.hasData = value;
            },

            loading: (state, value) => {
                state.status.loading = value;
            },

            save: (state, response) => {
                state.count = response.meta.count;
                state.elements = response.data;
            },

            push: (state, element) => {
                state.elements.push(element);
                state.count++;
            },
        },

        state: {
            hasData: false,

            count: 0,
            elements: [],

            status: {
                loading: false,
            }
        },

    }
}