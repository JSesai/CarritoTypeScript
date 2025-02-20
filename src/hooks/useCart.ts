//ESTE ES UN HOOK PERZONALIZADO Y SU FUNCION PRINCIPAL ES SEPARAR LA LOGICA DE LA VISTA
import { db } from "../data/db"
import { useEffect, useState, useMemo } from "react"

export default function useCart() {
    const initialCart = (): CartItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    // console.log(db);
    const [data] = useState(db) //data es el estado inicial de la aplicación, setData es la función que actualiza el estado de la aplicación (setData es una función que recibe un argumento, en este caso el argumento es el estado actual de la aplicación)
    //estado de carrito, obtiene lo que exista en el localStorage y lo guarda en el estado de carrito, si no existe lo inicializa con un array vacio
    const [cart, setCart] = useState(initialCart)

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart)) //guarda el estado actual del carrito en el localStorage
    }, [cart])


    const MIN_ITEMS = 1 //Numero minimo de articulos que se pueden comprar
    const MAX_ITEMS = 5 //numero maximo de articulos que se pueden comprar
    //fn para agregar productos al carrito, recibe el producto a agregar y actualiza el estado del carrito con el nuevo estado = updatedCart

    const addToCart = (producto: Guitar) => {

        const itemExists = cart.findIndex(guitar => guitar.id === producto.id)  //regresa el indice del producto en el carrito, si no existe regresa -1
        if (itemExists >= 0) {//  existe el producto en el carrito
            if (cart[itemExists].cantidad >= MAX_ITEMS) return // si el carrito en su posicion encontrada y su propiedad de cantidad del producto es mayor o igual a MAX_ITEMS, no se puede agregar mas productos

            const updatedCart = [...cart] // copia el estado actual del carrito para no mutar el estate directamente
            updatedCart[itemExists].cantidad += 1 // incrementa la cantidad del producto en el carrito, con el valor actual + 1
            setCart(updatedCart) // actualiza el estado del carrito con el nuevo estado = updatedCart

        } else {//no existe el producto en el carrito
            //creamos una instancia para poder usar la propiedad de cantidad porque en Guitar no existe pero en CardItem si
            const newItem: CartItem = { ...producto, cantidad: 1 }
            setCart([...cart, newItem]) // agrega al estate conservando los valores del state
        }

    }

    //fn para eliminar productos del carrito, recibe el producto a eliminar y actualiza el estado del carrito con el nuevo estado = updatedCart
    const removeFromCart = (id: Guitar['id']) => {
        const updatedCart = cart.filter(guitar => guitar.id !== id) // filtra el estado actual del carrito, regresa un nuevo estado sin el producto eliminado
        setCart(updatedCart) // actualiza el estado del carrito con el nuevo estado = updatedCart   
    }

    //fn para incrementar la cantidad de articulos en el carrito 
    const increaseQuantity = (id: Guitar['id']) => {
        // console.log('incrementando...', id);
        //encontrar el producto en el carrito y aumentar su cantidad
        const updatedCart = cart.map(item => {
            if (item.id === id && item.cantidad < MAX_ITEMS) { //si el id recibido se encuentra en uno de los elementos del estado y su cantidad es menor a maxitems
                return { ...item, cantidad: item.cantidad + 1 } //aumenta la cantidad del producto en el carrito, con el valor actual + 1
            }
            return item; //regresa el item sin cambios, no aumenta la cantidad del producto en el carrito
        })
        //actualizar el estado del carrito con el nuevo estado = updatedCart
        setCart(updatedCart)
    }

    // fn para decrementar la cantidad de articulos en el carrito
    const decreaseQuantity = (id: Guitar['id']) => {
        //iteramos el carrito 
        const updatedCart = cart.map(item => {
            if (item.id === id && item.cantidad > MIN_ITEMS) { // si el id recibido se encuentra en uno de los items del carrito y su cantidad es mayor a MIN_ITEMS que es la cantidad minima
                return { //retorna un objeto con los mismos valores del item, pero con la cantidad decrementada
                    ...item, //toma una copia de los valores del item
                    cantidad: item.cantidad - 1 // sobreescribe la propiedad cantidad del item con el valor actual - 1
                }
            }
            return item //regresa el item sin cambios, no decrementa la cantidad del producto en el carrito porque no esta dentro de la condicion es decir que no altera ningun valor
        })
        setCart(updatedCart); //actualiza el estado del carrito con el nuevo estado = updatedCart
    }

    //fn para limpiar el carrito 
    const clearCart = () => {
        //regresa el estado a un arreglo vacio de esa forma el carrito se limpia
        setCart([])
    }

    //state derivado (usado en Header)
    const isEmpty = useMemo(() => cart.length === 0, [cart]) //use memo para optimizar el rendimiento, solo se ejecuta si la dependencia que tiene cambia
    //state derivado
    const total = useMemo(() => cart.reduce((acc, product) => acc + (product.price * product.cantidad), 0), [cart]) //use memo para optimizar el rendimiento, solo se ejecuta si la dependencia que tiene cambia



    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        total
    }
}