import axios from "axios";

const Url = "http://localhost:3000/api";
const getKillers = await axios.get(`${Url}/killer`);
const getSurvivors = await axios.get(`${Url}/survivor`);

export { getKillers, getSurvivors };
