function Visor({detalle, imgUrl, nombre}) {
    return (
        <>
            <div className="card" style={{ width: 400, marginLeft: 'auto', marginRight: 'auto', marginBottom: '30px' }}>
                <img src={imgUrl} alt="" className="card-img-top" />

                <div className="card-body">
                <h5>{nombre}</h5>
                <p className="card-text">
                    {detalle}
                </p>
                </div>
            </div>
        </>
    );
}

export default Visor;