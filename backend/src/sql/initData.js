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
    let Team_init_sql = 'INSERT INTO Team( TName, Captain ) VALUES'
    for ( let i = 0; i < teams.length; i++ ) {
        Team_init_sql += `('${teams[i].TName}', '${teams[i].Captain}')${i == teams.length - 1 ? ';' : ','}`
    }
    init_con.query( Team_init_sql, ( err, result ) => {
        if ( err ) throw err
    } )
    console.log( "Team data init" )

    // player 
    let Player_init_sql = 'INSERT INTO Player( SID, PName, Dept, Grade, Sex, JerNum, Team ) VALUES'
    for ( let i = 0; i < players.length; i++ ) {
        Player_init_sql += `('${players[i].SID}', '${players[i].PName}', '${players[i].Dept}', '${players[i].Grade}', '${players[i].Sex}', ${players[i].JerNum}, '${players[i].Team}')${i == players.length - 1 ? ';' : ','}`
    }
    init_con.query( Player_init_sql, ( err, result ) => {
        if ( err ) throw err
    } )
    console.log( "Player data init" )

    // manager 
    let Manager_init_sql = 'INSERT INTO Manager( SID, PName, Dept, Grade, Sex, Team ) VALUES'
    for ( let i = 0; i < managers.length; i++ ) {
        Manager_init_sql += `('${players[i].SID}', '${players[i].PName}', '${players[i].Dept}', '${players[i].Grade}', '${players[i].Sex}', '${players[i].Team}')${i == managers.length - 1 ? ';' : ','}`
    }
    init_con.query( Manager_init_sql, ( err, result ) => {
        if ( err ) throw err
    } )
    console.log( "Manager data init" )

    // game 
    let Game_init_sql = 'INSERT INTO Game( GID, GameDate, HomeTeam, HomeScore, AwayTeam, AwayScore ) VALUES'
    for ( let i = 0; i < games.length; i++ ) {
        Game_init_sql += `(${games[i].GID}, '${games[i].GameDate}', '${games[i].HomeTeam}', ${games[i].HomeScore}, '${games[i].AwayTeam}', ${games[i].AwayScore})${i == games.length - 1 ? ';' : ','}`
    }
    init_con.query( Game_init_sql, ( err, result ) => {
        if ( err ) throw err
    } )
    console.log( "Game data init" )

    // hit record 
    let HitRecord_init_sql = 'INSERT INTO HitRecord( GID, PAID, Result, Pitcher, Hitter ) VALUES'
    for ( let i = 0; i < hitRecords.length; i++ ) {
        HitRecord_init_sql += `( ${hitRecords[i].GID}, ${hitRecords[i].PAID}, '${hitRecords[i].Result}', '${hitRecords[i].Pitcher}', '${hitRecords[i].Hitter}')${i == hitRecords.length - 1 ? ';' : ','}`
    }
    init_con.query( HitRecord_init_sql, ( err, result ) => {
        if ( err ) throw err
    } )
    console.log( "HitRecord data init" )

    init_con.end()
} )