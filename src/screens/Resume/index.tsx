import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { VictoryPie } from 'victory-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'

import { HistoryCard } from '../../components/HistoryCard'
import { TransactionCardProps } from '../../components/TransactionCard'

import { categories } from '../../utils/categories'
import { formatAmount } from '../../utils/format'

import * as S from './styles'

type TransactionData = TransactionCardProps

type CategoryData = {
  key: string
  name: string
  total: number
  totalFormatted: string
  color: string
  percent: string
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

  const theme = useTheme()

  async function loadData() {
    const dataKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const responseFormatted = response ? JSON.parse(response) : []

    const expensives = responseFormatted.filter(
      (expensive: TransactionData) => expensive.type === 'negative',
    )

    const expensivesTotal = expensives.reduce(
      (accumullator: number, expensive: TransactionData) => {
        return accumullator + Number(expensive.amount)
      },
      0,
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
        const totalFormatted = formatAmount(categorySum)

        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(0)}%`

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent,
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
        amount={category.totalFormatted}
        color={category.color}
      />
    )
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo</S.Title>
      </S.Header>
      <S.Content>
        <S.ChartContainer>
          <VictoryPie
            data={totalByCategories}
            colorScale={totalByCategories.map((category) => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape,
              },
            }}
            labelRadius={50}
            x="percent"
            y="total"
          />
        </S.ChartContainer>
        {totalByCategories.map(renderHistoryCards)}
      </S.Content>
    </S.Container>
  )
}
