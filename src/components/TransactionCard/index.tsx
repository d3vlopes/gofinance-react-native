import React from 'react'
import { categories } from '../../utils/categories'

import * as S from './styles'

export type TransactionCardProps = {
  type: 'positive' | 'negative'
  name: string
  amount: string
  category: string
  date: string
}

export type props = {
  data: TransactionCardProps
}

export function TransactionCard({ data }: props) {
  const [category] = categories.filter(
    (category) => category.key === data.category,
  )

  return (
    <S.Container>
      <S.Title>{data.name}</S.Title>
      <S.Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {data.amount}
      </S.Amount>
      <S.Footer>
        <S.Category>
          <S.Icon name={category.icon} />
          <S.CategoryName>{category.name}</S.CategoryName>
        </S.Category>
        <S.Date>{data.date}</S.Date>
      </S.Footer>
    </S.Container>
  )
}
