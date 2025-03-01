import '../App.css'

function GenerationSummary({ renewable, nonRenewable, total }) {
  return (
    <div className='summary-cards-container'>
      <div className=''>
        <h3 className=''>Generación Renovable</h3>
        <p className=''>{renewable} %</p>
      </div>
      <div className=''>
        <h3 className=''>Generación No Renovable</h3>
        <p className=''>{nonRenewable} %</p>
      </div>
      <div className=''>
        <h3 className=''>Generación Total</h3>
        <p className=''>{total} GWh</p>
      </div>
    </div>
  )
}

export default GenerationSummary
