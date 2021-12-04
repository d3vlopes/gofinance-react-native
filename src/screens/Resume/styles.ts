import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

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

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: { flex: 1, padding: 24 },
})`
  ${({ theme }) => css``}
`

export const ChartContainer = styled.View`
  ${({ theme }) => css`
    width: 100%;
    align-items: center;
  `}
`
