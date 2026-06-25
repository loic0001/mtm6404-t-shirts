const tshirts = [
  {
    title: 'Blue T-Shirt',
    image: 'images/blue-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Bright Purple T-Shirt',
    image: 'images/bright-purple-t-shirt.jpg',
    price: 5.99,
    stock: 1,
    quantity: 1
  },
  {
    title: 'Cobalt Blue T-Shirt',
    image: 'images/cobalt-blue-t-shirt.jpg',
    price: 9.99,
    stock: 5,
    quantity: 1
  },
  {
    title: 'Green T-Shirt',
    image: 'images/green-t-shirt.jpg',
    price: 6.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Grey T-Shirt',
    image: 'images/grey-t-shirt.jpg',
    price: 4.99,
    stock: 2,
    quantity: 1
  },
  {
    title: 'Light Green T-Shirt',
    image: 'images/light-green-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Purple T-Shirt',
    image: 'images/purple-t-shirt.jpg',
    price: 7.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Red T-Shirt',
    image: 'images/red-t-shirt.jpg',
    price: 6.99,
    stock: 3,
    quantity: 1
  },
  {
    title: 'Teal T-Shirt',
    image: 'images/teal-t-shirt.jpg',
    price: 7.99,
    stock: 2,
    quantity: 1
  }
]

const grid = document.getElementById('shirt-grid');
const subtitle = document.getElementById('subtitle');


function renderShirtCard(shirt, index) {
  const isOutOfStock = shirt.stock === 0;


  let optionsHTML = '';
  for (let n = 1; n <= shirt.stock; n++) {
    const selected = n === shirt.quantity ? 'selected' : '';
    optionsHTML += `<option value="${n}" ${selected}>${n}</option>`;
  }


  const buyRowHTML = isOutOfStock
    ? ''
    : `
      <div class="buy-row">
        <select class="qty-select" data-index="${index}">
          ${optionsHTML}
        </select>
        <button class="buy-btn" data-index="${index}">Buy</button>
      </div>
    `;

  const outBadgeHTML = isOutOfStock
    ? `<span class="out-badge">Out of Stock</span>`
    : '';

  const stockTextHTML = isOutOfStock
    ? `<span class="out-text">Out of Stock</span>`
    : `<span>${shirt.stock} left in stock</span>`;

  return `
    <article class="shirt-card ${isOutOfStock ? 'is-out' : ''}">
      <div class="shirt-image-wrap">
        <img src="${shirt.image}" alt="${shirt.title}" class="shirt-image">
        ${outBadgeHTML}
      </div>
      <div class="shirt-body">
        <h2 class="shirt-title">${shirt.title}</h2>
        <p class="shirt-price">$${shirt.price.toFixed(2)}</p>
        <p class="shirt-stock">${stockTextHTML}</p>
        ${buyRowHTML}
      </div>
    </article>
  `;
}


function renderGrid() {
 
  grid.innerHTML = tshirts.map(renderShirtCard).join('');

  const inStockCount = tshirts.filter(shirt => shirt.stock > 0).length;
  subtitle.textContent = `${inStockCount} styles in stock`;

  attachEventListeners();
}


function attachEventListeners() {

  document.querySelectorAll('.qty-select').forEach(select => {
    select.addEventListener('change', (e) => {
      const index = Number(e.target.dataset.index);
      tshirts[index].quantity = Number(e.target.value);
    });
  });


  document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = Number(e.target.dataset.index);
      const shirt = tshirts[index];

      shirt.stock = Math.max(0, shirt.stock - shirt.quantity);
      shirt.quantity = 1; 

      renderGrid(); 
    });
  });
}


renderGrid();
