import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";


const MyTabs = styled(Tabs)(() => ({
  backgroundColor: "#F2F2F2",
  borderRadius: 12,
  padding: 6,
  minHeight: "auto",

  "& .MuiTabs-indicator": {
    display: "none", 
  },
}));

const MyTab = styled(Tab)(() => ({
  textTransform: "none",
  fontFamily: "Inter, sans-serif",
  fontSize: "0.95rem",
  fontWeight: 400,
  color: "#333",
  minHeight: "auto",
  padding: "8px 24px",
  borderRadius: 10,
  transition: "all 0.2s ease",

  "&.Mui-selected": {
    backgroundColor: "#FFFFFF",
    color: "#B70002",
    fontWeight: 500,
    boxShadow: "0px 1px 4px rgba(0,0,0,0.08)",
  },

  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.6)",
  },
}));

export default function CustomTabs({ value, onChange }) {
  return (
    <MyTabs value={value} onChange={onChange}>
      <MyTab label="Informações Gerais" value="geral" />
      <MyTab label="Organização" value="organizacao" />
      <MyTab label="Resultados e Impacto" value="resultados" />
      <MyTab label="Parcerias" value="parcerias" />
      <MyTab label="Informações Complementares" value="complementos" />
    </MyTabs>
  );
}
