import type { AxiosResponse } from "axios";
import axios from "axios";
import type { SurvivorApiData } from "../Types/GeneralTypes";
import type { KillerApiData } from "../Types/GeneralTypes";

export type CharacterApiData = KillerApiData | SurvivorApiData;
export type CharacterListResponse = { data: CharacterApiData[] };

const Url = "http://localhost:3000/api";

const getKillers = async (): Promise<AxiosResponse<CharacterListResponse>> => {
  return await axios.get<CharacterListResponse>(`${Url}/killer`);
};

const getSurvivors = async (): Promise<
  AxiosResponse<CharacterListResponse>
> => {
  return await axios.get<CharacterListResponse>(`${Url}/survivor`);
};

export { getKillers, getSurvivors };
