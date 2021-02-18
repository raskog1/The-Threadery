import axios from "axios";

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

const API = {
    // Login/User Methods
    loginUser: function (info) {
        return axios.post("/api/auth", info);
    },
    createUser: function (info) {
        return axios.post("/api/users", info);
    },

    // Caboodle Methods
    createCaboodle: function () {
        return axios.post("/api/caboodle");
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

    // Wishlist Methods
    getWishes: function () {
        return axios.get("/api/caboodle/wishlist");
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

export default API;