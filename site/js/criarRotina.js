// Atualização em tempo real da pré-visualização
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona todos os campos de entrada
    const inputs = document.querySelectorAll('#nomeTreino, #diaSemana, #observacoes');
    const selectMultiple = document.getElementById('foco');

    // Adiciona listeners para campos de texto
    inputs.forEach(input => {
        input.addEventListener('input', updatePreview);
    });

    // Adiciona listeners para selects
    document.getElementById('diaSemana').addEventListener('change', updatePreview);
    selectMultiple.addEventListener('change', updatePreview);

    // Atualiza a pré-visualização inicial
    updatePreview();

    // Configura o redimensionamento do painel
    setupResizable();
});

function updatePreview() {
    const nomeTreino = document.getElementById('nomeTreino').value;
    const diaSemana = document.getElementById('diaSemana').value;
    const foco = Array.from(document.getElementById('foco').selectedOptions).map(opt => opt.value).join(', ');
    const observacoes = document.getElementById('observacoes').value;

    // Atualiza os elementos de pré-visualização
    document.getElementById('previewNome').textContent = nomeTreino || '--';
    document.getElementById('previewDia').textContent = diaSemana || '--';
    document.getElementById('previewFoco').textContent = foco || '--';
    document.getElementById('previewObs').textContent = observacoes || '--';
}

function adicionarTreino() {
    // Aqui você pode adicionar a lógica para salvar o treino
    alert('Treino adicionado com sucesso!');
    // Limpar os campos se necessário
    // document.getElementById('nomeTreino').value = '';
    // document.getElementById('observacoes').value = '';
}

// Função para tornar o painel redimensionável
function setupResizable() {
    const resizeHandle = document.getElementById('resizeHandle');
    const leftPanel = document.querySelector('.left-panel');
    const rightPanel = document.querySelector('.right-panel');
    const wrapper = document.querySelector('.wrapper');

    let isResizing = false;
    let lastX = 0;

    resizeHandle.addEventListener('mousedown', (e) => {
        isResizing = true;
        lastX = e.clientX;
        document.body.style.cursor = 'col-resize';
        leftPanel.style.userSelect = 'none';
        leftPanel.style.pointerEvents = 'none';
        rightPanel.style.userSelect = 'none';
        rightPanel.style.pointerEvents = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;

        const dx = e.clientX - lastX;
        const leftPanelWidth = leftPanel.offsetWidth;
        const newLeftWidth = leftPanelWidth + dx;
        const wrapperWidth = wrapper.offsetWidth;

        // Define limites mínimos e máximos para o redimensionamento
        const minWidth = 300; // Largura mínima em pixels
        const maxWidth = wrapperWidth - 300; // Largura máxima

        if (newLeftWidth > minWidth && newLeftWidth < maxWidth) {
            leftPanel.style.width = `${newLeftWidth}px`;
            rightPanel.style.width = `calc(100% - ${newLeftWidth}px - 10px)`;
            lastX = e.clientX;
        }
    });

    document.addEventListener('mouseup', () => {
        isResizing = false;
        document.body.style.cursor = '';
        leftPanel.style.userSelect = '';
        leftPanel.style.pointerEvents = '';
        rightPanel.style.userSelect = '';
        rightPanel.style.pointerEvents = '';
    });
}