function initializeDashboard() {
    try {
        loadDataFromLocalStorage();
        initSelectionTools();
        initRenegociarTable();
        updateProcessingOptions();
        
        // Garantir que os widgets tenham os listeners de maximização
        setTimeout(() => {
            const widgetTitles = document.querySelectorAll('[id^="widget-"] h2');
            widgetTitles.forEach(title => {
                const widgetId = title.closest('[id^="widget-"]').id;
                title.style.cursor = 'pointer';
                title.onclick = (e) => {
                    e.stopPropagation();
                    maximizeWidget(widgetId);
                };
            });
            
            // Inicializar gráficos
            initializeAllCharts();
            
            // Inicializar toggle
            const toggle = document.getElementById('toggle-mostrar-atrasados');
            if (toggle) {
                toggle.checked = mostrarApenasAtrasados;
            }
            
        }, 500);
        
        console.log('Dashboard inicializado com sucesso!');
    } catch (error) {
        console.error('Erro na inicialização do dashboard:', error);
    }
}