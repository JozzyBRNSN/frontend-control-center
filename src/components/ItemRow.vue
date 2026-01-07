<script>
export default {
	data() {
		return {
			isEditing: false,
			editTitle: this.title,
		};
	},
	props: {
		id: {
			type: Number,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		completed: {
			type: Boolean,
			required: true,
		},
	},
	methods: {
		handleRemove() {
			this.$emit("remove", this.id);
		},
		startEdit() {
			this.isEditing = true;
			this.editTitle = this.title;
		},
		cancelEdit() {
			this.isEditing = false;
			this.editTitle = this.title;
		},
		saveEdit() {
			this.$emit("update", {
				id: this.id,
				title: this.editTitle,
			});
			this.cancelEdit();
		},
	},
};
</script>

<template>
	<li v-if="!isEditing">
		<input type="checkbox" :checked="completed" @change="$emit('toggle')" />
		<span>{{ id }}. {{ title }}</span>
		<button @click="startEdit">Редактировать</button>
		<button @click="handleRemove">Удалить</button>
	</li>
	<li v-else>
		<input v-model="editTitle" />
		<button @click="saveEdit">Сохранить</button>
		<button @click="cancelEdit">Отмена</button>
	</li>
</template>
