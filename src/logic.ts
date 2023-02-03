import { Request, Response } from "express";
import { ids, listArr } from "./database";
import { iNewListRequest, iNewListResponse } from "./interfaces";
import { validateDataNewList, validateUpdateItemKeys } from "./middlewares";

export const createNewList = (request: Request, response: Response) => {
	try {
		const listData: iNewListRequest = validateDataNewList(request.body);

		let id = 1;
		listArr.length && (id = listArr[listArr.length - 1].id + 1);

		const newListData: iNewListResponse = {
			id: id,
			...listData,
		};

		ids.push(id);
		listArr.push(newListData);

		return response.status(201).json(newListData);
	} catch (error) {
		if (error instanceof Error) {
			return response.status(400).json({
				message: error.message,
			});
		}
	}
};

export const getAllLists = (request: Request, response: Response) => {
	return response.status(200).json(listArr);
};

export const getList = (request: Request, response: Response) => {
	const purchaseListId: number = parseInt(request.params.purchaseListId);

	const listFind = listArr.find((element) => element.id === purchaseListId);

	listFind
		? response.status(200).json(listFind)
		: response.status(404).json({
				message: `List with id "${purchaseListId}" does not exist`,
		  });
};

export const updateItemList = (request: Request, response: Response) => {
	try {
		const purchaseListId: number = parseInt(request.params.purchaseListId);

		const indexList = listArr.findIndex(
			(element) => element.id === purchaseListId
		);

		if (indexList === -1) {
			return response.status(404).json({
				message: `List with id "${purchaseListId}" does not exist`,
			});
		}

		const itemName: string = request.params.itemName;

		const indexItem = listArr[indexList].data.findIndex(
			(el) => el.name === itemName
		);

		if (indexItem === -1) {
			return response.status(404).json({
				message: `Item with name "${itemName}" does not exist`,
			});
		}

		const itemData = validateUpdateItemKeys(request.body);

		listArr[indexList].data.splice(indexItem, 1);

		listArr[indexList].data = [...listArr[indexList].data, itemData];

		return response.status(200).json(itemData);
	} catch (error) {
		if (error instanceof Error) {
			return response.status(400).json({
				message: error.message,
			});
		}
	}
};

export const deleteItemList = (request: Request, response: Response) => {
	const purchaseListId: number = parseInt(request.params.purchaseListId);

	const indexList = listArr.findIndex(
		(element) => element.id === purchaseListId
	);

	if (indexList === -1) {
		return response.status(404).json({
			message: `List with id "${purchaseListId}" does not exist`,
		});
	}

	const itemName: string = request.params.itemName;

	const indexItem = listArr[indexList].data.findIndex(
		(el) => el.name === itemName
	);

	if (indexItem === -1) {
		return response.status(404).json({
			message: `Item with name "${itemName}" does not exist`,
		});
	}

	listArr[indexList].data.splice(indexItem, 1);

	return response.status(204).send();
};

export const deleteList = (request: Request, response: Response) => {
	const purchaseListId: number = parseInt(request.params.purchaseListId);

	const indexList = listArr.findIndex(
		(element) => element.id === purchaseListId
	);

	if (indexList === -1) {
		return response.status(404).json({
			message: `List with id "${purchaseListId}" does not exist`,
		});
	}

	listArr.splice(indexList, 1);

	return response.status(204).send();
};
