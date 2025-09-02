function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + "=")) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

document.addEventListener("alpine:init", () => {
  // PRODUCTS
  Alpine.store("products", {
    all: [],
    searchTerm: "",
    categories: [],
    selectedCategory: "",

    async fetch() {
      const res = await fetch("/api/products/");
      this.all = await res.json();

      // Extract unique categories from products
      this.categories = [...new Set(this.all.map(p => p.category))];
    },

    get filtered() {
      let filtered = this.all;

      // Apply category filter
      if (this.selectedCategory) {
        filtered = filtered.filter(p => p.category === this.selectedCategory);
      }

      // Apply search filter
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase();
        filtered = filtered.filter(p => p.title.toLowerCase().includes(term));
      }

      return filtered;
    },
  });

  // CART (single source of truth)
  Alpine.store("cart", {
    items: JSON.parse(localStorage.getItem("cart")) || [],

    save() {
      localStorage.setItem("cart", JSON.stringify(this.items));
    },

    get count() {
      return this.items.reduce((n, i) => n + i.quantity, 0);
    },

    get total() {
      return this.items
        .reduce((sum, i) => sum + i.quantity * parseFloat(i.price || 0), 0)
        .toFixed(2);
    },

    getQty(id) {
      const it = this.items.find(i => i.id === id);
      return it ? it.quantity : 0;
    },

    add(product) {
      const price = parseFloat(product.price);
      let it = this.items.find(i => i.id === product.id);
      if (it) {
        it.quantity++;
      } else {
        this.items.push({ ...product, price, quantity: 1 });
      }
      this.save();
    },

    increment(id) {
      const it = this.items.find(i => i.id === id);
      if (it) it.quantity++;
      this.save();
    },

    decrement(id) {
      const it = this.items.find(i => i.id === id);
      if (!it) return;
      if (it.quantity > 1) it.quantity--;
      else this.remove(id);
      this.save();
    },

    remove(id) {
      this.items = this.items.filter(i => i.id !== id);
      this.save();
    },

    setQty(id, qty, product = null) {
      qty = Number(qty) || 0;
      if (qty <= 0) return this.remove(id);
      const it = this.items.find(i => i.id === id);
      if (it) {
        it.quantity = qty;
      } else if (product) {
        this.items.push({ ...product, price: parseFloat(product.price), quantity: qty });
      }
      this.save();
    },

    clear() {
      this.items = [];
      this.save();
    },

    // -------------------
    // ORDER STATE + ACTION
    // -------------------
    customer: "",
    comment: "",
    payment: "Mpesa",

    async placeOrder() {
      if (!this.items.length) return;

      try {
        const res = await fetch("/api/orders/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
          },
          body: JSON.stringify({
            customer: this.customer,
            comment: this.comment,
            payment: this.payment,
            items: this.items.map(i => ({
              product: i.id,
              qty: i.quantity,
              price: i.price,
            })),
            total: this.total,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          this.clear();
          this.customer = "";
          this.comment = "";
          this.payment = "Mpesa";

          document.dispatchEvent(new CustomEvent("toast", {
            detail: { type: "success", message: data.message }
          }));
        } else {
          document.dispatchEvent(new CustomEvent("toast", {
            detail: { type: "error", message: data.error || "Error placing order" }
          }));
        }
      } catch (err) {
        console.error(err);
        document.dispatchEvent(new CustomEvent("toast", {
          detail: { type: "error", message: "Something went wrong." }
        }));
      }
    },
  });
});