import React, { useState, useEffect, useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { useTheme } from 'styled-components'

import { useAuth } from '../../hooks/auth'

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
  lastTransaction: string
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
  const { signOut, user } = useAuth()

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative',
  ) {
    const collectionFilttered = collection.filter(
      (transaction) => transaction.type === type,
    )

    if (collectionFilttered.length === 0) {
      return 0
    }

    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collectionFilttered.map((transaction) =>
          new Date(transaction.date).getTime(),
        ),
      ),
    )

    const day = lastTransaction.getDate()
    const month = lastTransaction.toLocaleString('pt-BR', {
      month: 'long',
    })

    return `${day} de ${month}`
  }

  async function laodTransactions() {
    const dataKey = `@gofinances:transactions_users:${user.id}`
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

        const amount = formatAmount(Number(item.amount))
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

    const lastTransactionsEntries = getLastTransactionDate(
      transactions,
      'positive',
    )
    const lastTransactionsExpensives = getLastTransactionDate(
      transactions,
      'negative',
    )
    const totalInterval =
      lastTransactionsExpensives === 0
        ? 'N??o h?? transa????es'
        : `01 a ${lastTransactionsExpensives}`

    const total = entriesTotal - expensiveTotal

    setTransactions(transactionsFormatted)
    setHighlightData({
      entries: {
        amount: formatAmount(entriesTotal),
        lastTransaction:
          lastTransactionsEntries === 0
            ? 'N??o h?? transa????es'
            : `??ltima entrada dia ${lastTransactionsEntries}`,
      },
      expensives: {
        amount: formatAmount(expensiveTotal),
        lastTransaction:
          lastTransactionsExpensives === 0
            ? 'N??o h?? transa????es'
            : `??ltima sa??da dia ${lastTransactionsExpensives}`,
      },
      total: {
        amount: formatAmount(total),
        lastTransaction: totalInterval,
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
                  uri: user.photo,
                }}
              />
              <S.User>
                <S.UserGretting>Ol??,</S.UserGretting>
                <S.UserName>{user.name}</S.UserName>
              </S.User>
            </S.UserInfo>
            <S.LogoutButton onPress={signOut}>
              <S.Icon name="power" />
            </S.LogoutButton>
          </S.UserWrapper>
        </S.Header>
        <S.HighlightCardWrapper>
          <HightlightCard
            type="up"
            title="Entradas"
            amount={highlightData.entries.amount}
            lastTransaction={highlightData.entries.lastTransaction}
          />
          <HightlightCard
            type="down"
            title="Saidas"
            amount={highlightData.expensives.amount}
            lastTransaction={highlightData.expensives.lastTransaction}
          />
          <HightlightCard
            type="total"
            title="Total"
            amount={highlightData.total.amount}
            lastTransaction={highlightData.total.lastTransaction}
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
