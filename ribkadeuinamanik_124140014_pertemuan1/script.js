// State Aplikasi
let cart = JSON.parse(localStorage.getItem('cart_items')) || [];

// Inisialisasi Elemen DOM
const form = document.getElementById('item-form');
const itemNameInput = document.getElementById('item-name');
const itemPriceInput = document.getElementById('item-price');
const itemQtyInput = document.getElementById('item-qty');

const errorName = document.getElementById('error-name');
const errorPrice = document.getElementById('error-price');
const errorQty = document.getElementById('error-qty');

const cartTbody = document.getElementById('cart-tbody');
const textTotal = document.getElementById('text-total');
const textDiscount = document.getElementById('text-discount');
const textGrandTotal = document.getElementById('text-grand-total');

const payAmountInput = document.getElementById('pay-amount');
const paymentStatus = document.getElementById('payment-status');
const btnReset = document.getElementById('btn-reset');

// Helper Format Currency Rupiah
function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
}

// 1. Validasi Input Form
function validateForm(name, price, qty) {
  let isValid = true;
  
  // Clear error message
  errorName.innerText = "";
  errorPrice.innerText = "";
  errorQty.innerText = "";

  if (!name || name.trim().length < 3) {
    errorName.innerText = "Nama barang wajib diisi minimal 3 karakter!";
    isValid = false;
  }

  if (isNaN(price) || price < 500) {
    errorPrice.innerText = "Harga satuan minimal Rp 500!";
    isValid = false;
  }

  if (isNaN(qty) || qty < 1 || !Number.isInteger(Number(qty))) {
    errorQty.innerText = "Jumlah harus berupa angka bulat minimal 1!";
    isValid = false;
  }

  return isValid;
}

// 2. Render Tabel Keranjang & Kalkulasi Total
function renderCart() {
  cartTbody.innerHTML = "";
  let totalBelanja = 0;

  if (cart.length === 0) {
    cartTbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Keranjang belanja kosong</td></tr>`;
  } else {
    cart.forEach((item, index) => {
      const subtotal = item.price * item.qty;
      totalBelanja += subtotal;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${formatRupiah(item.price)}</td>
        <td>${item.qty}</td>
        <td>${formatRupiah(subtotal)}</td>
        <td><button class="btn btn-danger" onclick="deleteItem(${item.id})">Hapus</button></td>
      `;
      cartTbody.appendChild(tr);
    });
  }

  // Hitung Diskon (10% jika total >= 50.000)
  let discount = totalBelanja >= 50000 ? totalBelanja * 0.1 : 0;
  let grandTotal = totalBelanja - discount;

  // Update UI Ringkasan
  textTotal.innerText = formatRupiah(totalBelanja);
  textDiscount.innerText = formatRupiah(discount);
  textGrandTotal.innerText = formatRupiah(grandTotal);

  // Update Status Pembayaran
  calculatePayment(grandTotal);

  // Simpan ke LocalStorage
  localStorage.setItem('cart_items', JSON.stringify(cart));
}

// 3. Tambah Item Baru
form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = itemNameInput.value;
  const price = parseFloat(itemPriceInput.value);
  const qty = parseFloat(itemQtyInput.value);

  if (validateForm(name, price, qty)) {
    const newItem = {
      id: Date.now(),
      name: name.trim(),
      price: price,
      qty: qty
    };

    cart.push(newItem);
    renderCart();

    // Reset Form Input
    form.reset();
    itemQtyInput.value = 1;
  }
});

// 4. Hapus Item dari Keranjang
function deleteItem(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
}

// 5. Kalkulator Kembalian Uang
function calculatePayment(grandTotal) {
  const payAmount = parseFloat(payAmountInput.value);

  if (isNaN(payAmount) || payAmount <= 0) {
    paymentStatus.innerText = "";
    paymentStatus.style.color = "black";
    return;
  }

  if (payAmount < grandTotal) {
    paymentStatus.innerText = `Uang belum mencukupi! Kurang ${formatRupiah(grandTotal - payAmount)}`;
    paymentStatus.style.color = "#dc3545";
  } else {
    const change = payAmount - grandTotal;
    paymentStatus.innerText = `Kembalian: ${formatRupiah(change)}`;
    paymentStatus.style.color = "#198754";
  }
}

payAmountInput.addEventListener('input', () => {
  let totalBelanja = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  let discount = totalBelanja >= 50000 ? totalBelanja * 0.1 : 0;
  calculatePayment(totalBelanja - discount);
});

// 6. Reset Transaksi / Clear LocalStorage
btnReset.addEventListener('click', () => {
  if (confirm("Apakah Anda yakin ingin mengosongkan keranjang transaksi ini?")) {
    cart = [];
    localStorage.removeItem('cart_items');
    payAmountInput.value = "";
    renderCart();
  }
});

// Inisialisasi awal saat halaman dimuat
renderCart();