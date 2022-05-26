import {getApp} from "@/services/express";
import axios from "axios";

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
	].filter(([,value]) => value != null);

	// assemble the table
	const tableValues = [
		["Egress IP", egressIp],
		["PORT", process.env.PORT ?? 80],
		...cloudRunVariables,
		...reactAppVariables
	]

	// add placeholder for undefined values
	const table = tableValues.map(([key, value]) => [key, value ?? "N/A"])

	res.render("../pages/home", {
		table
	});
})