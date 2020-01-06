import * as axios from "axios";

const instanse = axios.create({
    baseURL: 'https://docs.google.com/'
});

export const postAPI = {
    getProducts() {
        return instanse.get('/spreadsheets/d/e/2PACX-1vTR3vyNCfIEo8rJm_5QeRCYFjppQlCMFdJ5zMCHp-LU-OdoS669zmZJhio_iXGSHKPKQVuE7mg6ALfb/pub?gid=0&single=true&output=csv')
            .then(response => {
                return [                                                                              
                    {id: 1, name: 'product1', description: 'description1', price: 100, currency: 'p'},
                    {id: 2, name: 'product2', description: 'description2', price: 200, currency: 'p'}
                ]
            });
    }
};