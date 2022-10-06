import axios from 'axios';

type TypeHeaders = {
  Authorization?: string;
};

const headers: TypeHeaders = {};

const token = window.localStorage.getItem('TOKEN');

if (token !== '') {
  headers.Authorization = `Bearer ${token}`;
}

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers,
});

export { api };
