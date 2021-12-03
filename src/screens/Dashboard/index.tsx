import React, { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

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

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([])

  async function laodTransactions() {
    const dataKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
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

    setData(transactionsFormatted)
  }

  useEffect(() => {
    laodTransactions()
  }, [])

  useFocusEffect(
    useCallback(() => {
      laodTransactions()
    }, []),
  )

  return (
    <S.Container>
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
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HightlightCard
          type="down"
          title="Saidas"
          amount="R$ 1.259,00"
          lastTransaction="Última entrada dia 03 de abril"
        />
        <HightlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        />
      </S.HighlightCardWrapper>
      <S.Transactions>
        <S.Title>Listagem</S.Title>
        <S.TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </S.Transactions>
    </S.Container>
  )
}
