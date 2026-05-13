import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from "react-leaflet";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Badge,
  Button,
  IconButton,
  Drawer,
  CircularProgress,
} from "@mui/material";
import { X, MapPin, Target, FileText, Lightbulb } from "lucide-react";
import { getMunicipios, getMunicipioDetalhes, getAcoesPorMunicipio } from "./actions";
import "leaflet/dist/leaflet.css";
import "./mapa.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const createCustomIcon = (color = "#B70002", size = "large") => {
  const sizeMap = {
    small: 25,
    medium: 35,
    large: 45,
  };
  const iconSize = sizeMap[size] || 35;

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        width: ${iconSize}px;
        height: ${iconSize}px;
        background-color: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(136, 198, 139, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      ">
        <div style="
          width: ${iconSize * 0.4}px;
          height: ${iconSize * 0.4}px;
          background-color: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    iconSize: [iconSize, iconSize],
    iconAnchor: [iconSize / 2, iconSize / 2],
  });
};


const odsColors = {
  1: "#E5243B",
  2: "#DDA63A",
  3: "#4C9F38",
  4: "#C5192D",
  5: "#FF3A21",
  6: "#26BDE2",
  7: "#FCC30B",
  8: "#A21942",
  9: "#FD6925",
  10: "#DD1367",
  11: "#FD9D24",
  12: "#BF8B2E",
  13: "#3F7E44",
  14: "#0A97D9",
  15: "#56C02B",
  16: "#00689D",
  17: "#19486A",
};

function MapController({ selectedMunicipio }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedMunicipio && selectedMunicipio.coordenadas) {
      map.flyTo(selectedMunicipio.coordenadas, 12, {
        duration: 1,
      });
    }
  }, [selectedMunicipio, map]);
  
  return null;
}

