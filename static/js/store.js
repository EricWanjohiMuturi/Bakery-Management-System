document.addEventListener("alpine:init", () => {
  //PRODUCTS
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
  });
});
