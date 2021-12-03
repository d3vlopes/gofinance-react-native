import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

export function formatAmount(price: string) {
  return Number(price).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export const formatDate = (value: string) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(new Date(value))
}
