import * as core from "express-serve-static-core";
import express from "express";
import http from "http";

let app: core.Express;
let server: http.Server;

export function getApp(): core.Express {

	if (!app) {
		app = express();
	}

	return app;
}

export function getServer() {

	if (!server) {
		server = getApp().listen(process.env.PORT ?? 80, () => {
			console.log(`Rest server started on ${process.env.PORT ?? 80}.`);
		});
	}

	return server;
}

export function closeServer(): Promise<void> {
	return new Promise<void>((resolve) => {
		if (!server) {
			resolve();
		}

		server.close((err) => {
			if (err) {
				console.error(err);
			} else {
				console.log("Express server successfully stopped");

			}

			resolve();
		});
	})

}