<script>
import FilterButtons from "./components/FilterButtons.vue";
import ItemRow from "./components/ItemRow.vue";

export default {
	components: {
		ItemRow,
		FilterButtons,
	},
	data() {
		return {
			items: [],
			value: "",
			activeFilter: "all",
		};
	},
	methods: {
		addNewItem() {
			if (this.value.trim() === "") {
				return;
			}
			const maxId = this.items.length
				? Math.max(...this.items.map(item => item.id))
				: 0;
			const newId = maxId + 1;
			this.items.push({ id: newId, title: this.value });
			this.value = "";
		},
		removeItem(id) {
			this.items = this.items.filter(item => item.id !== id);
		},
		updateItem({ id, title }) {
			const item = this.items.find(item => item.id === id);
			if (item) {
				item.title = title;
			}
		},
		setFilter(filter) {
			this.activeFilter = filter;
		},
		toggleCompleted(id) {
			const item = this.items.find(item => item.id === id);
			if (item) {
				item.completed = !item.completed;
			}
		},
	},
	computed: {
		totalCount() {
			return this.items.length;
		},
		completedCount() {
			return this.items.filter(item => item.completed).length;
		},
		activeCount() {
			return this.items.filter(item => !item.completed).length;
		},
		visibleItems() {
			if (this.activeFilter === "all") {
				return this.items;
			} else if (this.activeFilter === "completed") {
				return this.items.filter(item => item.completed);
			} else if (this.activeFilter === "active") {
				return this.items.filter(item => !item.completed);
			}
		},
	},
};
</script>

<template>
	<div>
		Всего: {{ totalCount }}, Активные: {{ activeCount }}, Завершенные:
		{{ completedCount }}
	</div>
	<FilterButtons :activeFilter="activeFilter" @set-filter="setFilter" />
	<ul>
		<ItemRow
			v-for="item in visibleItems"
			:key="item.id"
			:id="item.id"
			:title="item.title"
			:completed="item.completed"
			@remove="removeItem"
			@update="updateItem"
			@change="toggleCompleted(item.id)"
		/>
	</ul>
	<input type="text" v-model="value" @keyup.enter="addNewItem" />
	<button @click="addNewItem">Добавить</button>
</template>
