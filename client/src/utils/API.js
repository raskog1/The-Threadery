import axios from "axios";

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

export default {
    getUser: function (id) {
        return axios.get("/api/users/" + id);
    },

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