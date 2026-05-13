import { useState, useEffect } from "react"
import { Box, TextField, MenuItem, Button, Collapse } from "@mui/material"
import { ChevronDown, ChevronUp } from "lucide-react"
import { api } from "../services/api"

export default function FilterPanel({ onFilter, onClearFilter, showDateFilter = true }) {
  const [expanded, setExpanded] = useState(true)
  const [filters, setFilters] = useState({
    nome: "",
    municipio: "",
    ods: "",
    data: ""
  })
  const [odsOptions, setOdsOptions] = useState([])
  const [municipioOptions, setMunicipioOptions] = useState([])

  useEffect(() => {
    async function loadOds() {
      try {
        const response = await api.get("/ods/")
        const odsData = response.data.map(ods => ({
          id: ods.id,
          label: `ODS ${ods.numero} - ${ods.nome}`
        }))
        setOdsOptions([{ id: "todos", label: "Todos" }, ...odsData])
      } catch (error) {
        console.error("Erro ao carregar ODS:", error)
        setOdsOptions([{ id: "todos", label: "Todos" }])
      }
    }

    async function loadMunicipios() {
      try {
        const response = await api.get("/municipios/")
        const municipioData = response.data.map(mun => ({
          id: mun.id,
          label: `${mun.nome} - ${mun.uf}`
        }))
        setMunicipioOptions([{ id: "todos", label: "Todos" }, ...municipioData])
      } catch (error) {
        console.error("Erro ao carregar municípios:", error)
        setMunicipioOptions([{ id: "todos", label: "Todos" }])
      }
    }

    loadOds()
    loadMunicipios()
  }, [])

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleApplyFilter = () => {
    onFilter(filters)
  }

  const handleClearFilter = () => {
    const clearedFilters = {
      nome: "",
      municipio: "",
      ods: "",
      data: ""
    }
    setFilters(clearedFilters)
    onClearFilter(clearedFilters)
  }

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "30px"
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: expanded ? "20px" : 0,
          cursor: "pointer"
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: "bold",
            fontSize: "16px"
          }}
        >
          Filtros
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </Box>
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: showDateFilter ? "2fr 1fr" : "1fr"
              },
              gap: "15px"
            }}
          >

            <TextField
              label="Nome"
              variant="outlined"
              size="small"
              value={filters.nome}
              onChange={(e) => handleFilterChange("nome", e.target.value)}
              sx={{
                backgroundColor: "white",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px"
                }
              }}
            />

            {showDateFilter && (
              <TextField
                label="Data"
                type="date"
                variant="outlined"
                size="small"
                value={filters.data}
                onChange={(e) => handleFilterChange("data", e.target.value)}
                InputLabelProps={{
                  shrink: true
                }}
                sx={{
                  backgroundColor: "white",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px"
                  }
                }}
              />
            )}
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr"
              },
              gap: "15px"
            }}
          >

            <TextField
              select
              label="Município"
              variant="outlined"
              size="small"
              value={filters.municipio}
              onChange={(e) => handleFilterChange("municipio", e.target.value)}
              sx={{
                backgroundColor: "white",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px"
                }
              }}
            >
              {municipioOptions.map((mun) => (
                <MenuItem key={mun.id} value={mun.label}>
                  {mun.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="ODS"
              variant="outlined"
              size="small"
              value={filters.ods}
              onChange={(e) => handleFilterChange("ods", e.target.value)}
              sx={{
                backgroundColor: "white",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px"
                }
              }}
            >
              {odsOptions.map((ods) => (
                <MenuItem key={ods.id} value={ods.label}>
                  {ods.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "15px",
              marginTop: "10px"
            }}
          >
            <Button
              variant="outlined"
              onClick={handleClearFilter}
              sx={{
                textTransform: "uppercase",
                borderColor: "#999",
                color: "#666",
                padding: "4px 16px",
                fontWeight: 500,
                fontSize: "0.75rem",
                minHeight: "32px",
                fontFamily: "Inter, sans-serif",
                "&:hover": {
                  borderColor: "#666",
                  backgroundColor: "#f0f0f0"
                }
              }}
            >
              Limpar Filtro
            </Button>
            <Button
              variant="contained"
              onClick={handleApplyFilter}
              sx={{
                textTransform: "uppercase",
                backgroundColor: "#d32f2f",
                color: "white",
                padding: "4px 20px",
                fontWeight: 500,
                fontSize: "0.75rem",
                minHeight: "32px",
                fontFamily: "Inter, sans-serif",
                "&:hover": {
                  backgroundColor: "#b71c1c"
                }
              }}
            >
              Filtrar
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Box>
  )
}
