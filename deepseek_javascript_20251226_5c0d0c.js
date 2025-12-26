function processarAtrasosPorAnoEmissao(atrasados) {
    const atrasosPorAno = {};
    
    atrasados.forEach(atrasado => {
        let ano = null;
        
        // Prioridade: Data de Emissão
        if (atrasado.dataEmissao) {
            const emissaoDate = parseExcelDate(atrasado.dataEmissao);
            if (emissaoDate) {
                ano = emissaoDate.getFullYear();
            }
        }
        
        // Fallback: Data de Vencimento
        if (!ano && atrasado.dataVencimento) {
            const vencDate = parseExcelDate(atrasado.dataVencimento);
            if (vencDate) {
                ano = vencDate.getFullYear();
            }
        }
        
        if (ano) {
            if (!atrasosPorAno[ano]) {
                atrasosPorAno[ano] = {
                    valor: 0,
                    quantidade: 0
                };
            }
            atrasosPorAno[ano].valor += atrasado.valor || 0;
            atrasosPorAno[ano].quantidade += 1;
        }
    });
    
    return atrasosPorAno;
}

// ATUALIZE A FUNÇÃO atualizarAtrasosAnoUI:
function atualizarAtrasosAnoUI() {
    if (atrasadosProcessados.length === 0) return;
    
    const atrasosPorAno = processarAtrasosPorAnoEmissao(atrasadosProcessados);
    const tabelaBody = document.getElementById('atrasos-ano-table-body');
    if (!tabelaBody) return;
    
    let html = '';
    const anos = Object.keys(atrasosPorAno).sort();
    
    anos.forEach(ano => {
        const dados = atrasosPorAno[ano];
        html += `
            <tr class="border-t border-gray-600">
                <td class="p-2">${ano}</td>
                <td class="p-2">${formatBrazilianNumber(dados.valor)}</td>
                <td class="p-2">${dados.quantidade}</td>
            </tr>
        `;
    });
    
    tabelaBody.innerHTML = html;
}