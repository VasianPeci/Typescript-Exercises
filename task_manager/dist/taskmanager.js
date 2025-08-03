"use strict";
var Priority;
(function (Priority) {
    Priority[Priority["LOW"] = 0] = "LOW";
    Priority[Priority["MEDIUM"] = 1] = "MEDIUM";
    Priority[Priority["HIGH"] = 2] = "HIGH";
})(Priority || (Priority = {}));
class TaskManager {
    constructor() {
        this.tasks = [];
        this.maxTasks = 10;
    }
    addTask(task) {
        if (this.tasks.length < 10) {
            this.tasks.push(task);
        }
        else {
            console.log("Cannot add task, maximum capacity reached!");
        }
    }
    removeById(id) {
        this.tasks.forEach((task, index) => {
            if (task.id === id) {
                this.tasks = this.tasks.filter(task => task.id !== id);
                return;
            }
        });
        console.log("Task not found!");
    }
    getCompleted() {
        return this.tasks.filter(task => task.completed);
    }
    getPending() {
        return this.tasks.filter(task => !task.completed);
    }
    getTasks() {
        return this.tasks;
    }
    filterByPriority() {
        return [...this.tasks].sort((a, b) => b.priority - a.priority);
    }
}
const task1 = {
    id: 1,
    title: "ha",
    completed: true,
    priority: Priority.LOW
};
const task2 = {
    id: 2,
    title: "Ba",
    completed: false,
    priority: Priority.HIGH
};
const task3 = {
    id: 3,
    title: "d",
    completed: true,
    priority: Priority.LOW
};
const task4 = {
    id: 4,
    title: "c",
    completed: true,
    priority: Priority.MEDIUM
};
const task5 = {
    id: 5,
    title: "m",
    completed: false,
    priority: Priority.HIGH
};
const task6 = {
    id: 6,
    title: "o",
    completed: true,
    priority: Priority.MEDIUM
};
const tasks = new TaskManager();
tasks.addTask(task1);
tasks.addTask(task2);
tasks.addTask(task3);
tasks.addTask(task4);
tasks.addTask(task5);
tasks.addTask(task6);
