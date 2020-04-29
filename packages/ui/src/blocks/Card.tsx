import React, {
  useRef,
  useCallback,
  useEffect,
  useState,
  useLayoutEffect,
} from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  transform,
  useAnimation,
} from 'framer-motion'
import { tween } from 'popmotion'
import { linear } from '@popmotion/easing'
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
  const [cardSize, setCardSize] = useState({ width: 0, height: 0 })
  const cardRef = useRef<any>()
  const hoverIndicatorRef = useRef<any>()
  const {
    onHover,
    onHoverEnd,
    onHoverStart,
    pointerX,
    pointerY,
    hover,
    cardParallaxAnimation,
    imageParallaxAnimation,
    hoverIndicatorAnimation,
  } = useAnimatedCard(cardRef, hoverIndicatorRef)

  const layout =
    assets.length > 1
      ? { x: 2, y: Math.ceil(assets.length / 2) }
      : { x: 1, y: 1 }

  useLayoutEffect(() => {
    const rect = cardRef.current.getBoundingClientRect()
    setCardSize({ width: rect.width, height: rect.height })
  }, [cardRef])

  return (
    <RebassCard
      ref={cardRef}
      {...(props as any)}
      // backgroundColor={'blue'}
    >
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
          <Flex flexDirection={'row'} flexWrap={'wrap'}>
            {assets.map((asset, index) => {
              return (
                <Box key={`${asset}-${index}`} width={1 / layout.x}>
                  <AspectRatioContainer>
                    <AspectRatioInner>
                      <Image src={asset} />
                    </AspectRatioInner>
                  </AspectRatioContainer>
                </Box>
              )
            })}
          </Flex>
        </ParallaxInnerContainer>
      </ParallaxContainer>
    </RebassCard>
  )
}

export default Card

const ParallaxContainer = styled(motion.div)({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 10,
  cursor: 'none',
})

const ParallaxInnerContainer = styled(motion.div)({
  overflow: 'hidden',
  borderRadius: 10,
})

const Image = styled(motion.img)({
  objectFit: 'cover',
  width: '100%',
  height: '100%',
})

const AspectRatioContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: 0,
  paddingBottom: '56.25%',
})

const AspectRatioInner = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
})

const HoverIndicator = styled(motion.div)({
  position: 'absolute',
  background:
    'radial-gradient(closest-side, rgba(255, 255, 255, 0.4), transparent)',
  width: '400px',
  height: '400px',
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

  const cardParallaxAnimation = useAnimation()
  const imageParallaxAnimation = useAnimation()
  const hoverIndicatorAnimation = useAnimation()

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const hover = useMotionValue(0)

  useEffect(() => {
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
          x: translate(pointerXValue),
          y: translate(pointerYValue),
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

  // const boxShadow = useTransform(
  //   pointerY,
  //   [0, 1],
  //   [
  //     '0px 5px 20px rgba(173, 0, 255, 0.2)',
  //     '0px -5px 20px rgba(173, 0, 255, 0.2)',
  //   ]
  // )

  // boxShadow: '0px 0px 10px rgba(173, 0, 255, 0.2)',

  // const boxShadow = useSpring(
  //   useTransform(pointerX, [0, 1], ['-45deg', '45deg']),
  //   {
  //     stiffness: 300,
  //     damping: 100,
  //   }
  // )

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
