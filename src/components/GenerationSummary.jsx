import '../App.css';

function GenerationSummary({ renewable, nonRenewable, total }) {
  return (
    <div className='summary-cards-container d-flex justify-content-around'>
      <div className='card p-3 mb-5 bg-white rounded'>
        <div className='card-body text-center'>
          <h3 className='card-title'>Generación Renovable</h3>
          <p className='card-text'>{renewable} %</p>
        </div>
      </div>
      <div className='card p-3 mb-5 bg-white rounded'>
        <div className='card-body text-center'>
          <h3 className='card-title'>Generación No Renovable</h3>
          <p className='card-text'>{nonRenewable} %</p>
        </div>
      </div>
      <div className='card p-3 mb-5 bg-white rounded'>
        <div className='card-body text-center'>
          <h3 className='card-title'>Generación Total</h3>
          <p className='card-text'>{total} GWh</p>
        </div>
      </div>
    </div>
  );
}

export default GenerationSummary;