import axios from "axios";

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

export default {
    // Login/User Methods
    getUser: function (id) {
        return axios.get("/api/users/" + id);
    },

    // Favorites Methods
    getFavorites: function () {
        return axios.get("/api/caboodle/fav");
    },

    getOneFavorite: function (id) {
        return axios.get("/api/caboodle/fav/" + id);
    },

    addFav: function (thread) {
        return axios.put("/api/caboodle/fav", thread);
    },

    deleteFav: function (id) {
        return axios.delete("/api/caboodle/fav/" + id);
    },

    // Owned Methods
    getOwned: function () {
        return axios.get("/api/caboodle/owned");
    },

    addOwned: function (thread) {
        return axios.put("/api/caboodle/owned", thread);
    },

    // Thread Inventory Methods
    addDMC: function (thread) {
        return axios.post("/api/threads/DMC", thread, config);
    },

    getAllDMC: function () {
        return axios.get("/api/threads/DMC");
    },

    getOneDMC: function (id) {
        return axios.get("/api/threads/DMC/" + id);
    }
}