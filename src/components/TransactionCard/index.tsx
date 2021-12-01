import React from 'react'

import * as S from './styles'

type TransactionCardCategory = {
  name: string
  icon: string
}

export type TransactionCardProps = {
  type: 'positive' | 'negative'
  title: string
  amount: string
  category: TransactionCardCategory
  date: string
}

export type props = {
  data: TransactionCardProps
}

export function TransactionCard({ data }: props) {
  return (
    <S.Container>
      <S.Title>{data.title}</S.Title>
      <S.Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {data.amount}
      </S.Amount>
      <S.Footer>
        <S.Category>
          <S.Icon name={data.category.icon} />
          <S.CategoryName>{data.category.name}</S.CategoryName>
        </S.Category>
        <S.Date>{data.date}</S.Date>
      </S.Footer>
    </S.Container>
  )
}
