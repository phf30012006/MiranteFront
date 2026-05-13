# Mapa Interativo - Mirante da Sustentabilidade

Este componente implementa um mapa interativo dos municípios de São Paulo usando a biblioteca Leaflet.

## Funcionalidades

- **Mapa Interativo**: Visualização de todos os municípios de São Paulo com marcadores
- **Marcadores Dinâmicos**: Tamanho e cor dos marcadores variam de acordo com a quantidade de ações
- **Carregamento Otimizado**: Municípios aparecem rapidamente, ações carregadas em background
- **Indicador de Progresso**: Mostra o progresso do carregamento dos dados
- **Painel Lateral**: Ao clicar em um município, abre um drawer lateral com informações detalhadas
- **Integração com API**: Busca dados dos municípios, ações e ODS diretamente da API
- **Responsivo**: Funciona em dispositivos móveis e desktop

## Como Funciona

### Carregamento de Dados

1. **Municípios**: Primeiro carrega a lista de municípios da API
2. **Coordenadas**: Adiciona coordenadas geográficas aos municípios (arquivo `coordenadas.js`)
3. **Ações (Background)**: Busca ações de cada município em lotes de 5 para não sobrecarregar
4. **Atualização Progressiva**: Marcadores são atualizados conforme as ações são carregadas

### Contagem de Ações e ODS

Como a API `/municipios` não retorna a quantidade de ações diretamente, o sistema:
- Busca todas as ações do município via `/acoes/?municipio={id}`
- Conta o total de ações retornadas
- Extrai os ODS únicos das ações (campo `ods` em cada ação)
- Atualiza os marcadores com as informações corretas

## Estrutura de Arquivos

```
Mapa/
├── index.jsx        # Componente principal do mapa
├── actions.js       # Funções para buscar dados da API
├── mapa.css         # Estilos customizados
└── README.md        # Esta documentação
```

## Tecnologias Utilizadas

- **React**: Framework JavaScript
- **Leaflet**: Biblioteca de mapas interativos
- **React-Leaflet**: Binding do Leaflet para React
- **Material-UI**: Componentes de interface
- **OpenStreetMap**: Tiles gratuitos do mapa

## Como Usar

### 1. Acessar o Mapa

Navegue para `/mapa` no navegador ou clique no link "Mapa" no header.

### 2. Interagir com os Municípios

- Clique em qualquer marcador no mapa para ver informações
- Use o scroll do mouse ou botões de zoom para navegar
- Arraste o mapa para explorar diferentes regiões

### 3. Ver Detalhes

Ao clicar em um município, o painel lateral abrirá mostrando:
- População
- Quantidade de ações cadastradas
- ODS ativos
- Lista de ações recentes

## Personalização

### Adicionar Novos Municípios

Para adicionar coordenadas de mais municípios, edite o objeto `municipiosCoordenadas` em [index.jsx](index.jsx):

```javascript
const municipiosCoordenadas = {
  "São Paulo": [-23.5505, -46.6333],
  "Novo Município": [latitude, longitude],
  // ...
};
```

### Mudar Cores dos Marcadores

As cores são definidas na função `getMarkerColor()`:

```javascript
const getMarkerColor = (qtdAcoes) => {
  if (qtdAcoes > 50) return "#B70002"; // Vermelho escuro
  if (qtdAcoes > 20) return "#E63946"; // Vermelho médio
  if (qtdAcoes > 0) return "#4C9F38"; // Verde
  return "#999999"; // Cinza
};
```

### Customizar Tiles do Mapa

Você pode usar outros provedores de tiles gratuitos. Substitua a URL em `TileLayer`:

```javascript
<TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  // Outras opções:
  // CartoDB Positron: https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png
  // CartoDB Dark: https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png
/>
```

## API Endpoints Utilizados

- `GET /municipios/` - Lista todos os municípios
- `GET /acoes/?municipio={id}` - Ações de um município específico

### Estrutura de Dados das Ações

Cada ação retornada pela API contém:
```javascript
{
  id: 1,
  titulo: "Projeto Teste",
  municipio: { id: 1, nome: "Marília", uf: "SP" },
  ods: [
    { numero: 1, nome: "Erradicação da Pobreza" },
    { numero: 6, nome: "Água Potável e Saneamento" },
    { numero: 9, nome: "Indústria, Inovação e Infraestrutura" }
  ],
  // ... outros campos
}
```

O sistema processa essas ações para:
1. Contar o total de ações por município
2. Extrair ODS únicos (um município pode ter múltiplas ações com os mesmos ODS)
3. Exibir as informações no painel lateral

## Melhorias Futuras

- [ ] Adicionar busca de municípios
- [ ] Filtros por ODS
- [ ] Clusters de marcadores quando há muitos próximos
- [ ] Heatmap de ações por região
- [ ] Exportar dados do mapa
- [ ] Integração com dados geoespaciais (GeoJSON) para polígonos dos municípios
- [ ] Camadas adicionais (densidade populacional, IDH, etc.)

## Observações

- As coordenadas dos municípios são aproximadas e podem precisar de ajustes finos
- Para produção, considere usar um serviço de geocodificação para obter coordenadas precisas
- O Leaflet é totalmente gratuito e open-source
- Para melhor performance com muitos municípios, considere usar clustering

## Licença

Este componente faz parte do projeto Mirante da Sustentabilidade - Estado de São Paulo.
