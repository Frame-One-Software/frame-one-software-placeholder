import {getApp} from "@/services/express";
import axios from "axios";
import si from "systeminformation";
import formatBytes from "@/utils/formatBytes";
import {currentRouteLogs} from "@/middleware/routeLogger";
import getIPAddress from "@/utils/getIPAddress";

getApp().get("/", async (req, res) => {

	// get the egress ip
	const {data: {ip: egressIp}} = await axios.get("https://api64.ipify.org?format=json");

	// grab all variables that would be sent to a react app
	const reactAppVariables = Object.entries(process.env)
		.filter(([key]) => key.startsWith("REACT_APP"));

	// add cloud run variables
	const cloudRunVariables = [
		["Cloud Run Service Name (K_SERVICE)", process.env.K_SERVICE],
		["Cloud Run Revision Name (K_REVISION)", process.env.K_REVISION],
		["Cloud Run Configuration Name (K_CONFIGURATION)", process.env.K_CONFIGURATION],
	].filter(([, value]) => value != null);

	// grab OS information
	const {
		platform,
		distro,
		release,
		hostname
	} = await si.osInfo();
	const {
		active,
		total
	} = await si.mem();
	const {
		manufacturer,
		brand,
		speed,
		cores,
		processors,
	} = await si.cpu();
	const {
		currentLoad,
		avgLoad,
	} = await si.currentLoad();
	const OsInformation = [
		["Server Hostname", hostname],
		["Server OS (Distro / Platform / Release)", `${distro} / ${platform} / ${release}`],
		["Memory (Used / Total)", `${formatBytes(active)} / ${formatBytes(total)}`],
		["CPU", `${manufacturer} ${brand}`],
		["CPU Speed", `${speed}GHz`],
		["CPU Cores (Processors)", `${cores} (${processors})`],
		["CPU Load (Current / Average)", `${currentLoad.toFixed(2)}% / ${avgLoad.toFixed(2)}%`]
	]

	// grab docker info
	let dockerContainerData = [];
	try {
		dockerContainerData = await si.dockerContainers();
	} catch (err) {
	}

	// grab timezone information
	const {
		timezone,
		timezoneName
	} = await si.time();

	// assemble the table
	const tableValues = [
		["Egress IP", egressIp],
		["Caller IP", getIPAddress(req)],
		["Port", process.env.PORT ?? 80],
		["Timezone", `${timezoneName} (${timezone})`],
		...OsInformation,
		...cloudRunVariables,
		...reactAppVariables,
	]

	// add placeholder for undefined values
	const table = tableValues.map(([key, value]) => [key, value ?? "N/A"])

	res.render("../pages/home", {
		table,
		dockerContainerData,
		currentRouteLogs
	});
})