let get_test_case = require( '../testCase/get_better_test_data.js' ).get_test_case
let mysql = require( 'mysql' )

let { players, teams, managers, games, hitRecords, relatives, attendances, canPositions } = get_test_case()

let init_con = mysql.createConnection( {
    host: "localhost",
    user: "root",
    password: "11111111",
    database: 'baseball'
} )

init_con.connect( ( err ) => {
    if ( err ) throw err
    console.log( "Connected!" )

    // team
    for ( let i = 0; i < teams.length; i++ ) {
        init_con.query( `INSERT INTO Team( TName, Captain )
        VALUES ('${teams[i].TName}', '${teams[i].Captain}')`,
            ( err, result ) => {
                if ( err ) throw err
            } )
    }
    console.log( "Team data init" )

    // player 
    for ( let i = 0; i < players.length; i++ ) {
        init_con.query( `INSERT INTO Player( SID, PName, Dept, Grade, Sex, JerNum, Team)
        VALUES ('${players[i].SID}', '${players[i].PName}', '${players[i].Dept}', '${players[i].Grade}', '${players[i].Sex}', ${players[i].JerNum}, '${players[i].Team}')`,
            ( err, result ) => {
                if ( err ) throw err
            } )
    }
    console.log( "Player data init" )

    // manager 
    for ( let i = 0; i < managers.length; i++ ) {
        init_con.query( `INSERT INTO Manager( SID, PName, Dept, Grade, Sex, Team)
        VALUES ('${players[i].SID}', '${players[i].PName}', '${players[i].Dept}', '${players[i].Grade}', '${players[i].Sex}', '${players[i].Team}')`,
            ( err, result ) => {
                if ( err ) throw err
            } )
    }
    console.log( "Manager data init" )

    // game 
    for ( let i = 0; i < games.length; i++ ) {
        init_con.query( `INSERT INTO Game( GID, GameDate, HomeTeam, HomeScore, AwayTeam, AwayScore)
        VALUES (${games[i].GID}, '${games[i].GameDate}', '${games[i].HomeTeam}', ${games[i].HomeScore}, '${games[i].AwayTeam}', ${games[i].AwayScore})`,
            ( err, result ) => {
                if ( err ) throw err
            } )
    }
    console.log( "Game data init" )

    init_con.end()
} )