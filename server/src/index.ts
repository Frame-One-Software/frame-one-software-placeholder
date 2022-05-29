import 'module-alias/register';
import sourceMapSupport from "source-map-support";
import {getApp, getServer} from "./services/express";
import express from "express";

sourceMapSupport.install();

// set the env variables
process.env.PORT = process.env.PORT ? process.env.PORT : "80";
process.env.SHOW_DETAILS = process.env.SHOW_DETAILS ? process.env.SHOW_DETAILS : "true";
process.env.REDIRECT_TO = process.env.REDIRECT_TO ? process.env.REDIRECT_TO : "/details";
process.env.REDIRECT_HTTP_STATUS_CODE = process.env.REDIRECT_HTTP_STATUS_CODE ? process.env.REDIRECT_HTTP_STATUS_CODE : "302";

async function main() {

	// init the middleware
	require("@/middleware");

	// make a static bucket
	getApp().use("/static", express.static('static'));

	// init the routes
	require("@/routes");

	// getting the server object will cause the server to listen
	await getServer();
}

// we do not want to handle the uncaught exceptions, we use the process listeners instead.
main();