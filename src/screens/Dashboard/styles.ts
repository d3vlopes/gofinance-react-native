import styled, { css } from 'styled-components/native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'

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
    align-items: center;
    flex-direction: row;
  `}
`

export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 24px;
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
