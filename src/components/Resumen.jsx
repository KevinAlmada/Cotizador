import React from 'react'
import styled from '@emotion/styled';
import { primerMayus } from '../helper'; 
import PropTypes from 'prop-types'
const ResumenContainer = styled.div`
padding: 1rem;
text-align: center;
background-color: #00838F;
color: #FFF;
margin-top: 1rem;
`

const Resumen = ({datos}) => {
    const {marca,year,plan} = datos
    if (marca === '' || year === '' || plan === '') {
        return null;
    }
    return (
        
        <ResumenContainer>
          <h2>Resumen de Cotazacion</h2>
          <ul>
              <li>Marca :{primerMayus(marca)}</li>
              <li>Plan :{plan}</li>
              <li>Año del Auto :{primerMayus(year)}</li>
          </ul>
        </ResumenContainer>
        
    )
}
Resumen.propTypes = {
    datos : PropTypes.object.isRequired
}
export default Resumen
