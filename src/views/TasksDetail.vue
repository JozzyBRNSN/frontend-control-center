<script>
export default {
	props: ["id"],
	data() {
		return {
			task: null,
			isLoading: true,
			isError: false,
		};
	},
	methods: {
		async fetchTasks() {
			this.isLoading = true;
			this.isError = false;
			try {
				const response = await fetch(
					`https://jsonplaceholder.typicode.com/todos/${this.id}`
				);
				if (!response.ok) throw new Error("Ошибка сети");
				const data = await response.json();
				this.task = {
					userId: data.userId,
					id: data.id,
					title: `Задача ${this.id}: ${data.title}`,
					completed: data.completed,
				};
			} catch (e) {
				this.isError = true;
			} finally {
				this.isLoading = false;
			}
		},

		goBack() {
			this.$router.push({ name: "Tasks" });
		},
	},
	mounted() {
		this.fetchTasks();
	},
};
</script>

<template>
	<div>
		<div v-if="isLoading">Загрузка...</div>
		<div v-else-if="isError">Ошибка загрузки задачи</div>
		<div v-else>
			<h1>{{ task.title }}</h1>
			<p>Статус: {{ task.completed ? "Выполнено" : "Активно" }}</p>
			<button @click="goBack">Назад к списку</button>
			<br />
			<br />
			<hr />
			<br />
			<h2>Детальная информация</h2>
			<br />
			<span
				>Номер пользователя добавившего задачу:
				<strong>{{ task.userId }}</strong></span
			>
		</div>
	</div>
</template>
