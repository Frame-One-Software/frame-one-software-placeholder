import 'module-alias/register';
import sourceMapSupport from "source-map-support";
import {getApp, getServer} from "./services/express";
import express from "express";

sourceMapSupport.install();

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