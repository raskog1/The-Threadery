import axios from "axios";

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

export default {
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