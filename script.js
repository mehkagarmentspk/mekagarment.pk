// ================================
// MEHKA GARMENTS — MAIN JAVASCRIPT
// ================================

document.addEventListener("DOMContentLoaded", () => {

  // -------------------------------
  // LOADER
  // -------------------------------

  const loader = document.getElementById("loader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader?.classList.add("hide");
    }, 700);
  });


  // -------------------------------
  // CART
  // -------------------------------

  const cartButton = document.getElementById("cartButton");
  const cartDrawer = document.getElementById("cartDrawer");
  const closeCart = document.getElementById("closeCart");
  const cartBackdrop = document.getElementById("cartBackdrop");

  const cartItemsContainer = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");

  let cart = [];


  function openCart() {
    cartDrawer?.classList.add("open");
    cartBackdrop?.classList.add("show");
    document.body.style.overflow = "hidden";
  }


  function closeCartDrawer() {
    cartDrawer?.classList.remove("open");
    cartBackdrop?.classList.remove("show");
    document.body.style.overflow = "";
  }


  cartButton?.addEventListener("click", openCart);
  closeCart?.addEventListener("click", closeCartDrawer);
  cartBackdrop?.addEventListener("click", closeCartDrawer);


  // -------------------------------
  // UPDATE CART
  // -------------------------------

  function updateCart() {

    if (!cartItemsContainer) return;

    cartCount.textContent = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    cartTotal.textContent =
      "PKR " + total.toLocaleString();


    if (cart.length === 0) {

      cartItemsContainer.innerHTML = `
        <p class="empty-cart">
          Your cart is empty.
        </p>
      `;

      return;
    }


    cartItemsContainer.innerHTML = cart.map((item, index) => `

      <div class="cart-item">

        <div>
          <h4>${item.name}</h4>

          <p>
            Size: ${item.size} · Qty: ${item.quantity}
          </p>

          <p>
            PKR ${(item.price * item.quantity).toLocaleString()}
          </p>
        </div>

        <button
          class="remove-item"
          data-index="${index}"
          style="
            border:0;
            background:transparent;
            color:#172554;
            font-size:18px;
          "
        >
          ×
        </button>

      </div>

    `).join("");


    document.querySelectorAll(".remove-item").forEach(button => {

      button.addEventListener("click", () => {

        const index = Number(button.dataset.index);

        cart.splice(index, 1);

        updateCart();

      });

    });

  }


  // -------------------------------
  // PRODUCT CARDS
  // -------------------------------

  const productCards =
    document.querySelectorAll(".product-card");


  productCards.forEach(card => {

    const sizeButtons =
      card.querySelectorAll(".sizes button");

    const minus =
      card.querySelector(".qty-minus");

    const plus =
      card.querySelector(".qty-plus");

    const quantity =
      card.querySelector(".quantity span");

    const addCart =
      card.querySelector(".add-cart");


    let selectedSize = "M";
    let qty = 1;


    // SIZE SELECT

    sizeButtons.forEach(button => {

      button.addEventListener("click", () => {

        sizeButtons.forEach(btn =>
          btn.classList.remove("selected")
        );

        button.classList.add("selected");

        selectedSize = button.textContent.trim();

      });

    });


    // MINUS

    minus?.addEventListener("click", () => {

      if (qty > 1) {
        qty--;
        quantity.textContent = qty;
      }

    });


    // PLUS

    plus?.addEventListener("click", () => {

      if (qty < 20) {
        qty++;
        quantity.textContent = qty;
      }

    });


    // ADD TO CART

    addCart?.addEventListener("click", () => {

      const name =
        card.querySelector("h3")?.textContent.trim()
        || "Product";

      const priceText =
        card.querySelector("strong")?.textContent
        || "PKR 0";

      const price =
        Number(
          priceText
            .replace("PKR", "")
            .replace(/,/g, "")
            .trim()
        );


      const existing =
        cart.find(
          item =>
            item.name === name &&
            item.size === selectedSize
        );


      if (existing) {

        existing.quantity += qty;

      } else {

        cart.push({
          name,
          price,
          size: selectedSize,
          quantity: qty
        });

      }


      updateCart();

      openCart();


      // BUTTON ANIMATION

      const original =
        addCart.innerHTML;

      addCart.innerHTML =
        "ADDED ✓";

      addCart.style.transform =
        "scale(0.97)";


      setTimeout(() => {

        addCart.innerHTML = original;

        addCart.style.transform =
          "";

      }, 1000);

    });

  });


  // -------------------------------
  // CATEGORY INTERACTION
  // -------------------------------

  const categoryButtons =
    document.querySelectorAll(".category-card");


  categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

      categoryButtons.forEach(btn =>
        btn.classList.remove("active")
      );

      button.classList.add("active");

      const category =
        button.dataset.category;

      console.log(
        "Selected category:",
        category
      );

      document
        .getElementById("collection")
        ?.scrollIntoView({
          behavior: "smooth"
        });

    });

  });


  // -------------------------------
  // QUICK VIEW
  // -------------------------------

  document
    .querySelectorAll(".quick-view")
    .forEach(button => {

      button.addEventListener("click", () => {

        const card =
          button.closest(".product-card");

        const name =
          card.querySelector("h3")?.textContent;

        button.textContent =
          "VIEWING ✓";


        setTimeout(() => {
          button.textContent =
            "QUICK VIEW ↗";
        }, 1200);


        console.log(
          "Quick view:",
          name
        );

      });

    });


  // -------------------------------
  // SMOOTH NAVIGATION
  // -------------------------------

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", event => {

        const target =
          document.querySelector(
            link.getAttribute("href")
          );

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth"
        });

      });

    });


  // -------------------------------
  // SIMPLE 3D TILT
  // -------------------------------

  document
    .querySelectorAll(".product-card")
    .forEach(card => {

      card.addEventListener("mousemove", event => {

        if (window.innerWidth < 900) return;

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const rotateY =
          ((x / rect.width) - 0.5) * 5;

        const rotateX =
          ((y / rect.height) - 0.5) * -5;

        card.style.transform =
          `perspective(900px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-8px)`;

      });


      card.addEventListener("mouseleave", () => {

        card.style.transform =
          "";

      });

    });


  // -------------------------------
  // INITIAL CART
  // -------------------------------

  updateCart();
document.querySelectorAll(".product-thumb").forEach(function (thumb) {
  thumb.addEventListener("click", function () {
    const productImage = this.closest(".product-image").querySelector("img");
    productImage.src = this.src;

    this.closest(".product-thumbnails")
      .querySelectorAll(".product-thumb")
      .forEach(function (item) {
        item.classList.remove("active");
      });

    this.classList.add("active");
  });
});
});
