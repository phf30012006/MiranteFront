import { useState, useEffect } from "react"
import { Header } from "../../components/header"
import { Footer } from "../../components/footer"
import { Box, Button, Card, CardContent, Typography, InputBase, CircularProgress } from "@mui/material"
import { NavLink } from "react-router-dom"
import { Calendar, MapPin, Search, ArrowRight } from "lucide-react"
import { getNoticias } from "./actions"

export default function NoticiasPage() {
  const [noticias, setNoticias] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    async function loadNoticias() {
      try {
        setIsLoading(true)
        const data = await getNoticias()
        setNoticias(data)
      } catch (error) {
        console.error('Erro ao carregar notícias:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadNoticias()
  }, [])

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString + 'T12:00:00')
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const filteredNoticias = noticias.filter((noticia) => {
    const matchesSearch =
      noticia.titulo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      noticia.municipio?.nome?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      noticia.conteudo_integral?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const noticiasParaGrid = filteredNoticias.slice(1)
  const totalPages = Math.ceil(noticiasParaGrid.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedNoticias = noticiasParaGrid.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 400, behavior: 'smooth' })
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Header />

      <Box component="main" sx={{ flex: 1 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "background.paper", py: 4 }}>
          <Box sx={{ maxWidth: "1600px", mx: "auto", px: 4 }}>
            <Typography variant="h3" component="h1" sx={{ mb: 1, fontWeight: "bold", fontFamily: 'Inter, sans-serif' }}>
              Notícias Sustentáveis
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>
              Acompanhe as últimas novidades sobre sustentabilidade nos municípios paulistas
            </Typography>
          </Box>
        </Box>

        <Box sx={{ maxWidth: "1600px", mx: "auto", px: 4, py: 4 }}>
          <Card sx={{ mb: 4, p: 2 }}>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flex: 1,
                  bgcolor: "grey.100",
                  borderRadius: 1,
                  px: 2,
                  py: 1,
                }}
              >
                <Search size={20} style={{ color: "#666", marginRight: 8 }} />
                <InputBase
                  placeholder="Buscar notícias por título, município ou tema..."
                  sx={{ flex: 1 }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Box>
              <Button variant="contained" sx={{ backgroundColor: "#B70002", "&:hover": { backgroundColor: "#990002" }, fontFamily: 'Inter, sans-serif' }}>
                Buscar
              </Button>
            </Box>
          </Card>

          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress />
            </Box>
          ) : filteredNoticias.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="h6" color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>
                Nenhuma notícia encontrada
              </Typography>
            </Box>
          ) : (
            <>
              {filteredNoticias.length > 0 && (
                <Box sx={{ mb: 6 }}>
                  <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: "bold", fontFamily: 'Inter, sans-serif', color: 'var(--primary)' }}>
                    Destaque da Semana
                  </Typography>
                  <Card sx={{ overflow: "hidden", bgcolor: "action.hover" }}>
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 3 }}>
                      <Box sx={{ position: "relative", aspectRatio: { xs: "16/9", lg: "auto" }, minHeight: { lg: 300 } }}>
                        <img
                          src={filteredNoticias[0].url_imagem || "/placeholder.svg"}
                          alt={filteredNoticias[0].titulo}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </Box>
                      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", p: { xs: 2, lg: 4 } }}>
                        <Typography variant="h4" component="h3" sx={{ mb: 2, fontWeight: "bold", lineHeight: 1.3, fontFamily: 'Inter, sans-serif' }}>
                          {filteredNoticias[0].titulo}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
                          {filteredNoticias[0].conteudo_integral?.substring(0, 300)}...
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3, fontSize: "0.875rem", color: "text.secondary" }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <MapPin size={16} />
                            <span>{filteredNoticias[0].municipio?.nome} - {filteredNoticias[0].municipio?.uf}</span>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Calendar size={16} />
                            <span>{formatDate(filteredNoticias[0].data_publicacao)}</span>
                          </Box>
                        </Box>
                        <Button
                          component="a"
                          href={filteredNoticias[0].url_completa}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="contained"
                          sx={{ alignSelf: "flex-start", backgroundColor: "#B70002", "&:hover": { backgroundColor: "#990002" }, fontFamily: 'Inter, sans-serif' }}
                          endIcon={<ArrowRight size={16} />}
                        >
                          Ler Matéria Completa
                        </Button>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              )}

              {filteredNoticias.length > 1 && (
                <Box>
                  <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: "bold", fontFamily: 'Inter, sans-serif' }}>
                    Todas as Notícias
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "1fr 1fr", lg: "repeat(3, 1fr)" },
                      gap: 3,
                    }}
                  >
                    {paginatedNoticias.map((noticia) => (
                      <Card
                        key={noticia.id}
                        sx={{
                          overflow: "hidden",
                          transition: "box-shadow 0.3s",
                          bgcolor: "action.hover",
                          display: "flex",
                          flexDirection: "column",
                          "&:hover": {
                            boxShadow: 6,
                          },
                        }}
                      >
                        <Box sx={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                          <img
                            src={noticia.url_imagem || "/placeholder.svg"}
                            alt={noticia.titulo}
                            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }}
                          />
                        </Box>
                        <CardContent sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                          <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: "bold", lineHeight: 1.3, fontFamily: 'Inter, sans-serif' }}>
                            {noticia.titulo}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6, fontFamily: 'Inter, sans-serif', flex: 1 }}>
                            {noticia.conteudo_integral?.substring(0, 200)}...
                          </Typography>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2, fontSize: "0.75rem", color: "text.secondary" }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <MapPin size={14} />
                              <span>{noticia.municipio?.nome} - {noticia.municipio?.uf}</span>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <Calendar size={14} />
                              <span>{formatDate(noticia.data_publicacao)}</span>
                            </Box>
                          </Box>
                          <Button
                            component="a"
                            href={noticia.url_completa}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="contained"
                            fullWidth
                            sx={{ backgroundColor: "#B70002", "&:hover": { backgroundColor: "#990002" }, fontFamily: 'Inter, sans-serif', mt: "auto" }}
                            endIcon={<ArrowRight size={16} />}
                          >
                            Ler Mais
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>

                  {/* Paginação */}
                  {totalPages > 1 && (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1, mt: 4 }}>
                      <Button
                        variant="outlined"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        sx={{ borderColor: "#B70002", color: "#B70002", "&:hover": { borderColor: "#990002", backgroundColor: "rgba(183, 0, 2, 0.04)" }, "&:disabled": { borderColor: "grey.300", color: "grey.400" }, fontFamily: 'Inter, sans-serif' }}
                      >
                        Anterior
                      </Button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "contained" : "outlined"}
                          onClick={() => handlePageChange(page)}
                          sx={{
                            minWidth: 40,
                            backgroundColor: currentPage === page ? "#B70002" : "transparent",
                            borderColor: "#B70002",
                            color: currentPage === page ? "white" : "#B70002",
                            "&:hover": { backgroundColor: currentPage === page ? "#990002" : "rgba(183, 0, 2, 0.04)", borderColor: "#990002" },
                            fontFamily: 'Inter, sans-serif'
                          }}
                        >
                          {page}
                        </Button>
                      ))}
                      <Button
                        variant="outlined"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        sx={{ borderColor: "#B70002", color: "#B70002", "&:hover": { borderColor: "#990002", backgroundColor: "rgba(183, 0, 2, 0.04)" }, "&:disabled": { borderColor: "grey.300", color: "grey.400" }, fontFamily: 'Inter, sans-serif' }}
                      >
                        Próximo
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>

      <Footer />
    </Box>
  )
}
