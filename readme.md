# Vuex Table Store

A series of helper functions for typical vuex use cases

### Installation

```
// Package.json
devDependencies: {
    ...
    "tmyers273.vuex-helpers": "git+https://git@github.com/tmyers273/vuex-helpers.git",
}
```

# Usage

Currently, this only supports loading ALL data at once in a single AJAX call.
Paginated AJAX calls are not currently supported.

Supports the normal CRUD commands, as well as provides getters for pagination.

# Config

Config values are passed as an object to the VuexHelpers constructor.

* `http` function that returns axios or VueResource object
* `default` is the object to use when creating a new object. This serves as the
starting point in forms and allows you to provide default values
* `getResponseData` method to return JSON object from response
* `create.url` is the url to `POST` to when creating
* `edit.url` is the url to `POST` to when editing
* `destroy.url` is the url to `POST` to when deleting
* `destroy.params` is the function that is called to get the parameters to send in
the destroy request. It is passed the id as the first parameter
* `load.url` is the url to `GET` when loading

```
let config = {
     default: {
         name: null,
         email: null,
         location: 'US',
     },
     getResponseData(response) {
        return response.data;
     },
     create: {
         url: 'codeFeeder/add_new_campaign'
     },
     edit: {
         url: 'codeFeeder/edit_campaign',
     },
     destroy: {
         params:(id) => ({
             campaignId: id
         }),
         url: 'codeFeeder/delete_campaign',
     },
     load: {
         url: 'codeFeeder/get_existing_campaigns',
     },
 }
```

```
import Vue from 'vue';
import config from './config';
import VuexHelpers from './vuex-helpers';

let helpers = VuexHelpers(config);

export default {

    namespaced: true,

    actions: Object.assign({}, helpers.actions),

    getters: Object.assign({}, helpers.getters),

    mutations: Object.assign({}, helpers.mutations),

    state: Object.assign({
        // Additional things can be added here
        custom: 'example'
    }, helpers.state),

}
```