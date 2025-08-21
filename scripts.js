document.addEventListener("DOMContentLoaded", () => {
    
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const items = document.querySelectorAll('.item');
    const consoles = document.querySelectorAll('.console');
    const botoes = document.querySelectorAll('nav ul li a');
   
    let timer;
    let activeIndex = 0;

    // Inicializa todos os items como visíveis
    items.forEach(item => item.dataset.visible = 'true');

    // Função para atualizar o carrossel
    function update(direction = 1) {
        const visibleItems = Array.from(items).filter(item => item.dataset.visible === "true");
        if (!visibleItems.length) return;

        const activeItem = document.querySelector('.item.active');
        if (activeItem) activeItem.classList.remove('active');

        activeIndex = visibleItems.indexOf(activeItem);
        if (activeIndex === -1) activeIndex = 0;

        activeIndex += direction;
        if (activeIndex >= visibleItems.length) activeIndex = 0;
        if (activeIndex < 0) activeIndex = visibleItems.length - 1;

        visibleItems[activeIndex].classList.add('active');
    }

    // Timer automático do carrossel
    function startTimer() {
        clearInterval(timer);
        timer = setInterval(() => update(1), 5000);
    }

    startTimer();

    // Eventos dos botões do menu
    botoes.forEach(botao => {
        botao.addEventListener('click', e => {
            e.preventDefault();
            const categoria = botao.dataset.category.toLowerCase();

            // Troca o console ativo
            consoles.forEach(c => c.classList.remove('active'));
            const consoleAtivo = Array.from(consoles).find(c => c.dataset.category.toLowerCase() === categoria);
            consoleAtivo?.classList.add('active');

            // Filtra items da categoria
            items.forEach(item => {
                item.dataset.visible = (item.dataset.category.toLowerCase() === categoria) ? 'true' : 'false';
                item.classList.remove('active');
            });

            // Ativa o primeiro item visível
            const firstVisible = Array.from(items).find(i => i.dataset.visible === 'true');
            if (firstVisible) firstVisible.classList.add('active');
            activeIndex = Array.from(items).indexOf(firstVisible);

            startTimer();
        });
    });


    prevButton.addEventListener('click', () => update(-1));
    nextButton.addEventListener('click', () => update(1));

   
});
