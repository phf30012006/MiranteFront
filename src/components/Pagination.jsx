import { Box, Button } from "@mui/material"

function getPageRange(current, total) {
  const delta = 1
  const range = []
  const left = Math.max(2, current - delta)
  const right = Math.min(total - 1, current + delta)

  range.push(1)
  if (left > 2) range.push("...")
  for (let i = left; i <= right; i++) range.push(i)
  if (right < total - 1) range.push("...")
  if (total > 1) range.push(total)

  return range
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: 1, mt: 4 }}>
      <Button
        variant="outlined"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        sx={{ minWidth: "auto", px: 1.5, borderColor: "#B70002", color: "#B70002", "&:hover": { borderColor: "#990002", backgroundColor: "rgba(183, 0, 2, 0.04)" }, "&:disabled": { borderColor: "grey.300", color: "grey.400" }, fontFamily: 'Inter, sans-serif' }}
      >
        Anterior
      </Button>
      {getPageRange(currentPage, totalPages).map((page, idx) =>
        page === "..." ? (
          <Box
            key={`ellipsis-${idx}`}
            sx={{ minWidth: 32, textAlign: "center", color: "grey.500", fontFamily: 'Inter, sans-serif', userSelect: "none" }}
          >
            …
          </Box>
        ) : (
          <Button
            key={page}
            variant={currentPage === page ? "contained" : "outlined"}
            onClick={() => onPageChange(page)}
            sx={{
              minWidth: 40,
              px: 1,
              backgroundColor: currentPage === page ? "#B70002" : "transparent",
              borderColor: "#B70002",
              color: currentPage === page ? "white" : "#B70002",
              "&:hover": { backgroundColor: currentPage === page ? "#990002" : "rgba(183, 0, 2, 0.04)", borderColor: "#990002" },
              fontFamily: 'Inter, sans-serif'
            }}
          >
            {page}
          </Button>
        )
      )}
      <Button
        variant="outlined"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        sx={{ minWidth: "auto", px: 1.5, borderColor: "#B70002", color: "#B70002", "&:hover": { borderColor: "#990002", backgroundColor: "rgba(183, 0, 2, 0.04)" }, "&:disabled": { borderColor: "grey.300", color: "grey.400" }, fontFamily: 'Inter, sans-serif' }}
      >
        Próximo
      </Button>
    </Box>
  )
}
