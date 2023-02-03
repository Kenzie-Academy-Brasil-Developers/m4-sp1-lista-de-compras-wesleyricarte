import express, { Application } from "express";
import {
	createNewList,
	getAllLists,
	getList,
	updateItemList,
	deleteItemList,
	deleteList,
} from "./logic";

const app: Application = express();
app.use(express.json());

app.post("/purchaseList", createNewList);

app.get("/purchaseList", getAllLists);

app.get("/purchaseList/:purchaseListId", getList);

app.patch("/purchaseList/:purchaseListId/:itemName", updateItemList);

app.delete("/purchaseList/:purchaseListId/:itemName", deleteItemList);

app.delete("/purchaseList/:purchaseListId", deleteList);

app.listen(3000, () => {
	console.log("Server is running!");
});