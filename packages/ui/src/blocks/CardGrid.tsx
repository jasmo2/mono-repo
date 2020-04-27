import React from 'react'
import { Flex, Box } from 'rebass'

export interface CardGridItemData {
  key: string
  assets: string[]
}

export interface CardGridProps<T> {
  renderCard: (data: CardGridItemData & T, cardLayoutProps: any) => JSX.Element
  data: (CardGridItemData & T)[]
}

const CardGrid: React.FC<CardGridProps<any>> = <T,>(
  props: React.PropsWithChildren<CardGridProps<T>>
) => {
  return (
    <Flex flexDirection={'row'} flexWrap={'wrap'}>
      {props.data.map(itemData => {
        return (
          <Box key={itemData.key} width={1 / 3}>
            {props.renderCard(itemData, {})}
          </Box>
        )
      })}
    </Flex>
  )
}

export default CardGrid
