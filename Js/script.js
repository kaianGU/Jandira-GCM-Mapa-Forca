$(document).ready(function () {
    // Inicializa DataTable
    $('#tabela-registros').DataTable({
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/pt-BR.json"
        }
    });

    // Função para obter a data atual no formato YYYY-MM-DD
    function getDataAtual() {
        let hoje = new Date();
        let ano = hoje.getFullYear();
        let mes = String(hoje.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda se necessário
        let dia = String(hoje.getDate()).padStart(2, '0');
        return `${ano}-${mes}-${dia}`;
    }

    // Função para obter a hora atual no formato HH:MM
    function getHoraAtual() {
        let agora = new Date();
        let horas = String(agora.getHours()).padStart(2, '0');
        let minutos = String(agora.getMinutes()).padStart(2, '0');
        return `${horas}:${minutos}`;
    }

    // Botão "Novo Registro" - Mostra o formulário e preenche data e hora automaticamente
    $('#btn-novo-registro').on('click', function () {
        $('#data').val(getDataAtual());  // Define a data atual
        $('#horaInicio').val(getHoraAtual()); // Define a hora atual
        $('#form-container').slideDown(); // Mostra o formulário
    });

    // Botão "Cancelar" - Oculta o formulário
    $('#btn-cancelar').on('click', function () {
        $('#form-container').slideUp();
    });

    // Captura o evento de envio do formulário
    $('#form-registro').on('submit', function (e) {
        e.preventDefault();

        // Captura os valores do formulário
        var registro = [
            $('#data').val(),
            $('#ca').val(),
            $('#vtr').val(),
            $('#kmInicial').val(),
            $('#horaInicio').val(),
            $('#kmFinal').val(),
            $('#horaFinal').val(),
            $('#codigo').val(),
            $('#ocorrencia').val(),
            $('#localNatureza').val(),
            $('#bairro').val(),
            $('#re').val(),
            $('#encarregado').val(),
            $('#reEncarregado').val(),
            $('#motorista').val(),
            $('#reMotorista').val(),
            $('#terceiroHomem').val(),
            $('#reTerceiroHomem').val(),
            $('#radioOperador').val()
        ];

        // Adiciona a nova linha à tabela
        var table = $('#tabela-registros').DataTable();
        table.row.add(registro).draw();

        // Oculta o formulário após salvar
        $('#form-container').slideUp();

        // Limpa o formulário
        $('#form-registro')[0].reset();
    });
});
