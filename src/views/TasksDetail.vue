<script>
import { useTaskStore } from "../stores/tasks.js";

export default {
	props: ["id"],
	methods: {
		goBack() {
			this.$router.push({ name: "Tasks" });
		},
	},
	computed: {
		taskStore() {
			return useTaskStore();
		},
		currentTask() {
			return this.taskStore.findTask(this.id);
		},
		isTaskLoading() {
			return this.taskStore.isTaskLoading;
		},
		isError() {
			return this.taskStore.isError;
		},
		displayIndex() {
			return this.$route.query.index || null;
		},
	},
};
</script>

<template>
	<div>
		<div v-if="!currentTask">Задача не найдена</div>
		<div v-else-if="isTaskLoading">Загрузка...</div>
		<div v-else-if="isError">Ошибка загрузки задачи</div>
		<div v-else>
			<h1>
				<span v-if="displayIndex">#{{ displayIndex }}</span>
				. {{ currentTask?.title }}
			</h1>
			<p>Статус: {{ currentTask?.completed ? "Выполнено" : "Активно" }}</p>
			<button @click="goBack">Назад к списку</button>
			<br />
			<br />
			<hr />
			<br />
			<h2>Детальная информация</h2>
			<span
				>ID Задачи: 
				<strong>{{ currentTask?.id || "ID не найден" }}</strong></span
			>
		</div>
	</div>
</template>
