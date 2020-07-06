  
const LeaguesService = {
    getAllLeagues(knex) {
        return knex.select('*').from('leagues') //returns all leagues from the db
    },
    findLeagues(knex, searchParameters) { //returns specified leagues 
        const { latitude, longitude, budget } = searchParameters;

        knex('leagues')

        /*
        This is a random assumption of what 5 miles radius might be
        ex: team has lat: 14 & lon 18
        1. This makes is between the #'s of 2-4 which is how I calculated a 5mi radius
        */
        const ifWithinFiveMiles = (league) =>
        league.latitude - latitude >= 2 &&
        league.latitude - latitude <= 4 &&
        league.longitude - longitude >= 2 &&
        league.longitude - longitude <= 4;

        //once you've sorted the leagues that meet the criteria 
        //they will sort from greatest to least order
        const withinRaidus = leagues.filter(ifWithinFiveMiles).sort((a, b) =>
            a.price > b.price ? 1 : -1,
        )

        let sum = 0; 
        const withinBudget = [];

        withinRaidus.forEach((league) => {
            //if the sum & the price are greater than the budget (return nothing)
            //if the price is greater than the budget (return nothing)
            if (sum + league.price > budget || league.price > budget) {
                return; 
            }
            else {
                //push as many leagues that equate as close to the total sum 
                withinBudget.push(league);
                sum += league.price;
            }
        })

        return Promise.resolve(withinBudget);
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
        return knex('').select('*').where('id', id).first();
    }
 }
 module.exports = LeaguesService;