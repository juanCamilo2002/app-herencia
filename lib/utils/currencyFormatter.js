export const currencyFormatter = ({currency, value})=>{
    const formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        minimumFractionDigits: 2,
        currency
    })

    return formatter.format(value);
}

export const formatterNumberCol = (value) =>{
    const peso = currencyFormatter({
        currency: "COP",
        value
    })

    return peso;
}