const request = require('supertest');

const server = 'http://localhost:8080';
const fs = require('fs');
const path = require('path');
const promURI = 'http://127.0.0.1:9090/api/v1/';
// const serverFile = require('../server/server.js');

describe('fetch metrics', () => {
	describe('/api/fetchMetrics', () => {
		describe('GET', () => {
			it('responds with 200 status and data as JSON content type', () => {
				request(server)
					.get('/api/fetchMetrics')
					.expect(200)
					.expect('Content-Type', /application\/json/);
			});

			it('client metrics are in body of response', () =>
				request(server)
					.get('/api/fetchMetrics')
					.then((response) => {
						expect(response.body);
						expect(response.body[0].values !== undefined).toBe(true);
					}));
		});
	});
});

describe('fetch alerts', () => {
	describe('/api/alerts', () => {
		describe('GET', () => {
			it('responds with 201 status and data as JSON content type', () => {
				request(server)
					.get('/api/alerts')
					.expect(201)
					.expect('Content-Type', /application\/json/);
			});

			it('alerts are in body of response', () =>
				request(server)
					.get('/api/alerts')
					.then((response) => {
						expect(response.body);
						expect(response.body.status === 'success').toBe(true);
					}));
		});
	});
});

let now = new Date();
let nowCopy = new Date(now.getTime());
nowCopy.setHours(nowCopy.getHours() - 24);
let endDateTime = now.toISOString();
let startDateTime = nowCopy.toISOString();

let step = '30m';
/*
    `/api/prometheus/homepage?startDateTime=${startDateTime}&endDateTime=${endDateTime}&step=${step}`
*/
describe('fetch prom metrics for homepage', () => {
	describe(`/api/prometheus/homepage?startDateTime=${startDateTime}&endDateTime=${endDateTime}&step=${step}`, () => {
		describe('GET', () => {
			it('responds with 200 status and data as JSON content type', () => {
				request(server)
					.get(
						`/api/prometheus/homepage?startDateTime=${startDateTime}&endDateTime=${endDateTime}&step=${step}`
					)
					.expect(200)
					.expect('Content-Type', /application\/json/);
			});

			it('prometheus metrics are in body of response', () =>
				request(server)
					.get(
						`/api/prometheus/homepage?startDateTime=${startDateTime}&endDateTime=${endDateTime}&step=${step}`
					)
					.then((response) => {
						expect(response.body);
						expect(response.body.bytesReceivedPerNode !== undefined).toBe(true);
						expect(response.body.bytesTransmittedPerNode !== undefined).toBe(
							true
						);
					}));
		});
	});
});

describe('fetch namespace list', () => {
	describe('/api/namespaceList', () => {
		describe('GET', () => {
			it('responds with 201 status and data as JSON content type', () => {
				request(server)
					.get('/api/namespaceList')
					.expect(201)
					.expect('Content-Type', /application\/json/);
			});

			it('namespaces are in body of response', () =>
				request(server)
					.get('/api/namespaceList')
					.then((response) => {
						expect(response.body);
						expect(response.body.items[0].metadata.name !== undefined).toBe(
							true
						);
					}));
		});
	});
});
