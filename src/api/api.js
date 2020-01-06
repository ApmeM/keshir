import * as axios from "axios";
import csv from "csv-parser";
var Readable = require('stream').Readable;

const instanse = axios.create({
    baseURL: 'https://docs.google.com/'
});

export const postAPI = {
    getProducts() {
        return instanse.get('/spreadsheets/d/e/2PACX-1vTR3vyNCfIEo8rJm_5QeRCYFjppQlCMFdJ5zMCHp-LU-OdoS669zmZJhio_iXGSHKPKQVuE7mg6ALfb/pub?gid=0&single=true&output=csv')
            .then(response => {
                return new Promise((resolve, reject) =>{
                    const results = [];
                    const s = new Readable();
                    var idx = 0;
                    s._read = () => {}; // redundant? see update below
                    s.push(response.data);
                    s.push(null);
                    s.pipe(csv())
                     .on('data', (data) => results.push({...data, id: idx++}))
                     .on('end', () => {
                         resolve(results);
                     });
                });
            });
    }
};