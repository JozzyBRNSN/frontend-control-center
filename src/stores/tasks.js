import { defineStore } from "pinia";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const STORAGE_KEY = "tasks";

export const useTaskStore = defineStore("tasks", {
	state: () => ({
		items: loadFromStorage(STORAGE_KEY) || [],
		isLoading: false,
		isError: false,
		isTaskLoading: false,
	}),
	actions: {
		persist() {
			saveToStorage(STORAGE_KEY, this.items);
		},
		addTask(title) {
			if (title.trim() === "") {
				return;
			}
			const maxId = this.items.length
				? Math.max(...this.items.map(item => item.id))
				: 0;
			const newId = maxId + 1;
			this.items.push({ id: newId, title: title, completed: false });
			this.persist();
		},
		removeTask(id) {
			this.items = this.items.filter(item => item.id !== id);
			this.persist();
		},
		updateTask({ id, title }) {
			const task = this.items.find(item => item.id === id);
			if (task) {
				task.title = title;
			}
			this.persist();
		},
		toggleTaskStatus(id) {
			const task = this.items.find(item => item.id === id);
			if (task) {
				task.completed = !task.completed;
			}
			this.persist();
		},
		async fetchTasks() {
			this.isLoading = true;
			this.isError = false;
			try {
				const response = await fetch(
					"https://jsonplaceholder.typicode.com/todos?_limit=10"
				);
				if (!response.ok) throw new Error("Ошибка сети");
				const data = await response.json();
				this.items = data.map(d => ({
					id: d.id,
					title: d.title,
					completed: d.completed,
				}));
				this.persist();
			} catch (e) {
				this.isError = true;
			} finally {
				this.isLoading = false;
			}
		},
	},
	getters: {
		findTask: state => id => {
			return state.items.find(task => task.id === Number(id));
		},
	},
});
