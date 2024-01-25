function calcularValores() {
    // Obter os valores inseridos pelo usuário
    var valorPIS = parseFloat(document.getElementById('valorPIS').value);
    var valorCOFINS = parseFloat(document.getElementById('valorCOFINS').value);
    var valorSISCOMEX = parseFloat(document.getElementById('valorSISCOMEX').value);
    var valorNumerario = parseFloat(document.getElementById('valorNumerario').value);
    
    // Calcular distribuição para cada fornecedor
    var distribuicoes = [];
    var quantidadeFornecedores = parseInt(document.getElementById('quantidadeFornecedores').value);
    for (var i = 1; i <= quantidadeFornecedores; i++) {
        var nome = document.getElementById('fornecedorNome' + i).value;
        var percentual = parseFloat(document.getElementById('fornecedorPercentual' + i).value);
        distribuicoes.push({ nome: nome, percentual: percentual });
    }
    
    // Exibir resultado
    var resultadoHTML = '';
    for (var j = 0; j < distribuicoes.length; j++) {
        var distribuicao = distribuicoes[j];
        var pisFornecedor = (distribuicao.percentual / 100) * valorPIS;
        var cofinsFornecedor = (distribuicao.percentual / 100) * valorCOFINS;
        var siscomexFornecedor = (distribuicao.percentual / 100) * valorSISCOMEX;
        var numerarioFornecedor = (distribuicao.percentual / 100) * valorNumerario;
        resultadoHTML += '<p>Fornecedor ' + distribuicao.nome + ':<br>';
        resultadoHTML += 'PIS: R$ ' + pisFornecedor.toFixed(2) + '<br>';
        resultadoHTML += 'COFINS: R$ ' + cofinsFornecedor.toFixed(2) + '<br>';
        resultadoHTML += 'SISCOMEX: R$ ' + siscomexFornecedor.toFixed(2) + '<br>';
        resultadoHTML += 'NUMERARIO: R$ ' + numerarioFornecedor.toFixed(2) + '</p>';
    }
    document.getElementById('resultado').innerHTML = resultadoHTML;
}

function limparCampos() {
    document.getElementById('valorPIS').value = '';
    document.getElementById('valorCOFINS').value = '';
    document.getElementById('valorSISCOMEX').value = '';
    document.getElementById('valorNumerario').value = '';
    document.getElementById('quantidadeFornecedores').value = '0';
    document.getElementById('fornecedoresFields').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
}

// Mostrar campos para os fornecedores selecionados
document.getElementById('quantidadeFornecedores').addEventListener('change', function() {
    var fornecedoresFields = document.getElementById('fornecedoresFields');
    fornecedoresFields.innerHTML = ''; // Limpar campos anteriores
    var quantidadeFornecedores = parseInt(this.value);
    for (var i = 1; i <= quantidadeFornecedores; i++) {
        var nomeInput = document.createElement('input');
        nomeInput.type = 'text';
        nomeInput.id = 'fornecedorNome' + i;
        nomeInput.placeholder = 'Nome do fornecedor ' + i;
        fornecedoresFields.appendChild(nomeInput);
        
        var percentualInput = document.createElement('input');
        percentualInput.type = 'text';
        percentualInput.id = 'fornecedorPercentual' + i;
        percentualInput.placeholder = 'Porcentagem do fornecedor ' + i + ' (em %)';
        fornecedoresFields.appendChild(percentualInput);
    }
    fornecedoresFields.style.display = quantidadeFornecedores > 0 ? 'block' : 'none';
});
