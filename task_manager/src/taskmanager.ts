interface Task {
    id: number,
    title: string,
    description?: string,
    completed: boolean,
    priority: Priority
}

enum Priority {
    LOW = 0,
    MEDIUM = 1,
    HIGH = 2
}

class TaskManager {
    private tasks: Task[] = [];
    private maxTasks = 10;

    addTask(task: Task) {
        if(this.tasks.length < 10) {
            this.tasks.push(task);
        } else {
            console.log("Cannot add task, maximum capacity reached!");
        }
    }

    removeById(id: number) {
        this.tasks.forEach((task, index) => {
            if(task.id === id) {
                this.tasks = this.tasks.filter(task => task.id !== id);
                return;                
            }
        });

        console.log("Task not found!");
    }

    getCompleted(): Task[] {
        return this.tasks.filter(task => task.completed);
    }

    getPending(): Task[] {
        return this.tasks.filter(task => !task.completed);
    }

    getTasks(): Task[] {
        return this.tasks;
    }

    filterByPriority(): Task[] {
        return [...this.tasks].sort((a, b) => b.priority - a.priority);
    }
}

const task1: Task = {
    id: 1,
    title: "ha",
    completed: true,
    priority: Priority.LOW
}

const task2: Task = {
    id: 2,
    title: "Ba",
    completed: false,
    priority: Priority.HIGH
}

const task3: Task = {
    id: 3,
    title: "d",
    completed: true,
    priority: Priority.LOW
}

const task4: Task = {
    id: 4,
    title: "c",
    completed: true,
    priority: Priority.MEDIUM
}

const task5: Task = {
    id: 5,
    title: "m",
    completed: false,
    priority: Priority.HIGH
}

const task6: Task = {
    id: 6,
    title: "o",
    completed: true,
    priority: Priority.MEDIUM
}

const tasks = new TaskManager();
tasks.addTask(task1);
tasks.addTask(task2);
tasks.addTask(task3);
tasks.addTask(task4);
tasks.addTask(task5);
tasks.addTask(task6);