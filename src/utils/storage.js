export const loadFromStorage = key => {
	try {
		const data = localStorage.getItem(key);
		return data ? JSON.parse(data) : null;
	} catch (error) {
		console.warn("Не удалось загрузить из localStorage", error);
		return null;
	}
};

export const saveToStorage = (key, data) => {
	try {
		localStorage.setItem(key, JSON.stringify(data));
	} catch (error) {
		console.warn("Не удалось сохранить в localStorage", error);
	}
};
