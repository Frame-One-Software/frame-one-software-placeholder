import {getApp} from "@/services/express";
import {exec} from "child_process";
import {promisify} from "util";

const execAsync = promisify(exec);

getApp().get("/speedtest", async (req, res) => {
	try {
		const { stdout } = await execAsync('speed-test --json');
		const {ping, download, upload} = JSON.parse(stdout);
		res.send({ping, download, upload});
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
})