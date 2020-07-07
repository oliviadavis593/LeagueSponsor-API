function makeLeaguesArray() {
    return [
        {
            id: 1, 
            league_name: 'The Reds',
            website: 'https://www.mlb.com/cardinals',
            latitude: 15, 
            longitude: 18,
            price: 2000
        },
        {
            id: 2, 
            league_name: 'The Atlanta typhoons',
            website: 'https://www.mlb.com/braves',
            latitude: 13, 
            longitude: 16,
            price: 1200
        },
        {
            id: 3, 
            league_name: 'Iowa Snakes',
            website: 'https://blah.com/snakes',
            latitude: 17, 
            longitude: 15, 
            price: 850
        },
        {
            id: 4, 
            league_name: 'Nebraska Hornets',
            website: 'https://blah.com/hornets',
            latitude: 17, 
            longitude: 15, 
            price: 1220
        }
    ]
}

module.exports = {
    makeLeaguesArray
}