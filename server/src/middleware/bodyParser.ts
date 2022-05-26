import {getApp} from "@/services/express";
import * as express from "express";

getApp().use(express.json({
	limit: '10mb',
}));

getApp().use(express.urlencoded({
	extended: true,
	limit: '10mb',
}));