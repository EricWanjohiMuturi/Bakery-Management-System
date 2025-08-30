document.addEventListener("alpine:init", () => {
// Products store
Alpine.store("products", {
    all: [],
    async fetch() {
        let res = await fetch("/api/products/");
        this.all = await res.json();
    }
});

// Cart store
Alpine.store("cart", {
    items: [],
    add(product) {
    let existing = this.items.find(i => i.id === product.id);
    if (existing) {
        existing.quantity++;
    } else {
        this.items.push({ ...product, quantity: 1 });
    }
    },
    remove(productId) {
    this.items = this.items.filter(i => i.id !== productId);
    },
    increment(productId) {
    let item = this.items.find(i => i.id === productId);
    if (item) item.quantity++;
    },
    decrement(productId) {
    let item = this.items.find(i => i.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
    } else {
        this.remove(productId);
    }
    }
});
});