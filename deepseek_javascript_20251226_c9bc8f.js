// MODIFIQUE A FUNÇÃO updateCobrancaChart:
function updateCobrancaChart() {
    const data = getCobrancaData();
    
    // Se não houver dados, mostrar mensagem
    if (data.categorias.length === 0) {
        const canvas = document.getElementById('cobrancaPieChartInad');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = '14px Arial';
            ctx.fillStyle = '#9CA3AF';
            ctx.textAlign = 'center';
            ctx.fillText('Nenhum dado disponível', canvas.width/2, canvas.height/2);
        }
        return;
    }
    
    updateChart('cobrancaPieChartInad', {
        type: 'pie',
        data: {
            labels: data.categorias,
            datasets: [{
                data: data.valores,
                backgroundColor: [
                    'rgba(239, 68, 68, 0.7)',
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(34, 197, 94, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(139, 92, 246, 0.7)',
                    'rgba(236, 72, 153, 0.7)',
                    'rgba(156, 163, 175, 0.7)',
                    'rgba(251, 191, 36, 0.7)',
                    'rgba(99, 102, 241, 0.7)'
                ],
                borderColor: [
                    'rgba(239, 68, 68, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(34, 197, 94, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(139, 92, 246, 1)',
                    'rgba(236, 72, 153, 1)',
                    'rgba(156, 163, 175, 1)',
                    'rgba(251, 191, 36, 1)',
                    'rgba(99, 102, 241, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { 
                    position: 'top',
                    labels: {
                        color: '#D1D5DB'
                    }
                }
            }
        }
    });
}