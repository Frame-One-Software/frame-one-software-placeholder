import {getApp} from "@/services/express";
import {exec} from "child_process";
import {promisify} from "util";

const execAsync = promisify(require('child_process').exec);

getApp().get("/speedtest", async (req, res) => {
	const { stdout } = await execAsync('speed-test --json');
	const {ping, download, upload} = JSON.parse(stdout);
	res.send({ping, download, upload});
})