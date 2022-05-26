import {getApp} from "@/services/express";
import getIPAddress from "@/utils/getIPAddress";

const currentRouteLogs: Array<{date: Date, statusCode: number, path: string, method: string, elapsedTimeMs: number, ip: string}> = []
export {currentRouteLogs};

getApp().use((req, res, next) => {
	const start = process.hrtime();

	res.on("finish", () => {
		const duration = process.hrtime(start);
		const ms = duration[0] * 1000 + duration[1] / 1e6;
		const ip = getIPAddress(req);
		console.log(res.statusCode, req.method, req.path, ':', ms.toFixed(0) + 'ms', `(${ip})`);
		currentRouteLogs.push({
			date: new Date(),
			statusCode: res.statusCode,
			path: req.path,
			method: req.method,
			elapsedTimeMs: ms,
			ip,
		})
	});

	next();
});


