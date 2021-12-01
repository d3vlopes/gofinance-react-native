import styled, { css } from 'styled-components/native'
import { TextInput } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled(TextInput)`
  ${({ theme }) => css`
    width: 100%;
    padding: 16px 18px;
    font-size: ${RFValue(14)}px;
    font-family: ${theme.fonts.regular};
    background-color: ${theme.colors.shape};
    color: ${theme.colors.text_dark};
    border-radius: 5px;
    margin-bottom: 8px;
  `}
`
