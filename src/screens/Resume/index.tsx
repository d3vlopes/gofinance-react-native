import React, { useCallback, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator } from 'react-native'
import { useFocusEffect } from '@react-navigation/core'
import { VictoryPie } from 'victory-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { addMonths, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
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
  const [isLoading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

  const theme = useTheme()

  function handleDateChange(action: 'next' | 'prev') {
    if (action === 'next') {
      const newDate = addMonths(selectedDate, 1)
      setSelectedDate(newDate)
    } else {
      const newDate = subMonths(selectedDate, 1)
      setSelectedDate(newDate)
    }
  }

  async function loadData() {
    setLoading(true)

    const dataKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const responseFormatted = response ? JSON.parse(response) : []

    const expensives = responseFormatted.filter(
      (expensive: TransactionData) =>
        expensive.type === 'negative' &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear(),
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
    setLoading(false)
  }

  useFocusEffect(
    useCallback(() => {
      loadData()
    }, [selectedDate]),
  )

  const renderLoading = () => {
    return (
      <S.LoadingContainer>
        <ActivityIndicator color={theme.colors.primary} size="large" />
      </S.LoadingContainer>
    )
  }

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

  const renderContent = () => {
    return (
      <S.Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        <S.MouthSelect>
          <S.MouthSelectButton>
            <S.MouthSelectIcon
              name="chevron-left"
              onPress={() => handleDateChange('prev')}
            />
          </S.MouthSelectButton>
          <S.Mouth>
            {format(selectedDate, 'MMMM, yyyy', {
              locale: ptBR,
            })}
          </S.Mouth>
          <S.MouthSelectButton>
            <S.MouthSelectIcon
              name="chevron-right"
              onPress={() => handleDateChange('next')}
            />
          </S.MouthSelectButton>
        </S.MouthSelect>
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
    )
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo</S.Title>
      </S.Header>
      {isLoading ? renderLoading() : renderContent()}
    </S.Container>
  )
}
