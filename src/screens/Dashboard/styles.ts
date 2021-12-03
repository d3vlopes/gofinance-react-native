import styled, { css } from 'styled-components/native'
import { FlatList, FlatListProps } from 'react-native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper'
import { Feather } from '@expo/vector-icons'

import { DataListProps } from '.'

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.background};
  `}
`

export const Header = styled.View`
  ${({ theme }) => css`
    width: 100%;
    height: ${RFPercentage(42)}px;
    background-color: ${theme.colors.primary};
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
  `}
`

export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 24px;
  margin-top: ${getStatusBarHeight() + RFValue(28)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const UserInfo = styled.View`
  ${({ theme }) => css`
    flex-direction: row;
    align-items: center;
  `}
`

export const Photo = styled.Image`
  ${({ theme }) => css`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: 10px;
  `}
`

export const User = styled.View`
  ${({ theme }) => css`
    margin-left: 17px;
  `}
`

export const UserGretting = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${theme.fonts.regular};
  `}
`

export const UserName = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${theme.fonts.bold};
  `}
`

export const Icon = styled(Feather)`
  ${({ theme }) => css`
    color: ${theme.colors.secondary};
    font-size: ${RFValue(24)}px;
  `}
`

export const HighlightCardWrapper = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 },
})`
  ${({ theme }) => css`
    width: 100%;
    position: absolute;
    margin-top: ${RFPercentage(20)}px;
  `}
`

export const Transactions = styled.View`
  ${({ theme }) => css`
    flex: 1;
    padding: 0 24px;
    margin-top: ${RFPercentage(15)}px;
  `}
`

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(18)}px;
    font-family: ${theme.fonts.regular};
    margin-bottom: 16px;
  `}
`

export const TransactionList = styled(
  FlatList as new (
    props: FlatListProps<DataListProps>,
  ) => FlatList<DataListProps>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})``

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
