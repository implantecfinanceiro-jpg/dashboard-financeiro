function processarEstatisticasCobranca(atrasados) {
    estatisticasCobranca = {};
    
    // Agrupar por tag
    const clientesPorTag = {};
    
    atrasados.forEach(atrasado => {
        const tag = atrasado.statusTag || 'SEM TAG';
        
        if (!clientesPorTag[tag]) {
            clientesPorTag[tag] = {
                quantidade: 0,
                valor: 0,
                clientesUnicos: new Set()
            };
        }
        
        clientesPorTag[tag].quantidade += 1;
        clientesPorTag[tag].valor += atrasado.valor || 0;
        
        if (atrasado.cnpjCpf) {
            clientesPorTag[tag].clientesUnicos.add(atrasado.cnpjCpf);
        }
    });
    
    // Calcular totais
    let totalValor = 0;
    let totalQuantidade = 0;
    const todasTags = Object.keys(clientesPorTag);
    
    todasTags.forEach(tag => {
        totalValor += clientesPorTag[tag].valor;
        totalQuantidade += clientesPorTag[tag].quantidade;
    });
    
    // Criar estatísticas
    todasTags.forEach(tag => {
        estatisticasCobranca[tag] = {
            quantidade: clientesPorTag[tag].quantidade,
            valor: clientesPorTag[tag].valor,
            percentual: totalValor > 0 ? (clientesPorTag[tag].valor / totalValor * 100) : 0,
            clientesUnicos: clientesPorTag[tag].clientesUnicos.size
        };
    });
    
    // Adicionar linha total
    estatisticasCobranca['TOTAL INADIMPLENTES'] = {
        quantidade: totalQuantidade,
        valor: totalValor,
        percentual: 100,
        clientesUnicos: new Set([...Object.values(clientesPorTag).flatMap(t => [...t.clientesUnicos])]).size
    };
}