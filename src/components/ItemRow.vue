<script>
export default {
	props: {
		id: {
			type: Number,
			required: true, // Говорит: «Этот пропс ОБЯЗАТЕЛЕН. Без него нельзя».
		},
		title: {
			type: String,
			required: true, // Говорит: «Этот пропс ОБЯЗАТЕЛЕН. Без него нельзя».
		},
	},
	methods: {
		handleRemove() {
			this.$emit("remove", this.id);
		},
	},
};
</script>

<template>
	<li>
		{{ id }}. {{ title }}
		<button @click="handleRemove">Удалить</button>
	</li>
</template>