export default function MapaPage() {
  const [municipios, setMunicipios] = useState([]);
  const [selectedMunicipio, setSelectedMunicipio] = useState(null);
  const [municipioDetalhes, setMunicipioDetalhes] = useState(null);
  const [acoes, setAcoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loadingDetalhes, setLoadingDetalhes] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState({ loaded: 0, total: 0 });
  const [isLoadingBackground, setIsLoadingBackground] = useState(false);

  useEffect(() => {
    loadMunicipios();
  }, []);

  const loadMunicipios = async () => {
    try {
      setIsLoading(true);
      const data = await getMunicipios();
      
      const municipiosComCoordenadas = data
        .map((municipio) => ({
          ...municipio,
          coordenadas: municipio.latitude && municipio.longitude 
            ? [municipio.latitude, municipio.longitude] 
            : null,
          qtd_acoes: 0, 
          qtd_ods: 0,
        }))
        .filter(m => m.coordenadas); 
      
      setMunicipios(municipiosComCoordenadas);
      setIsLoading(false);
      
      loadAcoesBackground(municipiosComCoordenadas);
    } catch (error) {
      console.error("Erro ao carregar municípios:", error);
      setIsLoading(false);
    }
  };

  const loadAcoesBackground = async (municipiosList) => {
    setIsLoadingBackground(true);
    setLoadingProgress({ loaded: 0, total: municipiosList.length });
    
    const batchSize = 5;
    let processedCount = 0;
    
    for (let i = 0; i < municipiosList.length; i += batchSize) {
      const batch = municipiosList.slice(i, i + batchSize);
      
      const municipiosAtualizados = await Promise.all(
        batch.map(async (municipio) => {
          try {
            const acoesMunicipio = await getAcoesPorMunicipio(municipio.id);
            
            const odsUnicos = new Set();
            acoesMunicipio.forEach(acao => {
              if (acao.ods && Array.isArray(acao.ods)) {
                acao.ods.forEach(ods => odsUnicos.add(ods.numero));
              }
            });
            
            return {
              ...municipio,
              qtd_acoes: acoesMunicipio.length,
              qtd_ods: odsUnicos.size,
            };
          } catch (error) {
            console.error(`Erro ao buscar ações de ${municipio.nome}:`, error);
            return municipio;
          }
        })
      );
      
      processedCount += batch.length;
      setLoadingProgress({ loaded: processedCount, total: municipiosList.length });

      setMunicipios(prev => {
        const updated = [...prev];
        municipiosAtualizados.forEach(municipioAtualizado => {
          const index = updated.findIndex(m => m.id === municipioAtualizado.id);
          if (index !== -1) {
            updated[index] = municipioAtualizado;
          }
        });
        return updated;
      });
    }
    
    setIsLoadingBackground(false);
  };

  const handleMunicipioClick = async (municipio) => {
    setSelectedMunicipio(municipio);
    setDrawerOpen(true);
    setLoadingDetalhes(true);

    try {
      const acoesData = await getAcoesPorMunicipio(municipio.id);
      
      const odsUnicos = [];
      const odsSet = new Set();
      acoesData.forEach(acao => {
        if (acao.ods && Array.isArray(acao.ods)) {
          acao.ods.forEach(ods => {
            if (!odsSet.has(ods.numero)) {
              odsSet.add(ods.numero);
              odsUnicos.push(ods);
            }
          });
        }
      });

      const temasContagem = {};
      acoesData.forEach(acao => {
        if (acao.temas && Array.isArray(acao.temas)) {
          acao.temas.forEach(tema => {
            const temaNome = typeof tema === 'object' ? tema.nome : tema;
            const temaId = typeof tema === 'object' ? tema.id : temaNome;
            
            if (!temasContagem[temaId]) {
              temasContagem[temaId] = {
                nome: temaNome,
                id: temaId,
                quantidade: 0
              };
            }
            temasContagem[temaId].quantidade++;
          });
        }
      });
      
      const temasOrdenados = Object.values(temasContagem)
        .sort((a, b) => b.quantidade - a.quantidade)
        .slice(0, 3);
      
      setMunicipioDetalhes({
        ...municipio,
        qtd_acoes: acoesData.length,
        qtd_ods: odsUnicos.length,
        ods: odsUnicos,
        temasPrincipais: temasOrdenados,
      });
      setAcoes(acoesData);
    } catch (error) {
      console.error("Erro ao carregar detalhes:", error);
    } finally {
      setLoadingDetalhes(false);
    }
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => {
      setSelectedMunicipio(null);
      setMunicipioDetalhes(null);
      setAcoes([]);
    }, 300);
  };

  const getMarkerSize = (qtdAcoes) => {
    if (qtdAcoes > 50) return "large";
    if (qtdAcoes > 20) return "medium";
    return "small";
  };

  const getMarkerColor = (qtdAcoes) => {
    if (qtdAcoes > 50) return "#B70002"; 
    if (qtdAcoes > 20) return "#E63946"; 
    if (qtdAcoes > 0) return "#4C9F38"; 
    return "#999999"; 
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Header />

      <Box component="main" sx={{ flex: 1, position: "relative" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "background.paper", py: 2 }}>
          <Box sx={{ maxWidth: "1600px", mx: "auto", px: 4 }}>
            <Typography variant="h3" component="h1" sx={{ mb: 1, fontWeight: "bold", fontFamily: "Inter, sans-serif" }}>
              Mapa Interativo de São Paulo
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontFamily: "Inter, sans-serif" }}>
              Explore as ações sustentáveis nos municípios paulistas. Clique nos marcadores para ver mais detalhes.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ position: "relative", height: "calc(100vh - 250px)", minHeight: "500px" }}>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <MapContainer
              center={[-23.5505, -46.6333]}
              zoom={7}
              style={{ height: "100%", width: "100%", zIndex: 0 }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              <MapController selectedMunicipio={selectedMunicipio} />

              {municipios.map((municipio) => (
                <Marker
                  key={municipio.id}
                  position={municipio.coordenadas}
                  icon={createCustomIcon(
                    getMarkerColor(municipio.qtd_acoes || 0),
                    getMarkerSize(municipio.qtd_acoes || 0)
                  )}
                  eventHandlers={{
                    click: () => handleMunicipioClick(municipio),
                  }}
                >
                  <Tooltip direction="top" offset={[0, -20]} opacity={0.9}>
                    <Typography variant="body1" sx={{ fontWeight: "bold", fontFamily: "Inter, sans-serif", fontSize: "1rem" }}>
                      {municipio.nome}
                    </Typography>
                  </Tooltip>
                  <Popup>
                    <Box sx={{ p: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, fontFamily: "Inter, sans-serif" }}>
                        {municipio.nome}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5, fontFamily: "Inter, sans-serif" }}>
                        <strong>ODS Ativos:</strong> {municipio.qtd_ods || 0}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1, fontFamily: "Inter, sans-serif" }}>
                        <strong>Ações Cadastradas:</strong> {municipio.qtd_acoes || 0}
                      </Typography>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          backgroundColor: "#B70002",
                          "&:hover": { backgroundColor: "#990002" },
                        }}
                        onClick={() => handleMunicipioClick(municipio)}
                      >
                        Ver Detalhes
                      </Button>
                    </Box>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}

          {isLoadingBackground && (
            <Card
              sx={{
                position: "absolute",
                bottom: 230,
                left: 20,
                zIndex: 1000,
                minWidth: 200,
                boxShadow: 3,
                bgcolor: "#fff9e6",
              }}
            >
              <CardContent sx={{ py: 2 }}>
                <Typography variant="caption" sx={{ fontWeight: "bold", display: "block", mb: 1, fontFamily: "Inter, sans-serif" }}>
                  Carregando dados...
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={16} />
                  <Typography variant="caption" sx={{ fontFamily: "Inter, sans-serif" }}>
                    {loadingProgress.loaded} de {loadingProgress.total} municípios
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}

          <Card
            sx={{
              position: "absolute",
              bottom: 20,
              left: 20,
              zIndex: 1000,
              minWidth: 200,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 2, fontFamily: "Inter, sans-serif" }}>
                Legenda
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor: "#B70002",
                      border: "2px solid white",
                    }}
                  />
                  <Typography variant="body2" sx={{ fontFamily: "Inter, sans-serif" }}>Mais de 50 ações</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor: "#E63946",
                      border: "2px solid white",
                    }}
                  />
                  <Typography variant="body2" sx={{ fontFamily: "Inter, sans-serif" }}>21-50 ações</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor: "#4C9F38",
                      border: "2px solid white",
                    }}
                  />
                  <Typography variant="body2" sx={{ fontFamily: "Inter, sans-serif" }}>1-20 ações</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor: "#999999",
                      border: "2px solid white",
                    }}
                  />
                  <Typography variant="body2" sx={{ fontFamily: "Inter, sans-serif" }}>Nenhuma ação</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleCloseDrawer}
          sx={{
            "& .MuiDrawer-paper": {
              width: { xs: "100%", sm: 500, md: 550 },
              maxWidth: "100%",
            },
          }}
        >
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <MapPin size={24} />
                <Typography variant="h5" sx={{ fontWeight: "bold", fontFamily: "Inter, sans-serif" }}>
                  {selectedMunicipio?.nome}
                </Typography>
              </Box>
              <IconButton onClick={handleCloseDrawer}>
                <X size={24} />
              </IconButton>
            </Box>

            <hr></hr>

            {loadingDetalhes ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Box sx={{ display: "flex", gap: 2, mb: 3, mt: 5 }}>
                  <Card elevation={0} sx={{ flex: 1, bgcolor: "#ffffff", border: "0.5px solid #e4e4e4", borderRadius: "12px" }}>
                    <CardContent>
                      <Typography variant="h3" sx={{ fontWeight: "bold", fontFamily: "Inter, sans-serif" }}>
                        {municipioDetalhes?.qtd_acoes || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Inter, sans-serif" }}>
                        Ações Cadastradas
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card elevation={0} sx={{ flex: 1, bgcolor: "#ffffff", border: "0.5px solid #e4e4e4", borderRadius: "12px" }}>
                    <CardContent>
                      <Typography variant="h3" sx={{ fontWeight: "bold", fontFamily: "Inter, sans-serif" }}>
                        {municipioDetalhes?.qtd_ods || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Inter, sans-serif" }}>
                        ODS Ativos
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>

                {municipioDetalhes?.temasPrincipais && municipioDetalhes.temasPrincipais.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", display: "flex", alignItems: "center", fontFamily: "Inter, sans-serif" }}>
                      <Lightbulb size={20} style={{ marginRight: 8 }} />
                      Temas Principais
                    </Typography>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {municipioDetalhes.temasPrincipais.map((tema, index) => (
                        <Badge
                          key={index}
                          className="px-3 py-1"
                          sx={{ 
                            fontFamily: 'Inter, sans-serif', 
                            backgroundColor: "white", 
                            color: "#333",
                            border: "1px solid #e0e0e0",
                            borderRadius: "8px",
                            gap: 1, 
                            fontSize: "0.8rem", 
                            display: "inline-block", 
                            mb: 1 
                          }}
                        >
                          {tema.nome}
                        </Badge>
                      ))}
                    </div>
                  </Box>
                )}

                {municipioDetalhes?.ods && municipioDetalhes.ods.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", display: "flex", alignItems: "center", fontFamily: "Inter, sans-serif" }}>
                      <Target size={20} style={{ marginRight: 8 }} />
                      Objetivos de Desenvolvimento Sustentável
                    </Typography>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {municipioDetalhes.ods.map((ods, index) => (
                        <Badge
                        key={index}
                        className="px-3 py-1 rounded-full text-white"
                        sx={{ fontFamily: 'Inter, sans-serif', backgroundColor: odsColors[ods.numero] || "#666", gap: 1, fontSize: "0.8rem", display: "inline-block", mb: 1 }}
                        >
                        ODS {ods.numero}
                        </Badge>
                    ))}
                    </div>
                  </Box>
                )}

                <Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", display: "flex", alignItems: "center", fontFamily: "Inter, sans-serif" }}>
                    <FileText size={20} style={{ marginRight: 8 }} />
                    Ações Recentes
                  </Typography>
                  
                  {acoes && acoes.length > 0 ? (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      {acoes.slice(0, 3).map((acao) => (
                        <Card key={acao.id} sx={{ bgcolor: "#f5f5f5" }}>
                          <CardContent sx={{ py: 1.5, px: 2, '&:last-child': { pb: 1.5 } }}>
                            <Typography variant="body2" sx={{ fontWeight: "bold", mb: 0.5, fontFamily: "Inter, sans-serif" }}>
                              {acao.titulo}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "Inter, sans-serif" }}>
                              {acao.data_inicio
                                ? new Date(acao.data_inicio).toLocaleDateString("pt-BR")
                                : ""}
                            </Typography>
                          </CardContent>
                        </Card>
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ py: 2, fontFamily: "Inter, sans-serif" }}>
                      Nenhuma ação cadastrada ainda.
                    </Typography>
                  )}
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    backgroundColor: "#B70002",
                    "&:hover": { backgroundColor: "#990002" },
                    fontFamily: "Inter, sans-serif",
                  }}
                  href={`/acoes`}
                >
                  Ver todas as ações
                </Button>
              </>
            )}
          </Box>
        </Drawer>
      </Box>

      <Footer />
    </Box>
  );
}
