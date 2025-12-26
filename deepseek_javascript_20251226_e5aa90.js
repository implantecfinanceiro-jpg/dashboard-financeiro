// MODIFIQUE A FUNÇÃO getNotasParceirosData:
function getNotasParceirosData() {
    // Usar dados processados da planilha de atrasados
    if (atrasadosProcessados.length > 0) {
        // Calcular totais da última planilha
        const cpfsUnicos = new Set();
        const notasUnicas = new Set();
        
        atrasadosProcessados.forEach(atrasado => {
            if (atrasado.cnpjCpf) {
                cpfsUnicos.add(atrasado.cnpjCpf);
            }
            if (atrasado.nroNota) {
                notasUnicas.add(atrasado.nroNota);
            }
        });
        
        // Retornar para gráfico de pizza
        return {
            labels: ['CPFs Únicos', 'Notas Únicas'],
            valores: [cpfsUnicos.size, notasUnicas.size],
            cores: ['rgba(239, 68, 68, 0.7)', 'rgba(59, 130, 246, 0.7)']
        };
    }
    
    // Fallback
    return {
        labels: ['CPFs', 'Notas'],
        valores: [0, 0],
        cores: ['rgba(239, 68, 68, 0.7)', 'rgba(59, 130, 246, 0.7)']
    };
}

// ATUALIZE updateNotasParceirosChart:
function updateNotasParceirosChart() {
    const data = getNotasParceirosData();
    
    updateChart('notasParceirosChartHighlight', {
        type: 'pie',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.valores,
                backgroundColor: data.cores,
                borderColor: [
                    'rgba(239, 68, 68, 1)',
                    'rgba(59, 130, 246, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' }
            }
        }
    });
}