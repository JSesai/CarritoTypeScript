//definicion de type nota: se puede usar types o interfaces pára definir los datos
type Guitar = {
    id: number
    image: string
    name: string
    description: string
    price: number
}

// usamos herencia : type CartItem hereda de Guitar los atributos y añade cantidad
type CartItem = Guitar & {  
    cantidad: number
}

// usamos pick e indicamos que de los atributos solo requiero el id
// type GuitarId = Pick<Guitar, 'id'> //pero mejor usamos look up
//!!usamos look up y se puede usar directo en el codigo donde requerimos indicar el id no es necesario crear el type qui
// type GuitarId = Guitar['id'] //Indica que de el type Guitar solo requerimos el id 

//!!existe pick y puedes indicar los atributops que requieres pero tambien puedes agregar atributos nuevos &
// type CartItem = Pick<Guitar, 'id' | 'name' | 'price'> & {  
//     cantidad: number
// }

//!!existe omit y puedes indicar los atributos que no quieres pero tambien puedes agregar atributos nuevos &
// type CartItem = Omit<Guitar, 'id' | 'name' | 'price'> & {  
//     cantidad: number
// }