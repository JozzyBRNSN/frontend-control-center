<script>
export default {
	props: {
		activeFilter: {
			type: String,
			required: true,
		},
	},
};
</script>

<template>
	<div class="filter-buttons">
		<button
			@click="$emit('set-filter', 'all')"
			:disabled="activeFilter === 'all'"
		>
			Все
		</button>
		<button
			@click="$emit('set-filter', 'active')"
			:disabled="activeFilter === 'active'"
		>
			Активные
		</button>
		<button
			@click="$emit('set-filter', 'completed')"
			:disabled="activeFilter === 'completed'"
		>
			Завершенные
		</button>
	</div>
</template>
