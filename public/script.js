const dados = {
  temporadas: [
    {
      id: 1,
      nome: 'Temporada 1',
      descricao:
        'O início de tudo: a chegada do Capitão Holt e o começo das disputas do Halloween.',
      conteudo:
        'A primeira temporada estabelece a dinâmica icônica entre Jake Peralta e o novo e rigoroso Capitão Raymond Holt, além de introduzir o lendário Roubo de Halloween original.',
      ano_lancamento: '2013',
      destaque: true,
      imagem_principal: 'imgs/temporada1.jpg',
      atracoes: [
        {
          id: 1,
          nome: 'Episódio: Halloween',
          descricao:
            'O primeiro roubo da história do distrito, onde a aposta anual nasceu.',
          imagem: 'imgs/halloween1.jpg',
        },
        {
          id: 2,
          nome: 'Episódio: Noite Sem Ópera',
          descricao: 'O episódio mais bem avaliado da série inteira no IMDB.',
          imagem: 'imgs/noite-sem-opera.jpg',
        },
        {
          id: 3,
          nome: 'Episódio: O Piloto',
          descricao: 'A apresentação do esquadrão mais caótico de Nova York.',
          imagem: 'imgs/piloto.jpg',
        },
      ],
    },
    {
      id: 2,
      nome: 'Temporada 2',
      descricao:
        'Jake lida com sentimentos por Amy e Holt enfrenta sua arqui-inimiga Madeline Wuntch.',
      conteudo:
        'A temporada expande o universo com investigações profundas, o amadurecimento do esquadrão e o infame retorno do bandido Pontiac Bandit.',
      ano_lancamento: '2014',
      destaque: false,
      imagem_principal: 'imgs/temporada2.jpg',
      atracoes: [
        {
          id: 4,
          nome: 'Episódio: Halloween II',
          descricao:
            'Holt prova que está passos à frente de Peralta in genialidade.',
          imagem: 'imgs/halloween2.jpg',
        },
        {
          id: 5,
          nome: 'Episódio: The Chocolate Milk',
          descricao:
            'A introdução da rivalidade histórica entre Holt e Wuntch.',
          imagem: 'imgs/wuntch.jpg',
        },
      ],
    },
    {
      id: 3,
      nome: 'Temporada 3',
      descricao:
        "Novos capitães temporários assumem o distrito e o romance 'Peraltiago' decola.",
      conteudo:
        'Com Holt temporariamente afastado no departamento de relações públicas, a 99 enfrenta transições bizarras de liderança enquanto o roubo anual ganha novos concorrentes.',
      ano_lancamento: '2015',
      destaque: true,
      imagem_principal: 'imgs/temporada3.jpg',
      atracoes: [
        {
          id: 6,
          nome: 'Episódio: Halloween III',
          descricao: 'Amy Santiago choca o esquadrão e reinventica a coroa.',
          imagem: 'imgs/halloween3.jpg',
        },
        {
          id: 7,
          nome: 'Episódio: The Cruise',
          descricao: 'As férias de Jake e Amy são invadidas por Doug Judy.',
          imagem: 'imgs/cruzeiro.jpg',
        },
      ],
    },
  ],
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('container-home')) {
    carregarHomePage();
  } else if (document.getElementById('container-detalhes')) {
    carregarDetalhesPage();
  }
});

function carregarHomePage() {
  const carroselInner = document.getElementById('carrosel-destaques');
  const gridCards = document.getElementById('grid-todos-itens');

  if (!carroselInner || !gridCards) return;

  let primeiroDestaque = true;
  carroselInner.innerHTML = '';
  gridCards.innerHTML = '';

  dados.temporadas.forEach(temp => {
    if (temp.destaque) {
      const activeClass = primeiroDestaque ? 'active' : '';
      primeiroDestaque = false;

      carroselInner.innerHTML += `
        <div class="carousel-item ${activeClass}">
          <img src="${temp.imagem_principal}" class="d-block w-100 object-fit-cover rounded" style="height: 400px;" alt="${temp.nome}">
          <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded p-3">
            <h5>${temp.nome} (Destaque)</h5>
            <p>${temp.descricao}</p>
            <a href="detalhes.html?id=${temp.id}" class="btn btn-warning btn-sm fw-bold">Ver Detalhes</a>
          </div>
        </div>
      `;
    }

    gridCards.innerHTML += `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm border-0 border-top border-warning border-4">
          <img src="${temp.imagem_principal}" class="card-img-top object-fit-cover" style="height: 200px;" alt="${temp.nome}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold text-dark">${temp.nome}</h5>
            <p class="card-text text-secondary flex-grow-1">${temp.descricao}</p>
            <a href="detalhes.html?id=${temp.id}" class="btn btn-primary mt-3 fw-bold w-100">
              Explorar Itens
            </a>
          </div>
        </div>
      </div>
    `;
  });
}

function carregarDetalhesPage() {
  const params = new URLSearchParams(window.location.search);
  const idItem = parseInt(params.get('id'));

  const item =
    dados.temporadas.find(t => t.id === idItem) || dados.temporadas[0];

  const containerGeral = document.getElementById('info-gerais-item');
  const containerFotos = document.getElementById('fotos-associadas');

  if (!containerGeral || !containerFotos) return;

  containerGeral.innerHTML = `
    <div class="row g-4 align-items-center">
      <div class="col-md-5">
        <img src="${item.imagem_principal}" class="img-fluid rounded shadow" alt="${item.nome}">
      </div>
      <div class="col-md-7">
        <h2 class="fw-bold mb-3">${item.nome}</h2>
        <p class="lead text-muted">${item.descricao}</p>
        <hr class="border-warning border-2 my-3">
        
        <ul class="list-group list-group-flush shadow-sm rounded">
          <li class="list-group-item"><strong>1. Resumo Histórico:</strong> ${item.conteudo}</li>
          <li class="list-group-item"><strong>2. Ano de Exibição Original:</strong> ${item.ano_lancamento}</li>
          <li class="list-group-item"><strong>3. Status de Destaque:</strong> ${item.destaque ? '🌟 Selecionada pelo Capitão' : '📋 Registro Padrão'}</li>
          <li class="list-group-item"><strong>4. Identificador de Arquivo:</strong> #B99-00${item.id}</li>
          <li class="list-group-item"><strong>5. Total de Itens Associados:</strong> ${item.atracoes.length} episódios indexados</li>
        </ul>
      </div>
    </div>
  `;

  containerFotos.innerHTML = '';
  item.atracoes.forEach(atracao => {
    containerFotos.innerHTML += `
      <div class="col-12 col-sm-6 col-md-4">
        <div class="card h-100 border-0 shadow-sm">
          <img src="${atracao.imagem}" class="card-img-top object-fit-cover" style="height: 180px;" alt="${atracao.nome}">
          <div class="card-body bg-light text-center py-2">
            <h6 class="card-title fw-bold text-dark mb-0">${atracao.nome}</h6>
            <p class="card-text small text-secondary mb-0">${atracao.descricao}</p>
          </div>
        </div>
      </div>
    `;
  });
}
