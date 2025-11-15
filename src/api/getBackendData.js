import axios from './axios'
export const getAllMatches = () => axios.get('/Get_All_upcoming_Matches.json')
export const getAllPlayers = () => axios.get('/Get_All_Players_of_match.json')
