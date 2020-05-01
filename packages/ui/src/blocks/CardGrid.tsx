import React, { useRef, useLayoutEffect, useState } from 'react'
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
  const gridRef = useRef<any>()
  const [rowHeight, setRowHeight] = useState(0)

  useLayoutEffect(() => {
    console.log('Grid: ', gridRef.current)
    if (gridRef.current) {
      // Mildly convoluted to make sure we have a consistent aspect ratio.
      const columnWidth = getComputedStyle(gridRef.current)
        .gridTemplateColumns.split(' ')[0]
        .replace(/px/, '')
      setRowHeight((parseFloat(columnWidth) * 0.5625) / 2)
    }
  }, [gridRef])

  return (
    <Box
      ref={gridRef}
      sx={{
        display: 'grid',
        gridGap: 3, // theme.space[3]
        gridTemplateColumns: 'repeat(auto-fill, minmax(30em, 1fr))',
        gridAutoRows: rowHeight,
      }}
    >
      {props.data.map(itemData => props.renderCard(itemData, {}))}
    </Box>
  )
}

export default CardGrid
