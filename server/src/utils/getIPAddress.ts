import isIP from "is-ip";
import {Request} from "express";

function getIPAddress(req: Request): string | undefined {

	// this is a list of all places we could grab something close to the ip address, in order of what is best
	const possibleIPLocations = [
		req?.headers["x-appengine-user-ip"], // app engine/cloud run forwarded from proxy
		req?.ip,
		...(Array.isArray(req.ips) ? req.ips : []),
		req?.connection?.remoteAddress,
		req?.headers["x-forwarded-for"],
		req?.headers["x-google-real-ip"],
		req?.headers['x-real-ip']
	]

	for (const ip of possibleIPLocations) {
		let _ip = typeof ip === "string" ? ip : ip?.toString();
		if (isIP(_ip)) {
			return _ip;
		}
	}

}

export default getIPAddress;