import React, {
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'
import { motion, useMotionValue, transform, useAnimation } from 'framer-motion'
import {
  Card as RebassCard,
  CardProps as RebassCardProps,
  Box,
  Flex,
} from 'rebass'
import { styled } from '~ui/styles/theme'

interface CardProps extends RebassCardProps {
  assets: string[]
}

const Card: React.FC<CardProps> = ({ children, assets, ...props }) => {
  const cardRef = useRef<any>()
  const hoverIndicatorRef = useRef<any>()
  const {
    onHover,
    onHoverEnd,
    onHoverStart,
    cardParallaxAnimation,
    imageParallaxAnimation,
    hoverIndicatorAnimation,
  } = useAnimatedCard(cardRef, hoverIndicatorRef)

  const layout =
    assets.length > 1
      ? { x: 2, y: Math.floor(assets.length / 2), items: assets.length }
      : { x: 1, y: 1, items: assets.length }

  let rowSpan = layout.y
  if (layout.x === 1 && layout.y === 1) {
    rowSpan = 2
  }

  // useLayoutEffect(() => {
  //   if (cardRef.current) {
  // const cardRect = cardRef.current.getBoundingClientRect()
  // const cardHeight = cardRect.width

  // setCardHeight(((cardHeight * 0.5625) / 2) * rowSpan)
  // }
  // }, [cardRef])

  return (
    <Box sx={{ gridRowEnd: `span ${rowSpan}` }} key={props.key}>
      <RebassCard ref={cardRef} {...(props as any)} padding={0} height={'100%'}>
        <ParallaxContainer
          animate={cardParallaxAnimation}
          whileHover={{
            zIndex: 100,
          }}
          onHoverStart={onHoverStart}
          onMouseMove={onHover}
          onMouseOut={onHoverEnd}
        >
          <HoverIndicator
            ref={hoverIndicatorRef}
            initial={{ opacity: 0 }}
            animate={hoverIndicatorAnimation}
          />
          <ParallaxInnerContainer animate={imageParallaxAnimation}>
            <AssetGrid assets={assets} layout={layout} />
          </ParallaxInnerContainer>
        </ParallaxContainer>
      </RebassCard>
    </Box>
  )
}

export default Card

interface AssetGridProps extends Pick<CardProps, 'assets'> {
  layout: {
    x: number
    y: number
    items: number
  }
}

const AssetGrid: React.FC<AssetGridProps> = ({ assets, layout, ...props }) => {
  // Layout is a bit complicated as the last row might have an extra element.
  // const imageLayout = layout
  // let lastRowRowTemplate = ``
  // let lastRowColumnTemplate = ``
  // if (layout.items / 2 > layout.y) {
  //   lastRowRowTemplate = `1fr`
  //   lastRowColumnTemplate =
  // }

  const gridData: string[][] = [[]]
  assets.forEach((asset, index) => {
    let x = index % layout.x
    let y = Math.floor(index / layout.x)
    // If we have an extra element (uneven number), then we append that element
    // to the last row in the grid data.
    if (y == layout.y) {
      y = layout.y - 1
      x = layout.x
    }

    if (!gridData[y]) {
      gridData[y] = []
    }

    gridData[y][x] = asset
  })

  console.log('Grid: ', gridData)

  return (
    <Flex
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 0',
        height: '100%',
        width: '100%',
      }}
      // sx={{
      //   display: 'grid',
      //   gridGap: 0,
      //   gridTemplateColumns: `repeat(${layout.x}, 1fr) ${lastRowColumnTemplate}`,
      //   gridTemplateRows: `repeat(${layout.y}, 1fr) ${lastRowRowTemplate}`,
      //   height: '100%',
      //   width: '100%',
      // }}
      {...props}
    >
      {gridData.map((row, rowIndex) => (
        <Box
          sx={{
            flex: '1 1 0',
            display: 'flex',
            flexDirection: 'row',
            height: 0,
            width: '100%',
          }}
        >
          {row.map((asset, colIndex) => (
            <Box width={'100%'} height={'100%'}>
              <Image src={asset} key={`${rowIndex}-${colIndex}`} />
            </Box>
          ))}
        </Box>
      ))}
    </Flex>
  )
}

const ParallaxContainer = styled(motion.div)({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 10,
  cursor: 'none',
  height: '100%',
  width: '100%',
})

const ParallaxInnerContainer = styled(motion.div)({
  height: '100%',
  width: '100%',
})

const Image = styled(motion.img)({
  objectFit: 'cover',
  width: '100%',
  height: '100%',
})

