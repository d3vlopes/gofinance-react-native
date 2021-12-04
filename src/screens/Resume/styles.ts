import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.background};
  `}
`

export const Header = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    width: 100%;
    height: ${RFValue(113)}px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
  `}
`

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.shape};
    font-family: ${theme.fonts.regular};
    font-size: ${RFValue(18)}px;
  `}
`

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const Content = styled.ScrollView`
  ${({ theme }) => css``}
`

export const ChartContainer = styled.View`
  ${({ theme }) => css`
    width: 100%;
    align-items: center;
  `}
`

export const MouthSelect = styled.View`
  ${({ theme }) => css`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
  `}
`

export const MouthSelectButton = styled(BorderlessButton)``

export const MouthSelectIcon = styled(Feather)`
  ${({ theme }) => css`
    font-size: ${RFValue(24)}px;
  `}
`

export const Mouth = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    font-size: ${RFValue(20)}px;
  `}
`
