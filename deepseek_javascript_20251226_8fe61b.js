// MODIFIQUE A FUNÇÃO updateVariationValues:
function updateVariationValues() {
    const recuperacaoData = getRecuperacaoData();
    const inadimplenciaData = getInadimplenciaData();
    
    // Atualizar recuperação - cálculo correto
    if (recuperacaoData.valorRecuperado.length >= 2) {
        const ultimoMes = recuperacaoData.valorRecuperado[recuperacaoData.valorRecuperado.length - 1] || 0;
        const penultimoMes = recuperacaoData.valorRecuperado[recuperacaoData.valorRecuperado.length - 2] || 0;
        
        // Cálculo correto da variação percentual
        let variacaoRec = 0;
        if (penultimoMes > 0) {
            variacaoRec = ((ultimoMes - penultimoMes) / penultimoMes) * 100;
        } else if (ultimoMes > 0) {
            variacaoRec = 100; // Se não tinha recuperação antes e agora tem
        }
        
        // Limitar a variação para valores razoáveis
        variacaoRec = Math.max(-100, Math.min(100, variacaoRec));
        
        const ultimoMesLabel = recuperacaoData.labels[recuperacaoData.labels.length - 1] || 'Atual';
        const penultimoMesLabel = recuperacaoData.labels[recuperacaoData.labels.length - 2] || 'Anterior';
        
        document.getElementById('recuperacao-variacao-highlight').textContent = variacaoRec.toFixed(2);
        document.getElementById('recuperacao-variacao-rec').textContent = variacaoRec.toFixed(2);
        document.getElementById('recuperacao-detalhes').textContent = 
            `${ultimoMesLabel}: R$ ${formatBrazilianNumber(ultimoMes)} | ${penultimoMesLabel}: R$ ${formatBrazilianNumber(penultimoMes)}`;
        
        const colorRec = variacaoRec >= 0 ? 'text-green-500' : 'text-red-500';
        document.getElementById('recuperacao-variacao-highlight-text').className = `text-2xl font-bold cursor-pointer ${colorRec}`;
        document.getElementById('recuperacao-variacao-text-rec').className = `text-2xl font-bold cursor-pointer ${colorRec}`;
    } else {
        document.getElementById('recuperacao-detalhes').textContent = 'Dados insuficientes para cálculo';
    }

    // Atualizar inadimplência - cálculo correto
    if (inadimplenciaData.totalAtrasado.length >= 2) {
        const ultimoMes = inadimplenciaData.totalAtrasado[inadimplenciaData.totalAtrasado.length - 1] || 0;
        const penultimoMes = inadimplenciaData.totalAtrasado[inadimplenciaData.totalAtrasado.length - 2] || 0;
        
        // Cálculo correto da variação percentual
        let variacaoInad = 0;
        if (penultimoMes > 0) {
            variacaoInad = ((ultimoMes - penultimoMes) / penultimoMes) * 100;
        } else if (ultimoMes > 0) {
            variacaoInad = 100; // Se não tinha inadimplência antes e agora tem
        }
        
        // Limitar a variação para valores razoáveis
        variacaoInad = Math.max(-100, Math.min(100, variacaoInad));
        
        const ultimoMesLabel = inadimplenciaData.labels[inadimplenciaData.labels.length - 1] || 'Atual';
        const penultimoMesLabel = inadimplenciaData.labels[inadimplenciaData.labels.length - 2] || 'Anterior';
        
        document.getElementById('inadimplencia-variacao-highlight').textContent = variacaoInad.toFixed(2);
        document.getElementById('inadimplencia-variacao-rec').textContent = variacaoInad.toFixed(2);
        document.getElementById('inadimplencia-detalhes').textContent = 
            `${ultimoMesLabel}: R$ ${formatBrazilianNumber(ultimoMes)} | ${penultimoMesLabel}: R$ ${formatBrazilianNumber(penultimoMes)}`;
        
        const colorInad = variacaoInad <= 0 ? 'text-green-500' : 'text-red-500';
        document.getElementById('inadimplencia-variacao-highlight-text').className = `text-2xl font-bold cursor-pointer ${colorInad}`;
        document.getElementById('inadimplencia-variacao-text-rec').className = `text-2xl font-bold cursor-pointer ${colorInad}`;
    } else {
        document.getElementById('inadimplencia-detalhes').textContent = 'Dados insuficientes para cálculo';
    }
}