import { formatDate } from './utils.js';

// Class ES6 untuk memodelkan struktur data setiap tugas/catatan
export class TaskItem {
    // Default parameters: id, category, detail, isCompleted, createdAt, deadline punya nilai bawaan
    constructor(
        id = Date.now().toString(),
        title,
        category = "Kuliah",
        detail = "",
        isCompleted = false,
        createdAt = new Date().toISOString(),
        deadline = ""
    ) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.detail = detail;
        this.isCompleted = isCompleted;
        this.createdAt = createdAt;
        this.deadline = deadline;
    }

    // Method shorthand untuk mengubah status kelengkapan tugas
    toggleComplete() {
        this.isCompleted = !this.isCompleted;
    }

    // Teks label yang tampil di badge
    getLabel() {
        return this.category;
    }

    // Status tenggat: Terlambat / Hari ini / tanggal tenggat (null jika tidak ada atau sudah selesai)
    getDeadlineStatus() {
        if (!this.deadline || this.isCompleted) return null;
        const today = new Date().toLocaleDateString("en-CA"); // format YYYY-MM-DD
        if (this.deadline < today) return { text: "Terlambat", color: "bg-red-100 text-red-600" };
        if (this.deadline === today) return { text: "Hari ini", color: "bg-amber-100 text-amber-600" };
        return { text: `Tenggat ${formatDate(this.deadline)}`, color: "bg-sky-100 text-sky-600" };
    }
}

// Inheritance: tugas kategori "Tugas" punya label khusus
export class AssignmentTask extends TaskItem {
    constructor(id, title, detail, isCompleted, createdAt, deadline) {
        super(id, title, "Tugas", detail, isCompleted, createdAt, deadline);
    }

    // Override method parent
    getLabel() {
        return `${super.getLabel()} • Prioritas`;
    }
}

// Factory: pilih class sesuai kategori
export const createTask = (id, title, category, detail, isCompleted, createdAt, deadline) =>
    category === "Tugas"
        ? new AssignmentTask(id, title, detail, isCompleted, createdAt, deadline)
        : new TaskItem(id, title, category, detail, isCompleted, createdAt, deadline);