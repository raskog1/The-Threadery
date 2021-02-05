import axios from "axios";

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

export default {
    // Login/User Methods
    getUser: function () {
        return axios.get("/api/users");
    },

    // Basic Thread Methods
    getOne: function (id) {
        return axios.get("/api/caboodle/drawer/" + id);
    },

    addOne: function (thread) {
        return axios.put("/api/caboodle/drawer", thread);
    },

    deleteOne: function (id) {
        return axios.delete("/api/caboodle/drawer/" + id);
    },

    // Favorites Methods
    getFavorites: function () {
        return axios.get("/api/caboodle/fav");
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