var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();
    
    var form = document.querySelector("#form-adiciona");
    
    var paciente = obtemPacienteDoFormulario(form);
    
    var pacienteTr = montaTr(paciente);
    
    var erros = validaPaciente(paciente);
    
    if(erros.length > 0){
        exibeMensagensDeErro(erros);
        return;
    }
    
    var tabela = document.querySelector("#tabela-pacientes");
    
    tabela.appendChild(pacienteTr);
    
    adicionaPacienteNaTabela(paciente);
    
    form.reset();
    
    var mensagensErro = document.querySelector("#mensagens-erro");
    mensagensErro.innerHTML = "";
});

function excluirPaciente(i){
    
    document.getElementById("tabela-pacientes").deleteRow(i);
}

function obtemPacienteDoFormulario(form){
    
    var paciente = {
        nome : form.nome.value,
        peso : form.peso.value,
        altura : form.altura.value,
        gordura : form.gordura.value,
        imc : calculaImc(peso,altura)
    }
    return paciente;
}

function montaTr(paciente){
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");
    
    var nomeTd = document.createElement("td");
    var pesoTd = document.createElement("td");
    var alturaTd = document.createElement("td");
    var gorduraTd = document.createElement("td");
    var imcTd = document.createElement("td");
    var excluirTd = document.createElement("td");
    
    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));
    pacienteTr.appendChild(montaTdComIcone("info-excluir"));
    
    return pacienteTr;
}

function montaTd(dado, classe){
    var td = document.createElement("td");
    td.classList.add(classe);
    td.textContent = dado;
    
    return td;
}

function montaTdComIcone(classe){
    var td = document.createElement("td");
    var anc = document.createElement("a");
    anc.href = "javascript:void(0);";
    anc.setAttribute("onclick", "excluirPaciente(this.parentNode.parentNode.rowIndex)");
    anc.setAttribute("id", "remove-paciente");
    anc.appendChild(criaIconeDelete());
    td.classList.add(classe);
    td.appendChild(anc);
    
    return td;
}

function criaIconeDelete(){
    var img = document.createElement("img");
    img.src = '/img/delete.svg';
    document.getElementById("img-excluir").appendChild(img);
    return img;
}

function validaPaciente(paciente){
    var erros = [];
    
    
    if (paciente.nome.length == 0) {
        erros.push("O nome não pode ser em branco");
    }
    if (paciente.gordura.length == 0) {
        erros.push("A gordura não pode ser em branco");
    }
    if (paciente.peso.length == 0) {
        erros.push("O peso não pode ser em branco");
    }
    if (paciente.altura.length == 0) {
        erros.push("A altura não pode ser em branco");
    }
    if(!validaPeso(paciente.peso)){
        erros.push("Peso é inválido!");
    }
    if(!validaAltura(paciente.altura)){
        erros.push("Altura é inválida!");
    }
    return erros;
}

function exibeMensagensDeErro(erros){
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";
    
    erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function adicionaPacienteNaTabela(paciente) {
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}

