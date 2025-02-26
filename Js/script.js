$(document).ready(function () {
    var table = $('#tabela-registros').DataTable({
        responsive: true,
        scrollX: true,
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/pt-BR.json"
        },
        searching: false,
        order: [[0, "desc"]],
        columnDefs: [
            {
                targets: 0, // Índice da coluna "Data"
                render: function (data, type, row) {
                    if (type === "display" || type === "filter") {
                        let partes = data.split("-");
                        return `${partes[2]}/${partes[1]}/${partes[0]}`;
                    }
                    return data;
                }
            }
        ]
    });

    function getDataAtual() {
        let hoje = new Date();
        let ano = hoje.getFullYear();
        let mes = String(hoje.getMonth() + 1).padStart(2, '0');
        let dia = String(hoje.getDate()).padStart(2, '0');
        return `${ano}-${mes}-${dia}`;
    }

    function getHoraAtual() {
        let agora = new Date();
        let horas = String(agora.getHours()).padStart(2, '0');
        let minutos = String(agora.getMinutes()).padStart(2, '0');
        return `${horas}:${minutos}`;
    }

    function getProximoCA(data) {
        let ultimoRegistro = JSON.parse(localStorage.getItem("ultimoCA")) || { data: "", ca: 0 };

        if (ultimoRegistro.data === data) {
            ultimoRegistro.ca += 1;
        } else {
            ultimoRegistro.ca = 1; // Se for um novo dia, reinicia para 1
        }

        localStorage.setItem("ultimoCA", JSON.stringify({ data: data, ca: ultimoRegistro.ca }));
        return ultimoRegistro.ca;
    }

    $('#btn-novo-registro').on('click', function () {
        $('#data').val(getDataAtual());
        $('#horaInicio').val(getHoraAtual());
        $('#form-container').slideDown();
    });

    $('#btn-cancelar').on('click', function () {
        $('#form-container').slideUp();
    });

    $('#form-registro').on('submit', function (e) {
        e.preventDefault();

        let dataISO = $('#data').val();
        let partesData = dataISO.split("-");
        let dataBR = `${partesData[2]}/${partesData[1]}/${partesData[0]}`;

        let caAtual = getProximoCA(dataISO); // Obtém o CA correto para a data

        var registro = [
            dataISO,
            caAtual, // O CA será calculado automaticamente
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

        table.row.add(registro).draw();

        $('#form-container').slideUp();
        $('#form-registro')[0].reset();
    });
});