const HoverIndicator = styled(motion.div)({
  position: 'absolute',
  overflow: 'visible',
  background:
    'radial-gradient(closest-side, rgba(173, 0, 255, 0.1), transparent)',
  // mixBlendMode: 'multiply',
  width: '56.25%',
  height: '100%',
  zIndex: 1000,
})

// Hooks

function useAnimatedCard(
  cardRef: React.MutableRefObject<any>,
  hoverIndicatorRef: React.MutableRefObject<any>
) {
  const shadowOffset = transform([0, 1], ['6px', '-6px'])
  const shadowOpacity = transform([0, 1], [0, 0.2])
  const translate = transform([0, 1], ['-4px', '4px'])
  const translateInner = transform([0, 1], ['2px', '-2px'])

  const cardParallaxAnimation = useAnimation()
  const imageParallaxAnimation = useAnimation()
  const hoverIndicatorAnimation = useAnimation()

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const hover = useMotionValue(0)

  useEffect(() => {
    if (!hoverIndicatorRef.current || !cardRef.current) {
      return
    }

    const indicatorRect =
      hoverIndicatorRef.current.getBoundingClientRect() || {}
    const cardRect = cardRef.current.getBoundingClientRect() || {}

    const indicatorSize_2 = {
      width: indicatorRect.width / 2,
      height: indicatorRect.height / 2,
    }
    const translateIndicatorX = transform(
      [0, 1],
      [-indicatorSize_2.width, cardRect.width - indicatorSize_2.width]
    )
    const translateIndicatorY = transform(
      [0, 1],
      [-indicatorSize_2.height, cardRect.height - indicatorSize_2.height]
    )

    function updatePointerMovement() {
      // console.log('Pointer: ', pointerX.get(), pointerY.get())
      const hoverValue = hover.get()
      const pointerXValue = hoverValue > 0 ? pointerX.get() : 0.5
      const pointerYValue = hoverValue > 0 ? pointerY.get() : 0.5

      const shadowValue = `${shadowOffset(pointerXValue)} ${shadowOffset(
        pointerYValue
      )} 20px rgba(173, 0, 255, ${shadowOpacity(hoverValue)})`

      cardParallaxAnimation.start(
        {
          x: translate(pointerXValue),
          y: translate(pointerYValue),
          transition: {
            type: 'tween',
            duration: 0.1,
          },
          boxShadow: shadowValue,
        },
        {
          scale: {
            type: 'tween',
            duration: 0.3,
          },
        }
      )

      imageParallaxAnimation.start(
        {
          x: translateInner(pointerXValue),
          y: translateInner(pointerYValue),
          transition: { type: 'tween', duration: 0.1 },
        },
        {
          scale: {
            type: 'tween',
            duration: 0.3,
          },
        }
      )

      if (hoverValue > 0) {
        hoverIndicatorAnimation.start({
          x: translateIndicatorX(pointerXValue),
          y: translateIndicatorY(pointerYValue),
          transition: { type: 'tween', duration: 0 },
        })
      }
    }

    function updateHover() {
      const scaleCard = transform([0, 1], [1, 1.1])
      const hoverValue = hover.get()
      cardParallaxAnimation.start(
        {
          scale: scaleCard(hoverValue),
        },
        {
          scale: {
            type: 'tween',
            duration: 0.3,
          },
        }
      )

      imageParallaxAnimation.start(
        {
          scale: scaleCard(hoverValue),
        },
        {
          scale: {
            type: 'tween',
            duration: 0.3,
          },
        }
      )

      hoverIndicatorAnimation.start({
        opacity: hoverValue,
        transition: {
          type: 'tween',
          duration: 0.5,
        },
      })

      updatePointerMovement()
    }

    const unsubscribeX = pointerX.onChange(updatePointerMovement)
    const unsubscribeY = pointerY.onChange(updatePointerMovement)
    const unsubscribeHover = hover.onChange(updateHover)

    return () => {
      unsubscribeX()
      unsubscribeY()
      unsubscribeHover()
    }
  }, [cardRef, hoverIndicatorRef])

  const onHoverStart = useCallback(() => {
    hover.set(1)
  }, [])

  const onHover = useCallback(
    (e: any) => {
      hover.set(1)
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left //x position within the element.
      const y = e.clientY - rect.top //y position within the element.

      pointerX.set(x / rect.width)
      pointerY.set(y / rect.height)
    },
    [cardRef]
  )

  const onHoverEnd = useCallback(() => {
    hover.set(0)
  }, [])

  return {
    onHover,
    onHoverStart,
    onHoverEnd,
    pointerX,
    pointerY,
    hover,
    cardParallaxAnimation,
    imageParallaxAnimation,
    hoverIndicatorAnimation,
  }
}
