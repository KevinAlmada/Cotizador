import React ,{useState}from 'react'
import styled from '@emotion/styled'
import { obtenerDiferenciaYear,calcularMarca,calcularPlan } from '../helper';
import PropTypes from 'prop-types'

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;
const Label = styled.label`
    flex: 0 0 100px;
`;
const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance:none;
    outline: none;
`;
const InputRadio = styled.input`
    margin:0 1rem;
`;

const Button = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;
    &:hover{
        background-color: #26C6DA;
        cursor: pointer;
    }
`;
const Error = styled.div`
background-color: red;
color: white;
padding: 1rem;
width: 100%;
text-align: center;
margin-bottom: 2rem;
`;

const Formulario = ({setResumen,setCargando}) => {
    const [datos,setDatos ] = useState({
        marca:'',
        year:'',
        plan:''
    })
    const [error,setError] = useState(false)
    const {marca,year,plan}=datos
    /* Leer datos y mandarlos al state */
    const obtenerInformacion = e => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }
    const cotizarSeguro = e => {
        e.preventDefault();
        if (marca.trim()==="" || year.trim()==="" || plan.trim()==="") {
            setError(true)
            return;/* Este return corta la ejecucion */
        }
        setError(false)
        /* BASE 2000 */
        let resultado = 2000;
        //Obtener diferencia de años por cada año restar 3%
        const diferencia = obtenerDiferenciaYear(year)
        resultado -= ((diferencia*3)*resultado)/100;
        //Europeo 30%
        //Americano 15% 
        //Asiatico 5%
        resultado = resultado * calcularMarca(marca)
        //Basico 20%  
        //Compleot50%
        resultado = parseFloat((calcularPlan(plan) * resultado)).toFixed(2)
        setCargando(true)
        setTimeout(() => {
            setCargando(false)
            setResumen({
                cotizacion:resultado,
                datos
            })
        },3000)
        
    }
    return (
        <form
             onSubmit={(e) => cotizarSeguro(e)} 
        >
            {error?<Error>Todos los campos son obligatiorios</Error> :null}
            <Campo>
                <Label >Marca</Label>
                <Select name="marca" value={marca} onChange={obtenerInformacion}>
                    <option value="">--Seleccione--</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>
            <Campo>
                <Label >Año</Label>
                <Select name="year" value={year} onChange={obtenerInformacion}>
                <option value="">-- Seleccione --</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                </Select>
            </Campo>
            <Campo>
                <Label ></Label>
                <InputRadio type="radio" name="plan" value="basico" checked={plan === "basico"} onChange={obtenerInformacion}/> Básico
                <InputRadio type="radio" name="plan" value="completo" checked={plan === "completo"} onChange={obtenerInformacion}/> Completo
            </Campo>
            <Button type="submit">Cotizar</Button>
        </form>
    )
}

Formulario.propTypes = {
    setResumen:PropTypes.func.isRequired,
    setCargando:PropTypes.func.isRequired}

export default Formulario
