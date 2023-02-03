import {
	iItem,
	iNewListRequest,
	newItemRequiredKeys,
	NewListRequiredKeys,
} from "./interfaces";

export const validateDataNewList = (payload: any): iNewListRequest => {
	const keys: Array<string> = Object.keys(payload);

	validateDataNewItem(payload.data);

	validateValuesNewItem(payload.data);

	const requiredKeys: Array<NewListRequiredKeys> = ["listName", "data"];

	const containsAllRequired: boolean = requiredKeys.every((key: string) => {
		return keys.includes(key);
	});

	const containsMoreKeys: boolean = keys.every((key: any) => {
		return requiredKeys.includes(key);
	});

	if (!containsAllRequired) {
		throw new Error(`Required keys are: ${requiredKeys}`);
	}

	if (!containsMoreKeys) {
		throw new Error(`Required keys are: ${requiredKeys}`);
	}

	return payload;
};

const validateDataNewItem = (payload: any): Array<iItem> => {
	payload.map((ele: iItem) => {
		const keysData = Object.keys(ele);

		const requiredKeysData: Array<newItemRequiredKeys> = [
			"name",
			"quantity",
		];

		const containsAllRequiredKeysData: boolean = requiredKeysData.every(
			(k: string) => keysData.includes(k)
		);

		if (!containsAllRequiredKeysData) {
			throw new Error(`Required keys are: ${requiredKeysData}`);
		}

		const containsMoreKeysData: boolean = keysData.every((k: any) =>
			requiredKeysData.includes(k)
		);

		if (!containsMoreKeysData) {
			throw new Error(`Required keys are: ${requiredKeysData}`);
		}
	});

	return payload;
};

const validateValuesNewItem = (payload: any): Array<iItem> => {
	payload.map((e: any) => {
		const valuesData = Object.values(e);

		valuesData.map((ele) => {
			if (typeof ele !== "string") {
				throw new Error("The list name need to be a string");
			}
		});
	});

	return payload;
};

export const validateUpdateItemKeys = (payload: any): any => {
	const keysData = Object.keys(payload);

	const requiredKeysData: Array<newItemRequiredKeys> = ["name", "quantity"];

	const containsAllRequiredKeysData: boolean = requiredKeysData.every(
		(k: string) => keysData.includes(k)
	);

	if (!containsAllRequiredKeysData) {
		throw new Error(`Required keys are: ${requiredKeysData}`);
	}

	const containsMoreKeysData: boolean = keysData.every((k: any) =>
		requiredKeysData.includes(k)
	);

	if (!containsMoreKeysData) {
		throw new Error(`Required keys are: ${requiredKeysData}`);
	}

	return validateUpdateItemValues(payload);
};

const validateUpdateItemValues = (payload: any): any => {
	const valuesData = Object.values(payload);

	valuesData.map((ele) => {
		if (typeof ele !== "string") {
			throw new Error("The list name need to be a string");
		}
	});

	return payload;
};
