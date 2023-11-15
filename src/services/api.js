import axios from 'axios';

export const api = axios.create({
	baseURL: 'https://recipe-api-production.up.railway.app'
})