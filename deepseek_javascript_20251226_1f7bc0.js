// MODIFIQUE A FUNÇÃO processarDadosPagamentos:
// Adicione isto após processar os pagamentos:
function calcularIndiceRecuperacao(valorRecuperado, mes) {
    // Encontrar o mês correspondente na tabela de recuperação
    const tabelaRecuperacao = document.querySelector('#configuracoes-section .bg-gradient-to-br:nth-child(2) tbody');
    const linhas = tabelaRecuperacao.querySelectorAll('tr');
    
    let linhaEncontrada = null;
    linhas.forEach(linha => {
        const cells = linha.querySelectorAll('td');
        if (cells[0]?.textContent.trim() === mes) {
            linhaEncontrada = linha;
        }
    });
    
    if (linhaEncontrada) {
        const cells = linhaEncontrada.querySelectorAll('td');
        // Atualizar valor recuperado
        const valorCell = cells[1];
        if (valorCell) {
            valorCell.textContent = formatBrazilianNumber(valorRecuperado);
            valorCell.classList.add('manual-edit');
            
            // Disparar evento para atualizar cálculos
            const event = new Event('blur');
            valorCell.dispatchEvent(event);
        }
    }
}