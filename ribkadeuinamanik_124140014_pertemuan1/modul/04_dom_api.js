console.log("=== BAB 4: DOM & FETCH API ===");

// -------------------------------------------------------------
// 1. Dark Mode Toggle
// -------------------------------------------------------------
const btnDarkMode = document.getElementById("btn-dark-mode");
btnDarkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// -------------------------------------------------------------
// 2. Form Mahasiswa + Validasi + LocalStorage
// -------------------------------------------------------------
const formMhs = document.getElementById("form-mhs");
const inputNama = document.getElementById("mhs-nama");
const inputNim = document.getElementById("mhs-nim");
const errorMhs = document.getElementById("error-mhs");
const listMhs = document.getElementById("list-mhs");

let dataMhs = JSON.parse(localStorage.getItem("data_mhs")) || [];

function renderMhs() {
  listMhs.innerHTML = "";
  dataMhs.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nama} (${item.nim})`;
    listMhs.appendChild(li);
  });
  localStorage.setItem("data_mhs", JSON.stringify(dataMhs));
}

formMhs.addEventListener("submit", (e) => {
  e.preventDefault();
  const nama = inputNama.value.trim();
  const nim = inputNim.value.trim();

  // Validasi Form
  if (nama === "" || nim === "") {
    errorMhs.textContent = "Nama dan NIM wajib diisi!";
    return;
  }
  errorMhs.textContent = "";

  dataMhs.push({ nama, nim });
  renderMhs();
  formMhs.reset();
});
renderMhs();

// -------------------------------------------------------------
// 3. Aplikasi Todo List + LocalStorage + DOM Manipulation
// -------------------------------------------------------------
const formTodo = document.getElementById("form-todo");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos_data")) || [];

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    
    const span = document.createElement("span");
    span.textContent = todo.text;
    if (todo.completed) span.classList.add("completed");
    span.style.cursor = "pointer";
    
    // Toggle Selesai
    span.addEventListener("click", () => {
      todos[index].completed = !todos[index].completed;
      renderTodos();
    });

    // Tombol Hapus
    const btnHapus = document.createElement("button");
    btnHapus.textContent = "Hapus";
    btnHapus.addEventListener("click", () => {
      todos.splice(index, 1);
      renderTodos();
    });

    li.appendChild(span);
    li.appendChild(btnHapus);
    todoList.appendChild(li);
  });
  localStorage.setItem("todos_data", JSON.stringify(todos));
}

formTodo.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text !== "") {
    todos.push({ text: text, completed: false });
    todoInput.value = "";
    renderTodos();
  }
});
renderTodos();

// -------------------------------------------------------------
// 4 & 5. Fetch API, Search Filter & Pagination
// -------------------------------------------------------------
const postsContainer = document.getElementById("posts-container");
const searchInput = document.getElementById("search-post");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageInfo = document.getElementById("page-info");

let allPosts = [];
let currentPage = 1;
const limit = 5;

async function fetchPosts() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    allPosts = await res.json();
    renderPosts();
  } catch (err) {
    postsContainer.textContent = "Gagal memuat data dari API.";
  }
}

function renderPosts() {
  // Filter berdasarkan search input
  const keyword = searchInput.value.toLowerCase();
  const filteredPosts = allPosts.filter(post => post.title.toLowerCase().includes(keyword));

  // Hitung Pagination
  const totalPages = Math.ceil(filteredPosts.length / limit) || 1;
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const start = (currentPage - 1) * limit;
  const paginatedPosts = filteredPosts.slice(start, start + limit);

  // Render UI
  postsContainer.innerHTML = "";
  if (paginatedPosts.length === 0) {
    postsContainer.textContent = "Posting tidak ditemukan.";
  } else {
    paginatedPosts.forEach(post => {
      const div = document.createElement("div");
      div.className = "post-item";
      div.innerHTML = `<h4>${post.title}</h4><p>${post.body}</p>`;
      postsContainer.appendChild(div);
    });
  }

  pageInfo.textContent = `Halaman ${currentPage} dari ${totalPages}`;
  btnPrev.disabled = currentPage === 1;
  btnNext.disabled = currentPage === totalPages;
}

// Event Listeners Pagination & Search
searchInput.addEventListener("input", () => {
  currentPage = 1;
  renderPosts();
});

btnPrev.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderPosts();
  }
});

btnNext.addEventListener("click", () => {
  currentPage++;
  renderPosts();
});

// Load awal API
fetchPosts();