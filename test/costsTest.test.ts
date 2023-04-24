import request from 'supertest';
import app from '../src/app';

const cityUppsala = {
    "city": "uppsala"
};
const cityStockholm = { 
    "city": "stockholm" 
};
const parseCityWithNumber = { 
    "city": 123 
};
const uppsalaPriceCalculation = {
    "city": "uppsala",
    "price_per_square_meter": 10,
    "window_cleaning": true,
    "balcony_cleaning": true,
    "removal_of_garbage": false
};
const stockholmPriceCalculation = {
    "city": "stockholm",
    "price_per_square_meter": 32,
    "window_cleaning": true,
    "balcony_cleaning": true,
    "removal_of_garbage": true
};

describe('GET /api/v1/city-costs', () => {
    it('responds with an array of cityCosts', async () =>
        request(app)
            .get('/api/v1/city-costs')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('length');
                expect(response.body.length).toBe(2);
            }),
    );
});

describe('GET /api/v1/city-costs/city', () => {
    it('responds with a single city cost information (uppsala)', async () =>
        request(app)
            .post('/api/v1/city-costs/city')
            .set('Accept', 'application/json')
            .send(cityUppsala)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('_id');
                expect(response.body).toHaveProperty('city');
                expect(response.body.city).toBe(cityUppsala.city);
                expect(response.body).toHaveProperty('price_per_square_meter');
                expect(response.body).toHaveProperty('window_cleaning');
                expect(response.body).toHaveProperty('balcony_cleaning');
                expect(response.body).toHaveProperty('removal_of_garbage');
            }),
    );
});

describe('GET /api/v1/city-costs/city', () => {
    it('responds with a single city cost information (Stockholm)', async () =>
        request(app)
            .post('/api/v1/city-costs/city')
            .set('Accept', 'application/json')
            .send(cityStockholm)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('_id');
                expect(response.body).toHaveProperty('city');
                expect(response.body.city).toBe(cityStockholm.city);
                expect(response.body).toHaveProperty('price_per_square_meter');
                expect(response.body).toHaveProperty('window_cleaning');
                expect(response.body).toHaveProperty('balcony_cleaning');
            }),
    );
});

describe('GET /api/v1/city-costs/city', () => {
    it('responds with a status code of 422 could not parse city as string', async () =>
        request(app)
            .post('/api/v1/city-costs/city')
            .set('Accept', 'application/json')
            .send(parseCityWithNumber)
            .expect('Content-Type', /json/)
            .expect(422)
            .then((response) => {
                expect(response.body).toHaveProperty('message');
            }),
    );
});

describe('POST /api/v1/city-costs/:calculate', () => {
    it('responds with a price of requested cost for Uppsala city', async () =>
        request(app)
            .post('/api/v1/city-costs/calculate')
            .set('Accept', 'application/json')
            .send(uppsalaPriceCalculation)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toBe(1000);
            }),
    );
});

describe('POST /api/v1/city-costs/:calculate', () => {
    it('responds with a price of requested cost for Uppsala city', async () =>
        request(app)
            .post('/api/v1/city-costs/calculate')
            .set('Accept', 'application/json')
            .send(stockholmPriceCalculation)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toBe(2530);
            }),
    );
});
