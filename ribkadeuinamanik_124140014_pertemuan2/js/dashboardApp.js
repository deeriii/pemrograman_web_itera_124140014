import { createTask } from './modules/TaskItem.js';
import { formatDate } from './modules/utils.js';
import { defaultTasks } from './modules/data.js';

export class DashboardApp {
    constructor() {
        this.tasks = [];
        this.STORAGE_KEY = "itera_dashboard_tasks";

        //element selection
        this.taskListEl = document.getElementById("task-list");
        this.taskForm = document.getElementById("task-form");
        this.weatherEl = document.getElementById("weather-widget");
        this.quoteEl = document.getElementById("quote-container");
        this.filterEl = document.getElementById("filter-category");
    }

    //inisialisasi aplikasi
    async init() {
        this.loadLocalStorage();
        this.bindEvents();

        await Promise.all([
            this.fetchWeather(),
            this.fetchQuote()
        ]);

        this.render();
    }

    //mengambil data cuaca lokal kampus ITERA dari Open-Meteo API (Async/Await)
    async fetchWeather() {
        try {
            const url = "https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current_weather=true";
            const response = await fetch(url);
            if (!response.ok) throw new Error();
            const { current_weather } = await response.json();

            this.weatherEl.innerHTML = `
                <span class="font-bold">${current_weather.temperature}°C</span>
                <span class="text-[10px] text-pink-400 block">ITERA Lampung</span>
            `;
        } catch (error) {
            this.weatherEl.innerHTML = `<span class="text-[10px] text-pink-400">Cuaca Offline</span>`;
        }
    }

    //mengambil kutipan motivasi harian (Async/Await)
    async fetchQuote() {
        try {
            const res = await fetch("https://dummyjson.com/quotes/random");
            if (!res.ok) throw new Error();
            const { quote, author } = await res.json();
            this.quoteEl.innerHTML = `"${quote}" — <span class="text-pink-500 font-medium">${author}</span>`;
        } catch (error) {
            this.quoteEl.innerHTML = `"Semangat menjalani perkuliahan hari ini!"`;
        }
    }

    //pengelolaan LocalStorage
    loadLocalStorage() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        // Jika localStorage belum pernah diisi, pakai data awal dari data.js
        const source = data ? JSON.parse(data) : defaultTasks;

        this.tasks = source.map(({ id, title, category, detail, isCompleted, createdAt, deadline }) =>
            createTask(id, title, category, detail, isCompleted, createdAt, deadline)
        );
    }

    saveLocalStorage() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks));
    }

    //bind event listeners
    bindEvents() {
        this.taskForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        this.filterEl.addEventListener("change", () => this.render());

        document.getElementById("cancel-btn").addEventListener("click", () => this.resetForm());
    }

    //CRUD
    handleFormSubmit() {
        const id = document.getElementById("task-id").value;
        const title = document.getElementById("task-title").value;
        const category = document.getElementById("task-category").value;
        const detail = document.getElementById("task-detail").value;
        const deadline = document.getElementById("task-deadline").value;

        if (id) {
            // Edit: createdAt lama dipertahankan
            this.tasks = this.tasks.map(task =>
                task.id === id
                    ? createTask(id, title, category, detail, task.isCompleted, task.createdAt, deadline)
                    : task
            );
        } else {
            const newTask = createTask(undefined, title, category, detail, false, undefined, deadline);
            this.tasks = [...this.tasks, newTask];
        }

        this.saveLocalStorage();
        this.resetForm();
        this.render();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveLocalStorage();
        this.render();
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.toggleComplete();
            this.saveLocalStorage();
            this.render();
        }
    }

    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;

        document.getElementById("task-id").value = task.id;
        document.getElementById("task-title").value = task.title;
        document.getElementById("task-category").value = task.category;
        document.getElementById("task-detail").value = task.detail;
        document.getElementById("task-deadline").value = task.deadline;

        document.getElementById("form-title").textContent = "Edit Kegiatan";
        document.getElementById("submit-btn").textContent = "Update";
        document.getElementById("cancel-btn").classList.remove("hidden");
    }

    resetForm() {
        this.taskForm.reset();
        document.getElementById("task-id").value = "";
        document.getElementById("form-title").textContent = "Tambah Kegiatan";
        document.getElementById("submit-btn").textContent = "Simpan";
        document.getElementById("cancel-btn").classList.add("hidden");
    }

    // render UI ke DOM
    render() {
        const selectedCategory = this.filterEl.value;

        // let: nilainya di-reassign kalau ada filter kategori
        let filteredTasks = this.tasks;
        if (selectedCategory !== "Semua") {
            filteredTasks = filteredTasks.filter(t => t.category === selectedCategory);
        }

        document.getElementById("stat-total").textContent = this.tasks.length;
        document.getElementById("stat-completed").textContent = this.tasks.filter(t => t.isCompleted).length;

        if (filteredTasks.length === 0) {
            this.taskListEl.innerHTML = `
                <div class="text-center py-8 text-gray-300 text-xs">
                    Belum ada catatan tersimpan.
                </div>
            `;
            return;
        }

        this.taskListEl.innerHTML = filteredTasks.map((task) => {
            const { id, title, category, detail, isCompleted, createdAt } = task;
            const status = task.getDeadlineStatus();

            const categoryBadgeColor = {
                Kuliah: "bg-pink-100 text-pink-600",
                Tugas: "bg-rose-100 text-rose-600",
                Catatan: "bg-amber-100 text-amber-600",
                Organisasi: "bg-purple-100 text-purple-600"
            }[category] || "bg-gray-100 text-gray-600";

            return `
                <div class="p-3 border border-pink-100 rounded-xl flex items-center justify-between gap-2 bg-white hover:bg-pink-50/30 transition">
                    <div class="flex items-center gap-2.5 flex-1 min-w-0">
                        <input type="checkbox" ${isCompleted ? 'checked' : ''} 
                            data-action="toggle" data-id="${id}"
                            class="w-4 h-4 accent-pink-500 rounded cursor-pointer">
                        <div class="min-w-0 flex-1">
                            <div class="flex items-center gap-1.5 mb-0.5">
                                <span class="px-2 py-0.2 text-[9px] font-semibold rounded-full ${categoryBadgeColor}">
                                    ${task.getLabel()}
                                </span>
                                <span class="text-[9px] text-gray-300">${formatDate(createdAt)}</span>
                                ${status ? `<span class="px-2 py-0.2 text-[9px] font-semibold rounded-full ${status.color}">${status.text}</span>` : ''}
                            </div>
                            <h3 class="text-xs font-semibold text-gray-700 truncate ${isCompleted ? 'completed-task' : ''}">
                                ${title}
                            </h3>
                            ${detail ? `<p class="text-[11px] text-gray-400 truncate">${detail}</p>` : ''}
                        </div>
                    </div>
                    <div class="flex items-center gap-1">
                        <button data-action="edit" data-id="${id}" class="px-2 py-1 text-gray-400 hover:text-pink-500 text-[11px]">
                            Edit
                        </button>
                        <button data-action="delete" data-id="${id}" class="px-2 py-1 text-gray-400 hover:text-red-400 text-[11px]">
                            Hapus
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        this.taskListEl.onclick = (e) => {
            const target = e.target.closest("[data-action]");
            if (!target) return;
            const { action, id } = target.dataset;
            if (action === "toggle") this.toggleTask(id);
            if (action === "edit") this.editTask(id);
            if (action === "delete") this.deleteTask(id);
        };
    }
}