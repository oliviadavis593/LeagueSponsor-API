  
const LeaguesService = {
    getAllLeagues(knex) {
        return knex.select('*').from('leagues') //returns all leagues from the db
    },
    createLeague(knex, newLeague) {
        return knex
            .insert(newLeague)
            .into('leagues')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    }, 
    getById(knex, id) {
        return knex('leagues').select('*').where('id', id).first();
    }
 }
 module.exports = LeaguesService;