import axios from "axios";

// const devUrl = "http://localhost:5000/"
const devUrl = "https://project-backend-0787.onrender.com"


const Api = axios.create({
 baseURL:devUrl,
});

export default Api;
