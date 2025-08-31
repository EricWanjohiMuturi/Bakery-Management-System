document.addEventListener("alpine:init", () => {
  // Products store
  Alpine.store("products", {
    all: [],
    async fetch() {
      let res = await fetch("/api/products/");
      this.all = await res.json();
    },
  });

  // Cart store
  Alpine.store("cart", {
    items: JSON.parse(localStorage.getItem("cart")) || [],

    save() {
      localStorage.setItem("cart", JSON.stringify(this.items));
    },

    get count() {
      return this.items.reduce((acc, i) => acc + i.quantity, 0);
    },

    get total() {
      return this.items.reduce((acc, i) => acc + i.quantity * parseFloat(i.price), 0).toFixed(2);
    },

    add(product) {
      let existing = this.items.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
      this.save();
    },

    remove(productId) {
      this.items = this.items.filter((i) => i.id !== productId);
      this.save();
    },

    increment(productId) {
      let item = this.items.find((i) => i.id === productId);
      if (item) item.quantity++;
      this.save();
    },

    decrement(productId) {
      let item = this.items.find((i) => i.id === productId);
      if (item && item.quantity > 1) {
        item.quantity--;
      } else {
        this.remove(productId);
      }
      this.save();
    },
  });
});
