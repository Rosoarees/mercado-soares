
let cart = [];
let cartCount = 0;
let cartTotal = 0;


const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total-value');
const cartCountElement = document.getElementById('cart-count');
const checkoutButton = document.getElementById('checkout-btn');
const clearCartButton = document.getElementById('clear-cart');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const notaFiscalSection = document.getElementById('nota-fiscal');
const notaFiscalDetails = document.getElementById('nota-fiscal-details');

document.addEventListener('DOMContentLoaded', function() {
    loadCartFromStorage();
    updateCartDisplay();
    setupEventListeners();
});


function setupEventListeners() {
   
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', addToCart);
    });
    
 
    document.querySelectorAll('.qty-btn.plus').forEach(button => {
        button.addEventListener('click', increaseProductQuantity);
    });
    
    document.querySelectorAll('.qty-btn.minus').forEach(button => {
        button.addEventListener('click', decreaseProductQuantity);
    });
    
    
    checkoutButton.addEventListener('click', finalizePurchase);
    
   
    clearCartButton.addEventListener('click', clearCart);
    
   
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
}


function addToCart(event) {
    const button = event.currentTarget;
    const productCard = button.closest('.product-card');
    const productId = parseInt(productCard.dataset.id);
    const productName = productCard.dataset.nome;
    const productPrice = parseFloat(productCard.dataset.preco);
    const quantityElement = productCard.querySelector('.qty-display');
    const quantity = parseInt(quantityElement.textContent);
    
   
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex !== -1) {
     
        cart[existingItemIndex].quantity += quantity;
    } else {
      
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: quantity
        });
    }
    
   
    quantityElement.textContent = '1';
    
    
    updateCartDisplay();
    saveCartToStorage();
    
   
    showNotification(`${productName} adicionado ao carrinho!`);
}


function increaseProductQuantity(event) {
    const button = event.currentTarget;
    const quantityElement = button.parentElement.querySelector('.qty-display');
    let quantity = parseInt(quantityElement.textContent);
    quantity++;
    quantityElement.textContent = quantity;
}


function decreaseProductQuantity(event) {
    const button = event.currentTarget;
    const quantityElement = button.parentElement.querySelector('.qty-display');
    let quantity = parseInt(quantityElement.textContent);
    
    if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;
    }
}


function updateCartDisplay() {
   
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
   
    cartCountElement.textContent = cartCount;
    
    cartTotalElement.textContent = `R$ ${cartTotal.toFixed(2).replace('.', ',')}`;
    
   
    if (cart.length === 0) {
        cartItemsElement.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-basket"></i>
                <p>Seu carrinho está vazio.</p>
            </div>
        `;
        checkoutButton.disabled = true;
    } else {
        cartItemsElement.innerHTML = '';
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn minus" data-id="${item.id}">-</button>
                    <span class="cart-item-qty">${item.quantity}</span>
                    <button class="qty-btn plus" data-id="${item.id}">+</button>
                    <button class="remove-item" data-id="${item.id}" aria-label="Remover item">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            cartItemsElement.appendChild(itemElement);
        });
        
     
        document.querySelectorAll('.cart-item .qty-btn.plus').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.dataset.id);
                updateCartItemQuantity(productId, 1);
            });
        });
        
        document.querySelectorAll('.cart-item .qty-btn.minus').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.dataset.id);
                updateCartItemQuantity(productId, -1);
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.dataset.id);
                removeCartItem(productId);
            });
        });
        
        checkoutButton.disabled = false;
    }
}


function updateCartItemQuantity(productId, change) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
      
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        updateCartDisplay();
        saveCartToStorage();
    }
}


function removeCartItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    saveCartToStorage();
    showNotification('Item removido do carrinho');
}


function clearCart() {
    if (cart.length === 0) return;
    
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
        cart = [];
        updateCartDisplay();
        saveCartToStorage();
        showNotification('Carrinho limpo');
    }
}


function finalizePurchase() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    

    generateInvoice();
    
  
    notaFiscalSection.classList.remove('hidden');
  
    notaFiscalSection.scrollIntoView({ behavior: 'smooth' });
    
  
    cart = [];
    updateCartDisplay();
    saveCartToStorage();
}


function generateInvoice() {
    const now = new Date();
    const dateTime = now.toLocaleString('pt-BR');
    const invoiceNumber = Math.floor(Math.random() * 1000000);
    
    let invoiceHTML = `
        <div class="invoice-info">
            <p><strong>Nº da Nota:</strong> ${invoiceNumber}</p>
            <p><strong>Data/Hora:</strong> ${dateTime}</p>
            <p><strong>Mercado Soares</strong></p>
            <p>Rua Exemplo, 123 - Centro</p>
            <p>CNPJ: 12.345.678/0001-90</p>
        </div>
        
        <table>
            <thead>
                <tr>
                    <th>Produto</th>
                    <th>Qtd</th>
                    <th>Preço Unit.</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        invoiceHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>R$ ${item.price.toFixed(2).replace('.', ',')}</td>
                <td>R$ ${subtotal.toFixed(2).replace('.', ',')}</td>
            </tr>
        `;
    });
    
    invoiceHTML += `
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3" style="text-align: right;"><strong>Total:</strong></td>
                    <td><strong>R$ ${cartTotal.toFixed(2).replace('.', ',')}</strong></td>
                </tr>
            </tfoot>
        </table>
        
        <div class="invoice-thankyou">
            <p>Obrigado pela sua compra!</p>
            <p>Volte sempre ao Mercado Soares!</p>
        </div>
    `;
    
    notaFiscalDetails.innerHTML = invoiceHTML;
}


function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    
    document.querySelectorAll('.product-card').forEach(card => {
        const productName = card.dataset.nome.toLowerCase();
        const productCategory = card.dataset.category;
        
        const matchesSearch = productName.includes(searchTerm);
        const matchesCategory = category === 'all' || productCategory === category;
        
        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function showNotification(message) {

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--success-color);
        color: white;
        padding: 12px 20px;
        border-radius: var(--border-radius-sm);
        box-shadow: var(--shadow);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
  
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}


function saveCartToStorage() {
    localStorage.setItem('mercadoSoaresCart', JSON.stringify(cart));
}


function loadCartFromStorage() {
    const savedCart = localStorage.getItem('mercadoSoaresCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}


        document.addEventListener('DOMContentLoaded', function() {
            const mensagemTextarea = document.getElementById('mensagem-contato');
            const contadorMensagem = document.getElementById('contador-mensagem');
            
            if (mensagemTextarea && contadorMensagem) {
                mensagemTextarea.addEventListener('input', function() {
                    contadorMensagem.textContent = this.value.length;
                });
            }
            
        
            const formContato = document.getElementById('form-contato');
            if (formContato) {
                formContato.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                  
                    let isValid = true;
                    const requiredFields = formContato.querySelectorAll('[required]');
                    
                    requiredFields.forEach(field => {
                        if (!field.value.trim()) {
                            isValid = false;
                            field.style.borderColor = 'var(--danger-color)';
                        } else {
                            field.style.borderColor = '';
                        }
                    });
                    
                    if (isValid) {
                     
                        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                        formContato.reset();
                        document.getElementById('contador-mensagem').textContent = '0';
                    } else {
                        alert('Por favor, preencha todos os campos obrigatórios.');
                    }
                });
            }
            
            const fadeElements = document.querySelectorAll('.fade-in');
            fadeElements.forEach((element, index) => {
                element.style.animationDelay = `${index * 0.1}s`;
            });
        });