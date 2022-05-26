import {getApp} from "@/services/express";

getApp().all("*", (req, res) => res.sendStatus(404));