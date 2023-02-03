export interface iItem {
	name: string;
	quantity: string;
}

export interface iNewListRequest {
	listName: string;
	data: Array<iItem>;
}

export interface iNewListResponse extends iNewListRequest {
	id: number;
}

export type NewListRequiredKeys = "listName" | "data";

export type newItemRequiredKeys = "name" | "quantity";