
type GuitarProps = {
    guitar: Guitar, 
    addToCart: (item: Guitar) => void
}

export default function Guitar({guitar, addToCart} : GuitarProps) {
    const { description, image, name, price } = guitar;
    // console.log(image);

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">$ {price}</p>
                <button
                    type="button"
                    onClick={()=> addToCart(guitar)}
                    className="btn btn-dark w-100"
                >Agregar al Carrito</button>
            </div>
        </div>
    )
}
