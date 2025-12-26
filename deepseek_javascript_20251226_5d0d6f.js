// MODIFIQUE A FUNÇÃO processarDadosAtrasados para incluir agrupamento:
function agruparAtrasadosPorCliente(atrasados) {
    const clientesAgrupados = {};
    
    atrasados.forEach(atrasado => {
        const cpfCnpj = atrasado.cnpjCpf || atrasado.parceiro;
        
        if (!clientesAgrupados[cpfCnpj]) {
            clientesAgrupados[cpfCnpj] = {
                nome: atrasado.parceiro,
                cpfCnpj: cpfCnpj,
                parcelas: [],
                notasUnicas: new Set(),
                tipoTitulo: atrasado.tipoTitulo || '',
                statusTag: atrasado.statusTag || '',
                totalValor: 0,
                dataVencimentoMaisAntiga: null,
                diasAtrasoMaior: 0
            };
        }
        
        // Adicionar parcela
        clientesAgrupados[cpfCnpj].parcelas.push(atrasado);
        
        // Adicionar nota única
        if (atrasado.nroNota) {
            clientesAgrupados[cpfCnpj].notasUnicas.add(atrasado.nroNota);
        }
        
        // Somar valor
        clientesAgrupados[cpfCnpj].totalValor += atrasado.valor || 0;
        
        // Encontrar data de vencimento mais antiga
        const vencDate = parseExcelDate(atrasado.dataVencimento);
        if (vencDate) {
            if (!clientesAgrupados[cpfCnpj].dataVencimentoMaisAntiga || 
                vencDate < clientesAgrupados[cpfCnpj].dataVencimentoMaisAntiga) {
                clientesAgrupados[cpfCnpj].dataVencimentoMaisAntiga = vencDate;
            }
        }
        
        // Encontrar maior atraso
        if (atrasado.diasAtraso > clientesAgrupados[cpfCnpj].diasAtrasoMaior) {
            clientesAgrupados[cpfCnpj].diasAtrasoMaior = atrasado.diasAtraso;
        }
    });
    
    return clientesAgrupados;
}

// ATUALIZE A FUNÇÃO atualizarListaParcelasAtrasadas:
function atualizarListaParcelasAtrasadas(parcelas) {
    // Agrupar por cliente
    const clientesAgrupados = agruparAtrasadosPorCliente(parcelas);
    const clientesArray = Object.values(clientesAgrupados);
    
    const lista = document.getElementById('lista-parcelas-atrasadas');
    document.getElementById('total-parcelas-atrasadas').textContent = clientesArray.length;
    
    if (clientesArray.length === 0) {
        lista.innerHTML = '<p class="text-gray-400 text-center p-4">Nenhuma parcela em atraso encontrada.</p>';
        return;
    }
    
    let html = '';
    clientesArray.forEach((cliente, index) => {
        html += `
            <div class="parcela-item alta-probabilidade pago-atraso" data-cliente-index="${index}">
                <div class="parcela-header">
                    <div class="parcela-cliente" ondblclick="expandirCliente('${cliente.cpfCnpj}', this)">
                        ${cliente.nome}
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="parcela-probabilidade">${cliente.statusTag || 'SEM TAG'}</div>
                        <button class="btn-editar-status" onclick="editarStatusCliente('${cliente.cpfCnpj}', event)">🏷️ Tag</button>
                    </div>
                </div>
                <div class="parcela-detalhes">
                    <div class="detalhe-item">
                        <span class="detalhe-label">Notas:</span>
                        <span class="detalhe-valor">${cliente.notasUnicas.size}</span>
                    </div>
                    <div class="detalhe-item">
                        <span class="detalhe-label">Venc. Mais Antigo:</span>
                        <span class="detalhe-valor">${cliente.dataVencimentoMaisAntiga ? formatDateBR(cliente.dataVencimentoMaisAntiga) : 'N/A'}</span>
                    </div>
                    <div class="detalhe-item">
                        <span class="detalhe-label">Maior Atraso:</span>
                        <span class="detalhe-valor text-red-400">${cliente.diasAtrasoMaior} dias</span>
                    </div>
                    <div class="detalhe-item">
                        <span class="detalhe-label">Valor Total:</span>
                        <span class="detalhe-valor">R$ ${formatBrazilianNumber(cliente.totalValor)}</span>
                    </div>
                    <div class="detalhe-item">
                        <span class="detalhe-label">Tipo Título:</span>
                        <span class="detalhe-valor">${cliente.tipoTitulo || 'N/A'}</span>
                    </div>
                    <div class="detalhe-item">
                        <span class="detalhe-label">Parcelas:</span>
                        <span class="detalhe-valor">${cliente.parcelas.length}</span>
                    </div>
                </div>
                <div id="detalhes-cliente-${cliente.cpfCnpj}" class="hidden mt-3 p-3 bg-gray-800 rounded-lg">
                    <!-- Parcelas individuais serão carregadas aqui -->
                </div>
            </div>
        `;
    });
    
    lista.innerHTML = html;
}

// ADICIONE ESTA FUNÇÃO PARA EXPANDIR CLIENTE:
function expandirCliente(cpfCnpj, element) {
    const detalhesDiv = document.getElementById(`detalhes-cliente-${cpfCnpj}`);
    if (detalhesDiv.classList.contains('hidden')) {
        // Buscar cliente
        const cliente = parcelasAtrasadas.filter(p => p.cnpjCpf === cpfCnpj);
        
        let detalhesHTML = '<h4 class="font-bold mb-2">Parcelas individuais:</h4>';
        cliente.forEach((parcela, index) => {
            detalhesHTML += `
                <div class="p-2 mb-2 bg-gray-700 rounded">
                    <div class="grid grid-cols-3 gap-2 text-sm">
                        <div><span class="text-gray-400">Nota:</span> ${parcela.nroNota || 'N/A'}</div>
                        <div><span class="text-gray-400">Vencimento:</span> ${parcela.dataVencimento || 'N/A'}</div>
                        <div><span class="text-gray-400">Valor:</span> R$ ${formatBrazilianNumber(parcela.valor)}</div>
                    </div>
                </div>
            `;
        });
        
        detalhesDiv.innerHTML = detalhesHTML;
        detalhesDiv.classList.remove('hidden');
        
        // Rolar para o elemento
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        detalhesDiv.classList.add('hidden');
    }
}