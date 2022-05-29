import {getApp} from "@/services/express";

getApp().get("/*", (req, res) => {
	res
		.status(Number(process.env.REDIRECT_HTTP_STATUS_CODE))
		.redirect(process.env.REDIRECT_TO);
});