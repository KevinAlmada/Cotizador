import React,{useState} from 'react';
import Header from "./components/Header";
import styled from "@emotion/styled";
import Formulario from "./components/Formulario";
import Resumen from "./components/Resumen";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";

const Container = styled.div`
max-width:600px;
margin: 0 auto;
`;
const ContenedorFormulario = styled.div`
  background-color: #FFF;
  padding: 3rem;
`;
function App() {
  const [resumen,setResumen] = useState({
    cotizacion:0,
    datos:{
      marca:"",
      year:"",
      plan:""
    }
  })
  const {cotizacion , datos} = resumen;
  const [cargando,setCargando] = useState(false);
 
  return (
    <Container>
    <Header titulo="Cotizador de seguros"></Header>
    <ContenedorFormulario>
     <Formulario setResumen={setResumen} setCargando={setCargando}/>
     {cargando ? <Spinner/> 
     : <>
     <Resumen 
     datos={datos}/>
     <Resultado cotizacion={cotizacion}/>
      </>
     }
     
    </ContenedorFormulario>
    </Container>
  );
}

export default App;
