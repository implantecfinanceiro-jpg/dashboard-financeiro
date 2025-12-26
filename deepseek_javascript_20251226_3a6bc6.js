// MODIFIQUE A FUNÇÃO alternarMostrarApenasAtrasados:
function alternarMostrarApenasAtrasados() {
    const toggle = document.getElementById('toggle-mostrar-atrasados');
    mostrarApenasAtrasados = toggle.checked;
    
    // Atualizar visualização
    atualizarTabelaPagamentosMultiplos();
    
    // Atualizar informação
    const infoToggle = document.getElementById('info-toggle-atrasados');
    if (mostrarApenasAtrasados) {
        infoToggle.classList.remove('hidden');
        infoToggle.innerHTML = `
            <strong>📊 Modo: Mostrando apenas pagamentos em atraso</strong><br>
            <span class="text-sm">Valor total desconsidera "Recebidos dentro do prazo" (até ${document.getElementById('toleranciaDias').value || 2} dias de tolerância)</span>
        `;
    } else {
        infoToggle.classList.add('hidden');
    }
    
    saveDataToLocalStorage();
}