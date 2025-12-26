function editarStatusCliente(cpfCnpj, event) {
    event.stopPropagation();
    
    // Encontrar todas as parcelas do cliente
    const parcelasCliente = parcelasAtrasadas.filter(p => p.cnpjCpf === cpfCnpj);
    if (parcelasCliente.length === 0) return;
    
    // Usar a primeira parcela como referência
    const parcela = parcelasCliente[0];
    
    // Modal para selecionar tag
    const modalHTML = `
        <div class="fixed inset-0 bg-black bg-opacity-80 z-10000 flex justify-center items-center">
            <div class="bg-gray-800 rounded-lg p-6 max-w-md w-full">
                <h3 class="text-lg font-semibold mb-4">🏷️ Selecionar Tag para ${parcela.parceiro}</h3>
                <p class="text-sm text-gray-400 mb-4">Esta tag será aplicada a todas as ${parcelasCliente.length} parcelas do cliente.</p>
                <div class="grid grid-cols-2 gap-2 mb-4" id="opcoesTagAtrasado">
                    ${['NOTIFICADOS', 'AJUIZADOS', 'ACORDO - CLIENTE REC. JUDICIAL', 'ACORDOS ASSINADOS', 
                       'PARCEIROS (ESTRATÉGICOS)', 'PREESCRITOS', 'VALOR INFERIOR', 
                       'NEGOCIAÇÃO EM ANDAMENTO', 'À NEGOCIAR'].map(tag => `
                        <button onclick="aplicarTagCliente('${cpfCnpj}', '${tag}')" 
                                class="p-2 bg-gray-700 hover:bg-gray-600 rounded text-sm">
                            ${tag}
                        </button>
                    `).join('')}
                </div>
                <button onclick="fecharModalTag()" class="w-full p-2 bg-red-600 hover:bg-red-700 rounded">
                    Cancelar
                </button>
            </div>
        </div>
    `;
    
    const modal = document.createElement('div');
    modal.id = 'modal-tag-atrasado';
    modal.innerHTML = modalHTML;
    document.body.appendChild(modal);
}

function aplicarTagCliente(cpfCnpj, tag) {
    // Aplicar tag a todas as parcelas do cliente
    parcelasAtrasadas.forEach(parcela => {
        if (parcela.cnpjCpf === cpfCnpj) {
            parcela.statusTag = tag;
        }
    });
    
    // Atualizar estatísticas de cobrança
    atualizarEstatisticasCobranca(parcelasAtrasadas);
    atualizarEstatisticasCobrancaUI();
    
    // Atualizar lista
    atualizarListaParcelasAtrasadas(parcelasAtrasadas);
    fecharModalTag();
    saveDataToLocalStorage();
    
    alert(`Tag "${tag}" aplicada a todas as parcelas do cliente.`);
}