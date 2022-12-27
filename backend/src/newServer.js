// import 
const http = require( 'http' )
const express = require( 'express' )
const SocketServer = require( 'ws' ).Server
const wsConnect = require( './newWsConnect' ).wsConnect

const test = require( './testCase/test.js' ).test

// constant 
const SERVER_IP = '172.20.10.3'
const TEST = false

// make server 
const app = express()
const server = http.createServer( app )
const serverWS = new SocketServer( { server } )

const PORT = 4000
server.listen( PORT, SERVER_IP, () => { console.log( `Listening on ${SERVER_IP}:${PORT}` ) } )

if ( TEST ) { test() }

serverWS.on( 'connection', ( clientWS ) => {
    console.log( 'client connected' )
    clientWS.onmessage = wsConnect.onMessage( serverWS, clientWS )
} )