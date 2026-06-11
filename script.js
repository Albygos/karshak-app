/* ==========================================================================
   Karshak Spices Web App - JS Core Logic (Mockup Alignment)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Product Database (Aligned with user mockup products) ---
  const PRODUCTS = [
    {
      id: "p1",
      name: "Organic Cardamom",
      type: "seller",
      owner: "Joy's Garden",
      location: "Valad, Wayanad",
      rating: 4.6,
      price: 450,
      unit: "100g",
      image: "images/cardamom_real.png",
      category: "Seeds",
      description: "Sun-dried organic bold green cardamom pods direct from shade-grown forest gardens.",
      minPrice: 360,
      greed: 0.6,
      avatar: "JG"
    },
    {
      id: "p2",
      name: "Black Pepper",
      type: "seller",
      owner: "Growers Co-op",
      location: "Kalpetta, Wayanad",
      rating: 4.7,
      price: 220,
      unit: "250g",
      image: "images/black_pepper_real.png",
      category: "Whole Spices",
      description: "Premium bold & aromatic black pepper harvested directly from our farmers' gardens.",
      minPrice: 180,
      greed: 0.45,
      avatar: "GC"
    },
    {
      id: "p3",
      name: "Turmeric Powder",
      type: "seller",
      owner: "Lakshmi Organic",
      location: "Mananthavady",
      rating: 4.8,
      price: 180,
      unit: "500g",
      image: "images/turmeric_real.png",
      category: "Powders",
      description: "Fresh hand-harvested organic turmeric roots containing high curcumin density.",
      minPrice: 140,
      greed: 0.5,
      avatar: "LO"
    },
    {
      id: "p4",
      name: "Cloves",
      type: "seller",
      owner: "Region Farmers",
      location: "Bathery, Wayanad",
      rating: 4.6,
      price: 260,
      unit: "100g",
      image: "images/cloves_real.png",
      category: "Whole Spices",
      description: "Aromatic dried spice cloves sourced from Wayanad cooperative farm partners.",
      minPrice: 210,
      greed: 0.7,
      avatar: "RF"
    },
    {
      id: "p5",
      name: "Cumin Seeds",
      type: "seller",
      owner: "Devassy Estate",
      location: "Kalpetta, Wayanad",
      rating: 4.5,
      price: 160,
      unit: "250g",
      image: "images/cumin_real.png",
      category: "Seeds",
      description: "Premium grade aromatic cumin seeds ideal for organic kitchen blends.",
      minPrice: 130,
      greed: 0.4,
      avatar: "DE"
    },
    {
      id: "p6",
      name: "Cinnamon Sticks",
      type: "seller",
      owner: "Forest Harvest",
      location: "Sultan Bathery",
      rating: 4.4,
      price: 195,
      unit: "100g",
      image: "images/cinnamon_real.png",
      category: "Whole Spices",
      description: "Premium hand-rolled true Ceylon cinnamon sticks from our forest gardens.",
      minPrice: 150,
      greed: 0.55,
      avatar: "FH"
    },
    // --- BRAND PRODUCTS ---
    {
      id: "b1",
      name: "Catch Black Pepper",
      type: "brand",
      owner: "Catch Spices",
      location: "Certified Brand",
      rating: 4.3,
      price: 280,
      unit: "200g",
      image: "images/black_pepper_real.png",
      category: "Powders",
      description: "Catch premium ground black pepper powder in a resealable jar. ISI certified.",
      minPrice: 240,
      greed: 0.8,
      avatar: "CS"
    },
    {
      id: "b2",
      name: "Eastern Turmeric",
      type: "brand",
      owner: "Eastern Foods",
      location: "Certified Brand",
      rating: 4.5,
      price: 120,
      unit: "500g",
      image: "images/turmeric_real.png",
      category: "Powders",
      description: "Eastern brand premium turmeric powder, FSSAI certified, high curcumin content.",
      minPrice: 95,
      greed: 0.85,
      avatar: "EF"
    },
    {
      id: "b3",
      name: "Sakthi Cardamom",
      type: "brand",
      owner: "Sakthi Spices",
      location: "Certified Brand",
      rating: 4.2,
      price: 390,
      unit: "50g",
      image: "images/cardamom_real.png",
      category: "Seeds",
      description: "Sakthi premium whole green cardamom, grade-A bold pods, fully aromatic.",
      minPrice: 340,
      greed: 0.9,
      avatar: "SS"
    },
    {
      id: "b4",
      name: "Catch Cloves",
      type: "brand",
      owner: "Catch Spices",
      location: "Certified Brand",
      rating: 4.1,
      price: 310,
      unit: "100g",
      image: "images/cloves_real.png",
      category: "Whole Spices",
      description: "Catch premium whole cloves in a sealed container. Lab tested for purity.",
      minPrice: 270,
      greed: 0.85,
      avatar: "CS"
    }
  ];

  // --- 2. Application State ---
  let coinsCount = 250;
  let cart = [];
  let activeDeals = {};
  let activeNegotiation = null;
  let currentFilters = {
    type: "all",
    category: "all",
    search: ""
  };

  // --- 3. DOM Elements ---
  const productsGrid = document.getElementById('products-grid');
  const searchInput = document.getElementById('search-input');
  
  // Header Widgets
  const headerCoinsCount = document.getElementById('header-coins-count');
  const currentAddressText = document.querySelector('.address-text');
  const cartBadgeCount = document.getElementById('mobile-cart-badge');
  const cartDrawerCount = document.getElementById('cart-drawer-count');

  // Navigations
  const categoryItems = document.querySelectorAll('.category-item, .category-item.active-seeds');

  // Cart Drawer
  const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
  const btnOpenCart = document.getElementById('tab-cart');
  const btnCloseCart = document.getElementById('btn-close-cart');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartSavingsRow = document.getElementById('cart-savings-row');
  const cartSavingsEl = document.getElementById('cart-savings');
  const cartDeliveryEl = document.getElementById('cart-delivery');
  const cartTotalEl = document.getElementById('cart-total');
  const btnCheckout = document.getElementById('btn-checkout');

  // Bargain Modal
  const bargainModal = document.getElementById('bargain-modal');
  const closeBargainModal = document.getElementById('close-bargain-modal');
  const bargainSellerAvatar = document.getElementById('bargain-seller-avatar');
  const bargainSellerName = document.getElementById('bargain-seller-name');
  const bargainSellerRating = document.getElementById('bargain-seller-rating');
  const bargainProductBadge = document.getElementById('bargain-product-badge');
  const bargainProductName = document.getElementById('bargain-product-name');
  const bargainProductImage = document.getElementById('bargain-product-image');
  const bargainOriginalPrice = document.getElementById('bargain-original-price');
  const bargainOriginalPriceCross = document.getElementById('bargain-original-price-cross');
  const bargainChatMessages = document.getElementById('bargain-chat-messages');
  const bargainTyping = document.getElementById('bargain-typing');
  const userCoinsModal = document.getElementById('user-coins-modal');
  const bargainOfferDisplay = document.getElementById('bargain-offer-display');
  const bargainPctDisplay = document.getElementById('bargain-pct-display');
  const bargainSlider = document.getElementById('bargain-slider');
  const sliderMinLabel = document.getElementById('slider-min-label');
  const sliderMaxLabel = document.getElementById('slider-max-label');
  const btnWalkAway = document.getElementById('btn-walk-away');
  const btnSubmitOffer = document.getElementById('btn-submit-offer');
  const btnAcceptDeal = document.getElementById('btn-accept-deal');
  const btnAddDiscountedCart = document.getElementById('btn-add-discounted-cart');

  // Modals (Address, Success)
  const addressModal = document.getElementById('address-modal');
  const btnChangeAddress = document.getElementById('btn-change-address');
  const closeAddressModal = document.getElementById('close-address-modal');
  const addressCards = document.querySelectorAll('.address-card');

  const successModal = document.getElementById('success-modal');
  const successSavingsDisplay = document.getElementById('success-savings-display');
  const btnSuccessClose = document.getElementById('btn-success-close');

  // Special clicks
  const btnDirectFarmToggle = document.getElementById('btn-direct-farm-toggle');
  const btnHeroShop = document.getElementById('btn-hero-shop');
  const capsuleCards = document.querySelectorAll('.capsule-card');


  // --- 4. Render Spices (Best Selling Products Scroll) ---
  const renderProducts = () => {
    productsGrid.innerHTML = "";
    
    const filtered = PRODUCTS.filter(p => {
      const matchCategory = currentFilters.category === "all" || p.category === currentFilters.category;
      const matchType = currentFilters.type === "all" || p.type === currentFilters.type;
      
      const searchStr = currentFilters.search.toLowerCase().trim();
      const matchSearch = searchStr === "" || 
                          p.name.toLowerCase().includes(searchStr) || 
                          p.owner.toLowerCase().includes(searchStr);
                          
      return matchCategory && matchSearch && matchType;
    });

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div class="empty-cart-state" style="padding: 20px; width: 100%;">
          <p>No spices match your selection</p>
        </div>
      `;
      return;
    }

    filtered.forEach(p => {
      const isNegotiated = activeDeals[p.id] !== undefined;
      const displayPrice = isNegotiated ? activeDeals[p.id] : p.price;
      const isBrand = p.type === 'brand';
      
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.setAttribute('data-id', p.id);
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'listitem');
      card.setAttribute('aria-label', `${p.name} by ${p.owner}, price ₹${displayPrice}`);
      
      card.innerHTML = `
        <div class="wishlist-btn-wrapper">
          <button class="btn-wishlist" aria-label="Add to wishlist" aria-pressed="false">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
        
        ${isBrand ? `<div class="brand-product-ribbon">BRAND</div>` : ''}
        
        <div class="card-image-box">
          <img src="${p.image}" alt="${p.name} package">
        </div>
        
        <div class="card-info-box">
          <span class="card-seller-name ${isBrand ? 'brand-label' : ''}">
            ${isBrand ? `
              <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:2px;">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            ` : `
              <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:2px;">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 21 3c-1 4.5-2.5 6-7.1 11.8A7 7 0 0 1 11 20z"></path>
              </svg>
            `}
            ${p.owner}
          </span>
          <h4 class="card-product-title">${p.name}</h4>
          
          <div class="card-rating-row">
            <span class="star-rating">
              <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor" style="color:var(--accent-gold); display:inline-block; vertical-align:middle; margin-right:2px;">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              ${p.rating}
            </span>
            <span class="rating-count">(${p.id === 'p1' ? '892' : p.id === 'p2' ? '1.2K' : p.id === 'p3' ? '1.1K' : p.id === 'p4' ? '745' : p.id === 'p5' ? '602' : p.id === 'p6' ? '389' : p.id === 'b1' ? '2.3K' : p.id === 'b2' ? '4.1K' : p.id === 'b3' ? '1.8K' : '950'})</span>
          </div>
          
          <span class="card-product-size">${p.unit}</span>
                   <div class="card-price-action-row">
            <div class="price-box">
              <span class="slashed-price" style="display: ${isNegotiated ? 'inline' : 'none'}">
                ₹${p.price}
              </span>
              <span class="current-price ${isNegotiated ? 'bargained' : ''}">
                ₹${displayPrice}
              </span>
            </div>
            
            <button class="btn-card-add-cart-icon" data-id="${p.id}" aria-label="Add to basket at full price">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
          
          <div class="card-cta-row">
            ${isNegotiated ? `
              <button class="btn-card-add-cart" data-id="${p.id}" aria-label="Add bargained item to basket">
                Add Deal to Cart
              </button>
            ` : `
              <button class="btn-card-bargain" data-id="${p.id}" aria-label="Make an offer for discount">
                <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:2px;">
                  <circle cx="12" cy="12" r="10"></circle><path d="M12 8v8M9 10h4.5a2.25 2.25 0 0 1 0 4.5H9"></path>
                </svg>
                Make Offer
              </button>
            `}
          </div>
        </div>
      `;
      
      productsGrid.appendChild(card);
    });

    setupCardButtons();
  };

  const setupCardButtons = () => {
    // Add to Cart at full price (Cart Icon)
    document.querySelectorAll('.btn-card-add-cart-icon').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pId = btn.getAttribute('data-id');
        const product = PRODUCTS.find(p => p.id === pId);
        addToCart(product);
        showToast(`Added ${product.name} to basket!`);
      });
    });

    // Add to Cart at negotiated price (if deal is already active)
    document.querySelectorAll('.btn-card-add-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pId = btn.getAttribute('data-id');
        const product = PRODUCTS.find(p => p.id === pId);
        addToCart(product, activeDeals[product.id]);
        showToast(`Added bargained ${product.name} to basket!`);
      });
    });

    // Make Offer (Primary CTA)
    document.querySelectorAll('.btn-card-bargain').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pId = btn.getAttribute('data-id');
        const product = PRODUCTS.find(p => p.id === pId);
        openBargainConsole(product);
      });
    });

    // Bargain Badge Click
    document.querySelectorAll('.bargain-trigger-tag').forEach(tag => {
      tag.addEventListener('click', (e) => {
        e.stopPropagation();
        const pId = tag.getAttribute('data-id');
        const product = PRODUCTS.find(p => p.id === pId);
        openBargainConsole(product);
      });
    });

    // Card click triggers bargaining modal
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-wishlist') || e.target.closest('.btn-card-add-cart-icon') || e.target.closest('.btn-card-add-cart')) return;
        const pId = card.getAttribute('data-id');
        const product = PRODUCTS.find(p => p.id === pId);
        openBargainConsole(product);
      });
    });

    // Wishlist Toggle
    document.querySelectorAll('.btn-wishlist').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pressed = btn.getAttribute('aria-pressed') === 'true';
        btn.setAttribute('aria-pressed', !pressed);
        btn.classList.toggle('active');
        const pId = btn.closest('.product-card').getAttribute('data-id');
        const product = PRODUCTS.find(p => p.id === pId);
        
        if (!pressed) {
          btn.innerHTML = `
            <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--price-orange)" stroke="var(--price-orange)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          `;
          showToast(`Saved ${product.name} to wishlist!`);
        } else {
          btn.innerHTML = `
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          `;
        }
      });
    });
  };


  // --- 5. Cart Operations ---
  const addToCart = (product, negotiatedPrice = null) => {
    const priceToApply = negotiatedPrice || activeDeals[product.id] || product.price;

    const existingIndex = cart.findIndex(item => item.product.id === product.id && item.negotiatedPrice === priceToApply);
    
    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({
        product,
        qty: 1,
        negotiatedPrice: priceToApply
      });
    }

    updateCartDisplay();
  };

  const updateCartDisplay = () => {
    let totalItems = 0;
    let subtotal = 0;
    let originalSubtotal = 0;

    cartItemsList.innerHTML = "";

    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="empty-cart-state">
          <div class="empty-cart-icon">🛒</div>
          <p>Your basket is empty!</p>
          <span class="empty-cart-sub">Add spices or start bargaining to get amazing discounts.</span>
        </div>
      `;
      cartSavingsRow.style.display = "none";
    } else {
      cart.forEach((item, index) => {
        totalItems += item.qty;
        subtotal += item.negotiatedPrice * item.qty;
        originalSubtotal += item.product.price * item.qty;

        const isBargained = item.negotiatedPrice < item.product.price;
        
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <div class="cart-item-img-wrapper">
            <img src="${item.product.image}" alt="${item.product.name}">
          </div>
          
          <div class="cart-item-details">
            ${isBargained ? `<span class="cart-item-badge">🏷️ DECENT DEAL</span>` : ''}
            <h4 class="cart-item-name">${item.product.name}</h4>
            <span class="cart-item-owner">${item.product.owner} (${item.product.unit})</span>
            
            <div class="cart-item-price-row">
              ${isBargained ? `<span class="cart-item-slashed-price">₹${item.product.price}</span>` : ''}
              <span class="cart-item-actual-price ${isBargained ? 'bargained' : ''}">
                ₹${item.negotiatedPrice}
              </span>
            </div>
          </div>
          
          <div class="cart-quantity-row">
            <div class="quantity-control">
              <button class="btn-qty btn-minus" data-idx="${index}">-</button>
              <span class="qty-val">${item.qty}</span>
              <button class="btn-qty btn-plus" data-idx="${index}">+</button>
            </div>
            <button class="btn-remove-item" data-idx="${index}">🗑️</button>
          </div>
        `;
        cartItemsList.appendChild(cartItem);
      });
    }

    const totalSavings = originalSubtotal - subtotal;
    if (totalSavings > 0) {
      cartSavingsRow.style.display = "flex";
      cartSavingsEl.textContent = `-₹${totalSavings.toFixed(2)}`;
    } else {
      cartSavingsRow.style.display = "none";
    }

    const deliveryFee = subtotal > 0 ? 40 : 0;
    const finalTotal = subtotal + deliveryFee;

    // Badge totals
    cartBadgeCount.textContent = totalItems;
    cartSubtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
    cartDeliveryEl.textContent = `₹${deliveryFee.toFixed(2)}`;
    cartTotalEl.textContent = `₹${finalTotal.toFixed(2)}`;
    cartDrawerCount.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;

    setupCartControls();
  };

  const setupCartControls = () => {
    document.querySelectorAll('.btn-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        cart[idx].qty += 1;
        updateCartDisplay();
      });
    });

    document.querySelectorAll('.btn-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        if (cart[idx].qty > 1) {
          cart[idx].qty -= 1;
        } else {
          cart.splice(idx, 1);
        }
        updateCartDisplay();
      });
    });

    document.querySelectorAll('.btn-remove-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        cart.splice(idx, 1);
        updateCartDisplay();
      });
    });
  };


  // --- 6. Bargaining Modal Flow ---
  const openBargainConsole = (product) => {
    activeNegotiation = {
      product,
      round: 0,
      minAcceptable: product.minPrice,
      greed: product.greed,
      lastCounter: null,
      dealClosed: false
    };

    bargainSellerAvatar.textContent = product.avatar;
    bargainSellerName.textContent = product.owner;
    bargainSellerRating.textContent = `${product.rating} ★ (${product.location})`;
    bargainProductBadge.textContent = product.type === 'seller' ? 'DIRECT GROWER' : 'CERTIFIED BRAND';
    bargainProductBadge.className = `modal-product-badge ${product.type}`;
    
    bargainProductName.textContent = product.name;
    bargainProductImage.src = product.image;
    
    bargainOriginalPrice.textContent = `₹${product.price}`;
    bargainOriginalPriceCross.textContent = `₹${product.price}`;

    const minOffer = Math.floor(product.price * 0.5);
    bargainSlider.min = minOffer;
    bargainSlider.max = product.price;
    bargainSlider.value = Math.floor(product.price * 0.75);

    sliderMinLabel.textContent = `₹${minOffer} (50% Off)`;
    sliderMaxLabel.textContent = `₹${product.price} (Original)`;
    
    updateSliderLabelDisplay();

    bargainChatMessages.innerHTML = "";
    addChatBubble("seller", `Hello! I see you want our ${product.name}. Spices take effort to harvest. What is your best offer?`);

    userCoinsModal.textContent = coinsCount;

    btnSubmitOffer.style.display = "inline-block";
    btnAcceptDeal.style.display = "none";
    btnAddDiscountedCart.style.display = "none";
    btnSubmitOffer.disabled = false;
    bargainSlider.disabled = false;
    bargainOriginalPriceCross.style.display = "none";
    bargainOriginalPrice.style.color = "var(--btn-green)";

    bargainModal.classList.add('active');
  };

  const updateSliderLabelDisplay = () => {
    const proposed = parseInt(bargainSlider.value, 10);
    const original = activeNegotiation.product.price;
    const pct = Math.round(((original - proposed) / original) * 100);
    
    bargainOfferDisplay.textContent = `₹${proposed}`;
    bargainPctDisplay.textContent = `(-${pct}% Off)`;
  };

  bargainSlider.addEventListener('input', updateSliderLabelDisplay);

  const addChatBubble = (sender, message) => {
    const bubble = document.createElement('div');
    bubble.classList.add('message', sender);
    bubble.innerHTML = `<div class="msg-bubble">${message}</div>`;
    bargainChatMessages.appendChild(bubble);
    bargainChatMessages.scrollTop = bargainChatMessages.scrollHeight;
  };

  // Submit Offer
  btnSubmitOffer.addEventListener('click', () => {
    if (coinsCount < 10) {
      alert("You need at least 10 coins to bargain! Check out to earn more.");
      return;
    }

    coinsCount -= 10;
    headerCoinsCount.textContent = coinsCount;
    userCoinsModal.textContent = coinsCount;

    const userOffer = parseInt(bargainSlider.value, 10);
    activeNegotiation.round += 1;

    addChatBubble("user", `How about ₹${userOffer}?`);
    
    btnSubmitOffer.disabled = true;
    bargainSlider.disabled = true;
    bargainTyping.style.display = "flex";
    bargainChatMessages.scrollTop = bargainChatMessages.scrollHeight;

    setTimeout(() => {
      bargainTyping.style.display = "none";
      bargainSlider.disabled = false;
      
      const product = activeNegotiation.product;
      const minAcceptable = activeNegotiation.minAcceptable;
      const greed = activeNegotiation.greed;
      const round = activeNegotiation.round;

      if (userOffer >= minAcceptable) {
        let counterOffer = Math.round(product.price - (product.price - userOffer) * greed);
        
        if (counterOffer <= userOffer + 5) {
          closeNegotiationWithDeal(userOffer, `Deal! ₹${userOffer} works. Enjoy our pure spices!`);
        } else {
          if (round >= 3) {
            closeNegotiationWithDeal(minAcceptable, `Let's meet at my bottom price of ₹${minAcceptable}. Deal?`);
          } else {
            activeNegotiation.lastCounter = counterOffer;
            addChatBubble("seller", `That's low. Settle in the middle at ₹${counterOffer}?`);
            
            btnAcceptDeal.style.display = "inline-block";
            btnAcceptDeal.textContent = `Accept Offer (₹${counterOffer})`;
            btnSubmitOffer.disabled = false;
          }
        }
      } else {
        if (round >= 3) {
          addChatBubble("seller", `I'm sorry, ₹${userOffer} is below cost. The absolute lowest is ₹${minAcceptable}.`);
          activeNegotiation.lastCounter = minAcceptable;
          btnAcceptDeal.style.display = "inline-block";
          btnAcceptDeal.textContent = `Accept Final (₹${minAcceptable})`;
          btnSubmitOffer.disabled = true;
        } else {
          let counterOffer = Math.round(minAcceptable + (product.price - minAcceptable) * (greed * 0.7));
          activeNegotiation.lastCounter = counterOffer;
          addChatBubble("seller", `No way, ₹${userOffer} is too low. The best I can offer is ₹${counterOffer}.`);
          
          btnAcceptDeal.style.display = "inline-block";
          btnAcceptDeal.textContent = `Accept Offer (₹${counterOffer})`;
          btnSubmitOffer.disabled = false;
        }
      }
      bargainChatMessages.scrollTop = bargainChatMessages.scrollHeight;
    }, 1200);
  });

  btnAcceptDeal.addEventListener('click', () => {
    const finalPrice = activeNegotiation.lastCounter;
    closeNegotiationWithDeal(finalPrice, `Great deal! Applied price: ₹${finalPrice}.`);
  });

  const closeNegotiationWithDeal = (finalPrice, message) => {
    activeNegotiation.dealClosed = true;
    activeNegotiation.lastCounter = finalPrice;
    
    addChatBubble("seller", message);
    activeDeals[activeNegotiation.product.id] = finalPrice;

    renderProducts();

    bargainOriginalPriceCross.style.display = "inline";
    bargainOriginalPrice.textContent = `₹${finalPrice}`;
    bargainOriginalPrice.style.color = "var(--price-orange)";

    btnSubmitOffer.style.display = "none";
    btnAcceptDeal.style.display = "none";
    btnAddDiscountedCart.style.display = "inline-block";

    bargainSlider.disabled = true;
  };

  btnAddDiscountedCart.addEventListener('click', () => {
    const product = activeNegotiation.product;
    const bargainedPrice = activeNegotiation.lastCounter;
    addToCart(product, bargainedPrice);
    bargainModal.classList.remove('active');
  });

  btnWalkAway.addEventListener('click', () => {
    bargainModal.classList.remove('active');
  });

  closeBargainModal.addEventListener('click', () => {
    bargainModal.classList.remove('active');
  });


  // --- 7. Toast Notification Utility ---
  const showToast = (message, type = 'success') => {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      `;
    } else if (type === 'info') {
      iconSvg = `
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      `;
    }
    
    toast.innerHTML = `
      <span class="toast-icon">${iconSvg}</span>
      <span class="toast-text">${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 2500);
  };

  // --- 8. Tab Navigation Routing ---
  const footerTabs = document.querySelectorAll('.footer-tab');
  const appScreens = document.querySelectorAll('.app-screen');

  const switchTab = (tabId) => {
    const targetTab = document.getElementById(tabId);
    if (!targetTab) return;

    footerTabs.forEach(tab => {
      tab.classList.remove('active');
      tab.setAttribute('aria-selected', 'false');
    });

    targetTab.classList.add('active');
    targetTab.setAttribute('aria-selected', 'true');

    const screenId = targetTab.getAttribute('aria-controls');
    
    appScreens.forEach(screen => {
      screen.classList.remove('active');
      screen.style.display = 'none';
    });

    const activeScreen = document.getElementById(screenId);
    if (activeScreen) {
      activeScreen.classList.add('active');
      activeScreen.style.display = 'block';
    }
  };

  footerTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (tab.id === 'tab-cart') {
        cartDrawerOverlay.classList.add('active');
        return;
      }
      switchTab(tab.id);
    });
  });

  // Wire up category list selections
  const wireCategoryClick = (el) => {
    el.addEventListener('click', () => {
      const cat = el.getAttribute('data-category');
      currentFilters.category = cat;
      
      // Update Category Tab styling on quick-nav
      categoryItems.forEach(i => {
        i.classList.remove('active-category');
        const underline = i.querySelector('.category-underline');
        if (underline) underline.remove();
      });

      const activePill = document.querySelector(`.category-item[data-category="${cat}"]`);
      if (activePill) {
        activePill.classList.add('active-category');
        const underline = document.createElement('div');
        underline.classList.add('category-underline');
        activePill.appendChild(underline);
      }

      // Switch screen back to home if not there
      switchTab('tab-home');
      renderProducts();

      // Scroll smoothly to catalog
      const catalogEl = document.getElementById('catalog');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  };

  categoryItems.forEach(item => {
    wireCategoryClick(item);
  });

  capsuleCards.forEach(card => {
    wireCategoryClick(card);
  });

  // Grid Category screen cards
  document.querySelectorAll('.category-card-wide').forEach(card => {
    wireCategoryClick(card);
  });

  const linkCategoriesAll = document.getElementById('link-categories-all');
  if (linkCategoriesAll) {
    linkCategoriesAll.addEventListener('click', () => {
      switchTab('tab-categories');
    });
  }

  // Settings address card inside account tab
  const btnAccountAddress = document.getElementById('btn-account-address');
  if (btnAccountAddress) {
    btnAccountAddress.addEventListener('click', () => {
      addressModal.classList.add('active');
    });
  }

  if (closeAddressModal) {
    closeAddressModal.addEventListener('click', () => {
      addressModal.classList.remove('active');
    });
  }

  addressCards.forEach(card => {
    card.addEventListener('click', () => {
      addressCards.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-checked', 'false');
      });
      card.classList.add('active');
      card.setAttribute('aria-checked', 'true');
      addressModal.classList.remove('active');
      showToast("Delivery address updated!", "success");
    });
  });

  // --- 9. Hero Carousel Animation ---
  const heroCarousel = document.getElementById('hero-carousel');
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-banner .dot');
  let currentSlide = 0;
  let carouselInterval;

  const showSlide = (idx) => {
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    dots.forEach(dot => {
      dot.classList.remove('active');
    });

    slides[idx].classList.add('active');
    dots[idx].classList.add('active');
    currentSlide = idx;
  };

  const nextSlide = () => {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
  };

  const startCarousel = () => {
    carouselInterval = setInterval(nextSlide, 5000);
  };

  const stopCarousel = () => {
    clearInterval(carouselInterval);
  };

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopCarousel();
      const idx = parseInt(dot.getAttribute('data-slide'), 10);
      showSlide(idx);
      startCarousel();
    });
  });

  if (heroCarousel) {
    heroCarousel.addEventListener('mouseenter', stopCarousel);
    heroCarousel.addEventListener('mouseleave', startCarousel);
    startCarousel();
  }

  // Hero Shop triggers
  const btnHeroShopCardamom = document.getElementById('btn-hero-shop-cardamom');
  if (btnHeroShopCardamom) {
    btnHeroShopCardamom.addEventListener('click', () => {
      const cardamom = PRODUCTS.find(p => p.id === "p1");
      if (cardamom) openBargainConsole(cardamom);
    });
  }

  if (btnHeroShop) {
    btnHeroShop.addEventListener('click', () => {
      const pepper = PRODUCTS.find(p => p.id === "p2");
      if (pepper) openBargainConsole(pepper);
    });
  }

  // --- 10. Search Input ---
  searchInput.addEventListener('input', () => {
    currentFilters.search = searchInput.value;
    switchTab('tab-home');
    renderProducts();
  });

  // Growers vs Brands top pill toggles
  const pillGrowers = document.getElementById('pill-growers');
  const pillBrands = document.getElementById('pill-brands');
  
  if (pillGrowers && pillBrands) {
    pillGrowers.addEventListener('click', () => {
      const isActive = pillGrowers.classList.contains('active');
      if (isActive) {
        pillGrowers.classList.remove('active');
        pillGrowers.setAttribute('aria-pressed', 'false');
        currentFilters.type = 'all';
      } else {
        pillGrowers.classList.add('active');
        pillGrowers.setAttribute('aria-pressed', 'true');
        pillBrands.classList.remove('active');
        pillBrands.setAttribute('aria-pressed', 'false');
        currentFilters.type = 'seller';
      }
      renderProducts();
    });
    
    pillBrands.addEventListener('click', () => {
      const isActive = pillBrands.classList.contains('active');
      if (isActive) {
        pillBrands.classList.remove('active');
        pillBrands.setAttribute('aria-pressed', 'false');
        currentFilters.type = 'all';
      } else {
        pillBrands.classList.add('active');
        pillBrands.setAttribute('aria-pressed', 'true');
        pillGrowers.classList.remove('active');
        pillGrowers.setAttribute('aria-pressed', 'false');
        currentFilters.type = 'brand';
      }
      renderProducts();
    });
  }

  // --- 11. Modal Close & General Keyboard listeners ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (bargainModal.classList.contains('active')) {
        bargainModal.classList.remove('active');
        showToast("Walked away from the deal.", "info");
      }
      if (addressModal.classList.contains('active')) addressModal.classList.remove('active');
      if (successModal.classList.contains('active')) successModal.classList.remove('active');
      if (cartDrawerOverlay.classList.contains('active')) cartDrawerOverlay.classList.remove('active');
    }
  });

  // Category items Enter/Space accessibility
  const addKeyboardAccessibility = (elements) => {
    elements.forEach(el => {
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          el.click();
        }
      });
    });
  };

  addKeyboardAccessibility(categoryItems);
  addKeyboardAccessibility(capsuleCards);
  addKeyboardAccessibility(addressCards);
  addKeyboardAccessibility(document.querySelectorAll('.category-card-wide'));

  // --- 12. App Initial Render ---
  renderProducts();
  updateCartDisplay();

});
