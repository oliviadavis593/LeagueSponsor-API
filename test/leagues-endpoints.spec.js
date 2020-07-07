const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
const { makeLeaguesArray } = require('./leagues.fixtures');

describe('Leagues Endpoints', function() {
    let db 

    //creates a knex instance to connect to the test database
    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL, 
        })
        app.set()
    })

    //disconnects from the db so tests don't 'hang'
    after('disconnect from db', () => db.destroy())

    //clears any data so we know we have a clean table(s)
    before('clean the table', () => db('leagues').truncate())

    afterEach('cleanup', () => db('leagues').truncate())

    describe('GET /api/leagues', () => {
        context('Given there are leagues in the database', () => {
            const testLeagues = makeLeaguesArray()

            beforeEach('insert leagues', () => {
                return db 
                    .into('leagues')
                    .insert(testLeagues)
            })

            it('responds with 200 and all of the leagues', () => {
                return supertest(app)
                    .get('/api/leagues')
                    .expect(200, testLeagues)
            })
        })

        context(`Given no leagues`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/leagues')
                    .expect(200, [])
            })
        })
    }) 

    describe.skip('POST /api/leagues', () => {
        it(`creates a league, responding with 201 and the new league`, () => {
            const newLeague = {
                league_name: 'Test league_name',
                website: 'Test league website',
                latitude: 13, 
                longitude: 15,
                price: 3000
            }
            return supertest(app)
                .post('/api/leagues')
                .send(newLeague)
                .expect(201)
                .expect(res => {
                    expect(res.body.league_name).to.eql(newLeague.league_name)
                    expect(res.body.website).to.eql(newLeague.website)
                    expect(res.body.latitude).to.eql(newLeague.latitude)
                    expect(res.body.longitude).to.eql(newLeague.longitude)
                    expect(res.body.price).to.eql(newLeague.price)
                    expect(res.body).to.have.property('id')
                })
        })
    })
})
