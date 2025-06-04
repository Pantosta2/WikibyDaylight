import type { AxiosResponse } from "axios";
import axios from "axios";
import type {
  CharacterListEnvelope,
  Perk,
  PowerDetails,
  CharacterSpecificPerksResponse,
  CharacterProfileData
} from "../Types/GeneralTypes";

const Url = "http://localhost:3000/api"; 

const getKillers = async (): Promise<AxiosResponse<CharacterListEnvelope>> => {
  return await axios.get<CharacterListEnvelope>(`${Url}/killer`);
};

const getSurvivors = async (): Promise<AxiosResponse<CharacterListEnvelope>> => {
  return await axios.get<CharacterListEnvelope>(`${Url}/survivor`);
};

const getCharacterPerks = (
  role: "killer" | "survivor",
  characterCode: string
): Promise<AxiosResponse<CharacterSpecificPerksResponse>> => {
  return axios.get<CharacterSpecificPerksResponse>(`${Url}/${role}/${characterCode}/perk`);
};

const getKillerPowerDetails = (
  characterCode: string
): Promise<AxiosResponse<PowerDetails>> => {
  return axios.get<PowerDetails>(`${Url}/killer/${characterCode}/power`);
};

export {
  getKillers,
  getSurvivors,
  getCharacterPerks,
  getKillerPowerDetails
};

export type {
  CharacterProfileData,
  Perk,
  CharacterListEnvelope,
  PowerDetails,
  CharacterSpecificPerksResponse
};