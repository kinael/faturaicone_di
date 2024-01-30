var modoEscuroAtivado = false;

function exportarParaExcel() {
    var valorPIS = parseFloat(document.getElementById('valorPIS').value.replace('.', '').replace(',', '.'));
    var valorCOFINS = parseFloat(document.getElementById('valorCOFINS').value.replace('.', '').replace(',', '.'));
    var valorSISCOMEX = parseFloat(document.getElementById('valorSISCOMEX').value.replace('.', '').replace(',', '.'));
    var valorNumerario = parseFloat(document.getElementById('valorNumerario').value.replace('.', '').replace(',', '.'));
    var valorVariacao = parseFloat(document.getElementById('valorVariacao').value.replace('.', '').replace(',', '.'));
    var quantidadeFornecedores = parseInt(document.getElementById('quantidadeFornecedores').value);

    if (isNaN(valorPIS) || isNaN(valorCOFINS) || isNaN(valorSISCOMEX) || isNaN(valorNumerario) || isNaN(valorVariacao) || quantidadeFornecedores === 0) {
        alert('Preencha todos os campos corretamente.');
        return;
    }

    var dados = [];
    for (var i = 1; i <= quantidadeFornecedores; i++) {
        var nomeFornecedor = document.getElementById('fornecedorNome' + i).value;
        var percentualFornecedor = parseFloat(document.getElementById('fornecedorPercentual' + i).value.replace(',', '.'));

        var pisFornecedor = (percentualFornecedor / 100) * valorPIS;
        var cofinsFornecedor = (percentualFornecedor / 100) * valorCOFINS;
        var siscomexFornecedor = (percentualFornecedor / 100) * valorSISCOMEX;
        var numerarioFornecedor = (percentualFornecedor / 100) * valorNumerario;
        var variacaoFornecedor = (percentualFornecedor / 100) * valorVariacao;

        dados.push({
            'Nome do fornecedor': nomeFornecedor,
            'Percentual': percentualFornecedor + '%',
            'PIS': pisFornecedor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            'COFINS': cofinsFornecedor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            'SISCOMEX': siscomexFornecedor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            'NUMERARIO': numerarioFornecedor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            'VARIAÇÃO': variacaoFornecedor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        });
    }

    var wb = XLSX.utils.book_new();
    var wsDados = XLSX.utils.json_to_sheet(dados);
    XLSX.utils.book_append_sheet(wb, wsDados, 'Dados dos fornecedores');

    var wsResumo = XLSX.utils.json_to_sheet([{
        'Valor total PIS': valorPIS.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        'Valor total COFINS': valorCOFINS.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        'Valor total SISCOMEX': valorSISCOMEX.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        'Valor total NUMERARIO': valorNumerario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        'Valor total VARIAÇÃO': valorVariacao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        'Quantidade de fornecedores': quantidadeFornecedores
    }]);
    XLSX.utils.book_append_sheet(wb, wsResumo, 'Resumo');

    var nomeDoArquivo = 'Resultados_CalculoEntradaDI.xlsx';
    XLSX.writeFile(wb, nomeDoArquivo);
}

