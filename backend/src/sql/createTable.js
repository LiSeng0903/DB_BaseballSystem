let mysql = require( 'mysql' )

let addTable_con = mysql.createConnection( {
    host: "localhost",
    user: "root",
    password: "11111111",
    database: 'baseball'
} )

addTable_con.connect( function ( err ) {
    if ( err ) throw err
    console.log( "Connected!" )

    let addTable_sqls = [
        `CREATE TABLE Player ( 
            SID VARCHAR(255) PRIMARY KEY,
            PName VARCHAR(255),
            Dept VARCHAR(255),
            Grade VARCHAR(255),
            Sex VARCHAR(255),
            JerNum INT,
            Team VARCHAR(255) 
        )`,

        `CREATE TABLE Team (
            TName VARCHAR(255) PRIMARY KEY,
            Captain VARCHAR(255)
        )`,

        `CREATE TABLE Manager(
            SID VARCHAR(255) PRIMARY KEY,
            PName VARCHAR(255),
            Dept VARCHAR(255),
            Grade VARCHAR(255),
            Sex VARCHAR(255),
            Team VARCHAR(255) 
        )`,

        `CREATE TABLE GAME(
            GID INT PRIMARY KEY,
            GameDate DATE, 
            HomeTeam VARCHAR(255),
            HomeScore INT,
            AwayTeam VARCHAR(255),
            AwayScore INT,
            FOREIGN KEY(HomeTeam) REFERENCES Team(TName),
            FOREIGN KEY(AwayTeam) REFERENCES Team(TName)
        )`,

        `CREATE TABLE HitRecord(
            GID INT,
            PAID INT,
            Result VARCHAR(255),
            Pitcher VARCHAR(255),
            Hitter VARCHAR(255),
            FOREIGN KEY(GID) REFERENCES Game(GID),
            FOREIGN KEY(Pitcher) REFERENCES PLAYER(SID),
            FOREIGN KEY(Hitter) REFERENCES PLAYER(SID)
        )`,

        `CREATE TABLE Relative(
            SID VARCHAR(255),
            Relation VARCHAR(255),
            Phone VARCHAR(255),
            Name VARCHAR(255),
            FOREIGN KEY(SID) REFERENCES Player(SID)
        )`,

        `CREATE TABLE Attendance(
            GID INT,
            SID VARCHAR(255),
            Position VARCHAR(255),
            FOREIGN KEY(GID) REFERENCES Game(GID),
            FOREIGN KEY(SID) REFERENCES Player(SID)
        )`,

        `CREATE TABLE CanPosition(
            SID VARCHAR(255),
            Position VARCHAR(255),
            FOREIGN KEY(SID) REFERENCES Player(SID)
        )`
    ]

    for ( let i = 0; i < addTable_sqls.length; i++ ) {
        addTable_con.query( addTable_sqls[i], ( err, result ) => {
            if ( err ) throw err
            console.log( 'create table' )
        } )
    }

    addTable_con.end()
} )