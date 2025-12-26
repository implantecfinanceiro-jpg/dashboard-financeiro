// NO SCRIPT, ADICIONE ESTA FUNÇÃO APÓS processarEstatisticasCobranca:
function atualizarInadimplenciaDoMes(mesSelecionado, valorAtrasados) {
    // Encontrar a linha correspondente ao mês na tabela de inadimplência
    const tabelaInadimplencia = document.querySelector('#inadimplencia-table tbody');
    const linhas = tabelaInadimplencia.querySelectorAll('tr');
    
    let linhaEncontrada = null;
    linhas.forEach(linha => {
        const cells = linha.querySelectorAll('td');
        if (cells[0]?.textContent.trim() === mesSelecionado) {
            linhaEncontrada = linha;
        }
    });
    
    if (linhaEncontrada) {
        const cells = linhaEncontrada.querySelectorAll('td');
        // Atualizar valor atrasado
        const valorCell = cells[1];
        if (valorCell) {
            valorCell.textContent = formatBrazilianNumber(valorAtrasados);
            valorCell.classList.add('manual-edit');
            
            // Disparar evento para atualizar cálculos
            const event = new Event('blur');
            valorCell.dispatchEvent(event);
        }
    }
}