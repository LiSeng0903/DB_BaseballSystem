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
        Manager_init_sql += `('${managers[i].SID}', '${managers[i].PName}', '${managers[i].Dept}', '${managers[i].Grade}', '${managers[i].Sex}', '${managers[i].Team}')${i == managers.length - 1 ? ';' : ','}`
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


    // relative
    let Relative_init_sql = 'INSERT INTO Relative( SID, Relation, Phone, Name ) VALUES'
    for ( let i = 0; i < relatives.length; i++ ) {
        Relative_init_sql += `( '${relatives[i].SID}', '${relatives[i].Relation}', '${relatives[i].Phone}', '${relatives[i].Name}')${i == relatives.length - 1 ? ';' : ','}`
    }
    init_con.query( Relative_init_sql, ( err, result ) => {
        if ( err ) throw err
    } )
    console.log( "Relative data init" )


    // attendance 
    let Attendance_init_sql = 'INSERT INTO Attendance( GID, SID, Position ) VALUES'
    for ( let i = 0; i < attendances.length; i++ ) {
        Attendance_init_sql += `( ${attendances[i].GID}, '${attendances[i].SID}', '${attendances[i].Position}' )${i == attendances.length - 1 ? ';' : ','}`
    }
    init_con.query( Attendance_init_sql, ( err, result ) => {
        if ( err ) throw err
    } )
    console.log( "Attendance data init" )

    // can position 
    let CanPosition_init_sql = 'INSERT INTO CanPosition( SID, Position ) VALUES'
    for ( let i = 0; i < canPositions.length; i++ ) {
        CanPosition_init_sql += `( '${canPositions[i].SID}', '${canPositions[i].Position}')${i == canPositions.length - 1 ? ';' : ','}`
    }
    init_con.query( CanPosition_init_sql, ( err, result ) => {
        if ( err ) throw err
    } )
    console.log( "CanPosition data init" )

    init_con.end()
} )