import React, { useState, useEffect, useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { useTheme } from 'styled-components'

import { HightlightCard } from '../../components/HighlightCard'
import {
  TransactionCard,
  TransactionCardProps,
} from '../../components/TransactionCard'

import { formatAmount, formatDate } from '../../utils/format'

import * as S from './styles'

export interface DataListProps extends TransactionCardProps {
  id: string
}

type HighlightProps = {
  amount: string
}

type HiglightData = {
  entries: HighlightProps
  expensives: HighlightProps
  total: HighlightProps
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<DataListProps[]>([])
  const [highlightData, setHighlightData] = useState<HiglightData>(
    {} as HiglightData,
  )

  const theme = useTheme()

  async function laodTransactions() {
    const dataKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []

    let entriesTotal = 0
    let expensiveTotal = 0

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === 'positive') {
          entriesTotal += Number(item.amount)
        } else {
          expensiveTotal += Number(item.amount)
        }

        const amount = formatAmount(item.amount)
        const date = formatDate(item.date)

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        }
      },
    )

    const total = entriesTotal - expensiveTotal

    setTransactions(transactionsFormatted)
    setHighlightData({
      entries: {
        amount: formatAmount(String(entriesTotal)),
      },
      expensives: {
        amount: formatAmount(String(expensiveTotal)),
      },
      total: {
        amount: formatAmount(String(total)),
      },
    })
    setIsLoading(false)
  }

  useEffect(() => {
    laodTransactions()
  }, [])

  useFocusEffect(
    useCallback(() => {
      laodTransactions()
    }, []),
  )

  const renderLoading = () => {
    return (
      <S.LoadingContainer>
        <ActivityIndicator color={theme.colors.primary} size="large" />
      </S.LoadingContainer>
    )
  }

  const renderContent = () => {
    return (
      <>
        <S.Header>
          <S.UserWrapper>
            <S.UserInfo>
              <S.Photo
                source={{
                  uri: 'https://avatars.githubusercontent.com/u/59663666?v=4',
                }}
              />
              <S.User>
                <S.UserGretting>Olá,</S.UserGretting>
                <S.UserName>Leandro</S.UserName>
              </S.User>
            </S.UserInfo>
            <S.Icon name="power" />
          </S.UserWrapper>
        </S.Header>
        <S.HighlightCardWrapper>
          <HightlightCard
            type="up"
            title="Entradas"
            amount={highlightData.entries.amount}
            lastTransaction="Última entrada dia 13 de abril"
          />
          <HightlightCard
            type="down"
            title="Saidas"
            amount={highlightData.expensives.amount}
            lastTransaction="Última entrada dia 03 de abril"
          />
          <HightlightCard
            type="total"
            title="Total"
            amount={highlightData.total.amount}
            lastTransaction="01 à 16 de abril"
          />
        </S.HighlightCardWrapper>
        <S.Transactions>
          <S.Title>Listagem</S.Title>
          <S.TransactionList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TransactionCard data={item} />}
          />
        </S.Transactions>
      </>
    )
  }

  return (
    <S.Container>{isLoading ? renderLoading() : renderContent()}</S.Container>
  )
}
