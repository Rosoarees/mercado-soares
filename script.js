
document.addEventListener('DOMContentLoaded', () => {

 
    const productGrid = document.querySelector('.product-grid');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalValue = document.getElementById('cart-total-value');
    const checkoutBtn = document.getElementById('checkout-btn');
    const mainContainer = document.querySelector('.container');
    const notaFiscalSection = document.getElementById('nota-fiscal');

  
    let carrinho = [];
   

    function adicionarAoCarrinho(event) {
        if (!event.target.classList.contains('add-to-cart-btn')) return;

        const productCard = event.target.closest('.product-card');
        const id = productCard.dataset.id;
        const nome = productCard.dataset.nome;
        const preco = parseFloat(productCard.dataset.preco);

        const itemExistente = carrinho.find(item => item.id === id);

        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            carrinho.push({ id, nome, preco, quantidade: 1 });
        }
        
        atualizarCarrinhoUI();
    }

   
    function atualizarCarrinhoUI() {
        cartItemsContainer.innerHTML = ''; 

        if (carrinho.length === 0) {
            cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
            cartTotalValue.textContent = 'R$ 0,00';
            return;
        }

        let totalGeral = 0;
        carrinho.forEach(item => {
            const itemTotal = item.preco * item.quantidade;
            totalGeral += itemTotal;

            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <span>${item.nome} (x${item.quantidade})</span>
                <strong>R$ ${itemTotal.toFixed(2).replace('.', ',')}</strong>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        });

        cartTotalValue.textContent = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`;
    }
    
    function finalizarCompra() {
        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.");
            return;
        }

        mainContainer.classList.add('hidden');
        document.querySelector('.main-header').classList.add('hidden');
        notaFiscalSection.classList.remove('hidden');

        gerarNotaFiscal();
    }
    
    
    function gerarNotaFiscal() {
        const notaContainer = document.getElementById('nota-fiscal-details');
        let totalCompra = 0;
        
        let tabelaHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Qtd.</th>
                        <th>Valor Unitário</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        carrinho.forEach(item => {
            const subtotal = item.preco * item.quantidade;
            totalCompra += subtotal;
            tabelaHTML += `
                <tr>
                    <td>${item.nome}</td>
                    <td>${item.quantidade}</td>
                    <td>R$ ${item.preco.toFixed(2).replace('.', ',')}</td>
                    <td>R$ ${subtotal.toFixed(2).replace('.', ',')}</td>
                </tr>
            `;
        });

        tabelaHTML += `
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3"><strong>VALOR TOTAL DA COMPRA</strong></td>
                        <td><strong>R$ ${totalCompra.toFixed(2).replace('.', ',')}</strong></td>
                    </tr>
                </tfoot>
            </table>
        `;

        notaContainer.innerHTML = tabelaHTML;
    }
    
    productGrid.addEventListener('click', adicionarAoCarrinho);
    checkoutBtn.addEventListener('click', finalizarCompra);
});