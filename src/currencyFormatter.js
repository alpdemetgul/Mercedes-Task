export default function currencyFormatter(currency,amount){
    return new Intl.NumberFormat('de-DE',{style:'currency',currency:`${currency}`}).format(amount)
}