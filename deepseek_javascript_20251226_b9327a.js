// MODIFIQUE O CÁLCULO DOS ÍNDICES:
function calcularTotalAtrasadoRecuperacao(mes) {
    // Encontrar o mês correspondente na tabela de inadimplência
    const tabelaInadimplencia = document.querySelector('#inadimplencia-table tbody');
    const linhas = tabelaInadimplencia.querySelectorAll('tr');
    
    let valorAtrasado = 0;
    linhas.forEach(linha => {
        const cells = linha.querySelectorAll('td');
        if (cells[0]?.textContent.trim() === mes) {
            valorAtrasado = parseNumber(cells[1].textContent);
        }
    });
    
    return valorAtrasado;
}

// ATUALIZE A TABELA MANUALMENTE OU ADICIONE ESTE EVENT LISTENER:
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar listeners para atualização automática
    const cellsRecuperacao = document.querySelectorAll('#configuracoes-section .bg-gradient-to-br:nth-child(2) tbody td.update-recuperacao');
    cellsRecuperacao.forEach(cell => {
        cell.addEventListener('blur', function() {
            // Recalcular total atrasado se necessário
            const row = this.parentElement;
            const cells = row.querySelectorAll('td');
            const mes = cells[0].textContent.trim();
            
            // Se estiver editando valor recuperado, manter total atrasado
            // Se estiver editando total atrasado, recalcular
            if (this.cellIndex === 2) { // Coluna de total atrasado
                // Já está editando, não fazer nada
            } else if (this.cellIndex === 1) { // Coluna de valor recuperado
                // Atualizar célula de total atrasado se estiver vazia
                const totalAtrasadoCell = cells[2];
                if (!totalAtrasadoCell.textContent || totalAtrasadoCell.textContent === '0,00') {
                    const totalAtrasado = calcularTotalAtrasadoRecuperacao(mes);
                    if (totalAtrasado > 0) {
                        totalAtrasadoCell.textContent = formatBrazilianNumber(totalAtrasado);
                        totalAtrasadoCell.classList.add('manual-edit');
                    }
                }
            }
        });
    });
});