import './App.css';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import RenderLineChart from './components/LineChart.jsx';
import GenerationSummary from './components/GenerationSummary.jsx';
import { useEnergyData } from './hooks/useGeneratedEnergy';
import EnergyFilter from './components/EnergyFilter.jsx';
import RenderBarChart from './components/RenderBarChart.jsx';
import RenderBarChartRenewable from './components/RenderBarcharRenewable.jsx';
import RenderPieChartRenewable from './components/RenderPieChartRenewable.jsx';
import RenderPieChartOtherSources from './components/RenderPieChartOtherSources.jsx';
import NavigationHeader from './components/shared/navigationHeader.jsx';

function App() {
  const { user, isAuthenticated } = useAuth0();
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-01-30');
  const [selectedCategories, setSelectedCategories] = useState([
    'Hidraulica', 'Combustible_fosil', 'Solar', 'Biomasa', 'Eolica'
  ]);
  const { energySummary, primaryEnergyArray, otherEnergyArray } = useEnergyData({
    startDate, endDate, selectedCategories
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => setShowModal(false);

  const handleSelectCategories = (categories) => setSelectedCategories(categories);

  const validateDateRange = (start, end) => {
    const dayDiff = (new Date(end) - new Date(start)) / (1000 * 3600 * 24);
    return dayDiff <= 30;
  };

  const handleDateChange = (setter) => (e) => {
    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }
    const newDate = e.target.value;
    setter(newDate);
    setErrorMessage(validateDateRange(startDate, endDate) ? '' : 'El rango de fechas no puede ser mayor a 30 días.');
  };

  const handleFilterClick = () => {
    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }

    if (validateDateRange(startDate, endDate)) {
      console.log('Fetching data for:', startDate, endDate);
    } else {
      setErrorMessage('El rango de fechas no puede ser mayor a 30 días.');
    }
  };

  return (
    <>
    <div className='parent container d-flex justify-content-center align-items-center h-100'>
      <div className="container m-4">
        <NavigationHeader />
        <div className="card shadow-lg mb-4">
          <div className="card-body">
            <h1 className="card-title text-center mb-4">Generación Real del SIN</h1>
            <p className="card-text text-center mb-4">
              Se presenta la evolución de la generación real del Sistema Interconectado Nacional (SIN) por tipo de fuente.
            </p>

            <div className="row mb-4 d-flex justify-content-center">
              <div className="col-md-3 mb-3">
                <label htmlFor="start-date" className="form-label">Fecha Inicio:</label>
                <input type="date" className="form-control" value={startDate} onChange={handleDateChange(setStartDate)} disabled={!isAuthenticated} />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="end-date" className="form-label">Fecha Fin:</label>
                <input type="date" className="form-control" value={endDate} onChange={handleDateChange(setEndDate)} disabled={!isAuthenticated} />
              </div>
              {/* <div className="col-12 text-center mt-4">
                <button className="btn btn-primary" onClick={handleFilterClick}>Filtrar</button>
              </div> */}
            </div>

            {errorMessage && <p className="text-danger text-center mt-3">{errorMessage}</p>}

            <div className="filter-api mt-4 text-center">
              <EnergyFilter onSelectCategories={handleSelectCategories} initSelectedCategories={selectedCategories} />
            </div>

            <GenerationSummary renewable={energySummary.renewablePercentage} nonRenewable={energySummary.nonRenewablePercentage} total={energySummary.totalEnergy} />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-12 mb-4">
            <div className="card shadow-lg">
              <div className="card-body text-center">
                <h3>Generacion en GWh</h3>
              </div>
            </div>
          </div>
          <div className="col-md-12 mb-4">
            <div className="card shadow-lg">
              <div className="card-body">
                <RenderLineChart energyByCategoryArray={primaryEnergyArray} />
              </div>
            </div>
          </div>
          <div className="col-md-12 mb-4">
            <div className="card shadow-lg">
              <div className="card-body">
                <RenderLineChart energyByCategoryArray={otherEnergyArray} />
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg">
              <div className="card-body">
                <RenderBarChart energyByCategoryArray={primaryEnergyArray} />
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg">
              <div className="card-body">
                <RenderBarChartRenewable energyByCategoryArray={otherEnergyArray} />
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg">
              <div className="card-body">
                <h2 className="card-title">Energía Renovable</h2>
                <p className="card-text">
                  La energía renovable proviene de fuentes naturales que se regeneran constantemente, como la luz solar, el viento, la lluvia, las mareas, las olas y el calor geotérmico. Estas fuentes de energía son sostenibles y tienen un impacto ambiental mucho menor en comparación con los combustibles fósiles.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg">
              <div className="card-body">
                <h2 className="card-title">Energía No Renovable</h2>
                <p className="card-text">
                  La energía no renovable proviene de fuentes que se agotan con el tiempo, como el petróleo, el gas natural, el carbón y la energía nuclear. Estas fuentes de energía son limitadas y su uso tiene un impacto ambiental significativo, incluyendo la emisión de gases de efecto invernadero y otros contaminantes.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg">
              <div className="card-body">
                <RenderPieChartRenewable energyByCategoryArray={primaryEnergyArray} />
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg">
              <div className="card-body">
                <RenderPieChartOtherSources energyByCategoryArray={otherEnergyArray} />
              </div>
            </div>
          </div>
        </div>

        
        <div className="row mt-4">
      <div className="col-md-12 mb-4">
        <div className="card shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Tipos de Energías Renovables</h2>
            <p className="card-text">
              Las energías renovables provienen de fuentes naturales que se regeneran constantemente. Aquí te presentamos los principales tipos:
            </p>
            <ul className="card-text">
              <li><strong>Energía Solar:</strong> Utiliza la luz del sol para generar electricidad a través de paneles solares.</li>
              <li><strong>Energía Eólica:</strong> Aprovecha la fuerza del viento para mover aerogeneradores que producen electricidad.</li>
              <li><strong>Energía Hidroeléctrica:</strong> Genera electricidad a partir del movimiento del agua en represas o ríos.</li>
              <li><strong>Energía Geotérmica:</strong> Utiliza el calor del interior de la Tierra para generar energía.</li>
              <li><strong>Biomasa:</strong> Convierte materia orgánica en energía a través de procesos como la combustión o la fermentación.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

        <div id="informacion">
          <div className="row mt-4">
            <div className="col-md-12 mb-4">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h2 className="card-title">Impacto y Recomendaciones</h2>
                  <p className="card-text">
                    Es importante ser conscientes del impacto que nuestras decisiones energéticas tienen en el medio ambiente y en nuestra calidad de vida. Aquí hay algunas recomendaciones para un uso más sostenible de la energía:
                  </p>
                  <ul className="card-text">
                    <li>Opta por fuentes de energía renovable siempre que sea posible.</li>
                    <li>Reduce el consumo de energía en el hogar utilizando electrodomésticos eficientes y apagando los dispositivos cuando no estén en uso.</li>
                    <li>Considera la instalación de paneles solares o sistemas de energía eólica en tu hogar.</li>
                    <li>Apoya políticas y proyectos que promuevan el uso de energías limpias y sostenibles.</li>
                    <li>Infórmate y educa a otros sobre la importancia de la sostenibilidad energética.</li>
                  </ul>
                  <p className="card-text">
                    Al tomar estas medidas, podemos contribuir a un futuro más sostenible y reducir nuestro impacto ambiental.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-12 mb-4">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h2 className="card-title">Impacto en las Personas</h2>
                  <p className="card-text">
                    Las decisiones energéticas no solo afectan al medio ambiente, sino también a la salud y bienestar de las personas. Aquí hay algunas formas en que nuestras elecciones energéticas pueden impactar nuestras vidas:
                  </p>
                  <ul className="card-text">
                    <li>La contaminación del aire causada por la quema de combustibles fósiles puede provocar enfermedades respiratorias y cardiovasculares.</li>
                    <li>El cambio climático, impulsado por las emisiones de gases de efecto invernadero, puede causar eventos climáticos extremos que afectan la seguridad y el sustento de las personas.</li>
                    <li>El uso de fuentes de energía renovable puede reducir la dependencia de los combustibles fósiles y mejorar la calidad del aire.</li>
                    <li>Las inversiones en energías limpias pueden crear empleos y estimular el crecimiento económico sostenible.</li>
                    <li>La educación y la concienciación sobre la sostenibilidad energética pueden empoderar a las comunidades para tomar decisiones informadas y responsables.</li>
                  </ul>
                  <p className="card-text">
                    Al adoptar prácticas energéticas sostenibles, no solo protegemos el medio ambiente, sino que también mejoramos nuestra salud y calidad de vida.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {(showModal && !isAuthenticated) && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Authentication Required</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <p>Debe estar autenticado para filtrar los datos.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <footer className="text-center mt-5">
          <p>&copy; 2025 Generación Real del SIN.</p>
        </footer>
      </div>
      </div>
    </>
  );
}

export default App;