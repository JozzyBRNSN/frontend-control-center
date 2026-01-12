import { createRouter, createWebHistory } from "vue-router";
import Tasks from "../views/Tasks.vue";
import TasksDetail from "../views/TasksDetail.vue";

const routes = [
	{
		path: "/",
		name: "Tasks",
		component: Tasks,
	},
	{
		path: "/tasks/:id",
		name: "TaskDetail",
		component: TasksDetail,
		props: true,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
