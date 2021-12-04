import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { HistoryCard } from '../../components/HistoryCard'
import { TransactionCardProps } from '../../components/TransactionCard'

import { categories } from '../../utils/categories'
import { formatAmount } from '../../utils/format'

import * as S from './styles'

type TransactionData = TransactionCardProps

type CategoryData = {
  key: string
  name: string
  total: string
  color: string
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

  async function loadData() {
    const dataKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const responseFormatted = response ? JSON.parse(response) : []

    const expensives = responseFormatted.filter(
      (expensive: TransactionData) => expensive.type === 'negative',
    )
    const totalByCategory: CategoryData[] = []

    categories.forEach((category) => {
      let categorySum = 0

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount)
        }
      })

      if (categorySum > 0) {
        const total = formatAmount(categorySum)

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total,
        })
      }
    })

    setTotalByCategories(totalByCategory)
  }

  useEffect(() => {
    loadData()
  }, [])

  function renderHistoryCards(category: CategoryData) {
    return (
      <HistoryCard
        key={`history-card-${category.key}`}
        title={category.name}
        amount={category.total}
        color={category.color}
      />
    )
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo</S.Title>
      </S.Header>
      <S.Content>{totalByCategories.map(renderHistoryCards)}</S.Content>
    </S.Container>
  )
}
