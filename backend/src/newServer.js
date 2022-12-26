// import 
const http = require( 'http' )
const express = require( 'express' )
const SocketServer = require( 'ws' ).Server

// constant 
SERVER_IP = 'localhost'

// make server 
const app = express()
const server = http.createServer( app )
const serverWS = new SocketServer( { server } )

const PORT = 4000
server.listen( PORT, SERVER_IP, () => { console.log( `Listening on ${SERVER_IP}:${PORT}` ) } )

serverWS.on( 'connection', ( clientWS ) => {
    console.log( 'client connected' )
    clientWS.onmessage = wsConnect.onMessage( serverWS, clientWS )
} )