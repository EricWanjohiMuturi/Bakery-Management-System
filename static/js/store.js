document.addEventListener("alpine:init", () => {
  // PRODUCTS
  Alpine.store("products", {
    all: [],
    async fetch() {
      const res = await fetch("/api/products/");
      this.all = await res.json();
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
      // normalize price as number once
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
      // optional helper if you need direct setting from inputs
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
  });
});