function calcularValores() {
    var valorPIS = parseFloat(document.getElementById('valorPIS').value.replace('.', '').replace(',', '.'));
    var valorCOFINS = parseFloat(document.getElementById('valorCOFINS').value.replace('.', '').replace(',', '.'));
    var valorSISCOMEX = parseFloat(document.getElementById('valorSISCOMEX').value.replace('.', '').replace(',', '.'));
    var valorNumerario = parseFloat(document.getElementById('valorNumerario').value.replace('.', '').replace(',', '.'));
    var valorVariacao = parseFloat(document.getElementById('valorVariacao').value.replace('.', '').replace(',', '.'));

    var distribuicoes = [];
    var quantidadeFornecedores = parseInt(document.getElementById('quantidadeFornecedores').value);
    for (var i = 1; i <= quantidadeFornecedores; i++) {
        var nome = document.getElementById('fornecedorNome' + i).value;
        var percentual = parseFloat(document.getElementById('fornecedorPercentual' + i).value.replace(',', '.'));
        distribuicoes.push({ nome: nome, percentual: percentual });
    }

var resultadoHTML = '';
for (var j = 0; j < distribuicoes.length; j++) {
    var distribuicao = distribuicoes[j];
    var pisFornecedor = (distribuicao.percentual / 100) * valorPIS;
    var cofinsFornecedor = (distribuicao.percentual / 100) * valorCOFINS;
    var siscomexFornecedor = (distribuicao.percentual / 100) * valorSISCOMEX;
    var numerarioFornecedor = (distribuicao.percentual / 100) * valorNumerario;
    var variacaoFornecedor = (distribuicao.percentual / 100) * valorVariacao;

    pisFornecedor = pisFornecedor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    cofinsFornecedor = cofinsFornecedor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    siscomexFornecedor = siscomexFornecedor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    numerarioFornecedor = numerarioFornecedor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    variacaoFornecedor = variacaoFornecedor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    resultadoHTML += '<div class="resultado-item">';
    resultadoHTML += '<p class="fornecedor-nome"> <b> Fornecedor: ' + distribuicao.nome + '  </b> </p>';
    resultadoHTML += '<div class="resultado-detalhes">';
    resultadoHTML += '<p class="resultado-detalhe"> <b> PIS: </b> ' + pisFornecedor + ' </p>';
    resultadoHTML += '<p class="resultado-detalhe"> <b> COFINS: </b> ' + cofinsFornecedor + ' </p>';
    resultadoHTML += '<p class="resultado-detalhe"> <b> SISCOMEX: </b> ' + siscomexFornecedor + ' </p>';
    resultadoHTML += '<p class="resultado-detalhe"> <b> NUMERARIO: </b> ' + numerarioFornecedor + ' </p>';
    resultadoHTML += '<p class="resultado-detalhe"> <b> VARIAÇÃO: </b> ' + variacaoFornecedor + ' </p>';
    resultadoHTML += '</div></div>';
}

    document.getElementById('resultado').innerHTML = resultadoHTML;

 if (validarInformacoes()) {
        document.getElementById('exportarExcelButton').style.display = 'block';
    }

}

function validarInformacoes() {
    var valorPIS = parseFloat(document.getElementById('valorPIS').value.replace('.', '').replace(',', '.'));
    var valorCOFINS = parseFloat(document.getElementById('valorCOFINS').value.replace('.', '').replace(',', '.'));
    var valorSISCOMEX = parseFloat(document.getElementById('valorSISCOMEX').value.replace('.', '').replace(',', '.'));
    var valorNumerario = parseFloat(document.getElementById('valorNumerario').value.replace('.', '').replace(',', '.'));
    var valorVariacao = parseFloat(document.getElementById('valorVariacao').value.replace('.', '').replace(',', '.'));
    var quantidadeFornecedores = parseInt(document.getElementById('quantidadeFornecedores').value);

    if (isNaN(valorPIS) || isNaN(valorCOFINS) || isNaN(valorSISCOMEX) || isNaN(valorNumerario) || isNaN(valorVariacao) || quantidadeFornecedores === 0) {
        alert('Preencha todos os campos corretamente.');
        return false;
    }

    return true;
}

function limparCampos() {
    document.getElementById('valorPIS').value = '';
    document.getElementById('valorCOFINS').value = '';
    document.getElementById('valorSISCOMEX').value = '';
    document.getElementById('valorNumerario').value = '';
    document.getElementById('valorVariacao').value = '';
    document.getElementById('quantidadeFornecedores').value = '0';
    document.getElementById('fornecedoresFields').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';

    document.getElementById('exportarExcelButton').style.display = 'none';
}

document.getElementById('quantidadeFornecedores').addEventListener('change', function() {
    var fornecedoresFields = document.getElementById('fornecedoresFields');
    fornecedoresFields.innerHTML = '';
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

function carregarModoEscuro() {
  var modoEscuroSalvo = localStorage.getItem('modoEscuro');
  if (modoEscuroSalvo !== null) {
    modoEscuroAtivado = JSON.parse(modoEscuroSalvo);
    aplicarModoEscuro();
  }
}

function salvarModoEscuro() {
  localStorage.setItem('modoEscuro', modoEscuroAtivado);
}

function aplicarModoEscuro() {
  var body = document.body;
  body.classList.toggle('dark-mode', modoEscuroAtivado);

  var modoEscuroBtn = document.querySelector('.modo-escuro-btn');
  modoEscuroBtn.textContent = modoEscuroAtivado ? 'Modo Claro' : 'Modo Escuro';
}

function alternarModo() {
  modoEscuroAtivado = !modoEscuroAtivado;
  salvarModoEscuro();
  aplicarModoEscuro();
}

document.addEventListener('DOMContentLoaded', (event) => {
  carregarModoEscuro();
});
