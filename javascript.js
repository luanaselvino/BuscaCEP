// Função para buscar o CEP
async function buscarCep() {
    const cepInput = document.getElementById('cep').value;
    
    // Limpa o CEP
    const cep = cepInput.replace(/\D/g, '');

    // Validação
    if (cep.length !== 8) {
        if(cep.length > 0) {
            alert("Por favor, digite um CEP válido com 8 números.");
        }
        return;
    }

    // URL da API
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        // conexão com o ViaCEP
        const resposta = await fetch(url);
        const dados = await resposta.json();

        if (dados.erro) {
            alert("CEP não encontrado!");
            limparCampos();
            return;
        }

        document.getElementById('rua').value = dados.logradouro;
        document.getElementById('bairro').value = dados.bairro;
        document.getElementById('cidade').value = `${dados.localidade} - ${dados.uf}`;

    } catch (erro) {
        console.error(erro);
        alert("Erro ao buscar o endereço. Verifique sua conexão.");
    }
}

// Função auxiliar para limpar o formulário
function limparCampos() {
    document.getElementById('rua').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
}
