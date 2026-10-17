// Data awal untuk inisialisasi jika localStorage masih kosong
export const defaultTasks = [
    {
        id: "101",
        title: "Tugas paw",
        category: "Kuliah",
        detail: "dl besok",
        isCompleted: false,
        createdAt: new Date().toISOString()
    },
    {
        id: "102",
        title: "beli alat tulis",
        category: "Catatan",
        detail: "jam 13.00",
        isCompleted: true,
        createdAt: new Date().toISOString()
    }
];