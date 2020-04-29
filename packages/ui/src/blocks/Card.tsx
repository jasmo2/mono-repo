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
  const {
    onHover,
    onHoverEnd,
    onHoverStart,
    x,
    y,
    boxShadow,
    pointerX,
    pointerY,
    hover,
  } = useAnimatedCard(cardRef)

  const layout =
    assets.length > 1
      ? { x: 2, y: Math.ceil(assets.length / 2) }
      : { x: 1, y: 1 }

  console.log('')

  const hoverIndicatorX = useTransform(
    pointerX,
    [0, 1],
    ['-100px', `${cardSize.width - 100}px `]
  )
  const hoverIndicatorY = useTransform(
    pointerY,
    [0, 1],
    ['-100px', `${cardSize.height - 100}px`]
  )

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
        style={{ x, y, boxShadow }}
        whileHover={{
          scale: 1.05,
          zIndex: 100,
        }}
        onHoverStart={onHoverStart}
        onMouseMove={onHover}
        onMouseOut={onHoverEnd}
      >
        <HoverIndicator
          style={{
            x: hoverIndicatorX,
            y: hoverIndicatorY,
            opacity: hover,
          }}
        />
        <motion.div
          style={{
            x,
            y,
          }}
          whileHover={{ scale: 1.1 }}
        >
          <Flex flexDirection={'row'} flexWrap={'wrap'}>
            {assets.map(asset => {
              return (
                <Box key={asset} width={1 / layout.x}>
                  <AspectRatioContainer>
                    <AspectRatioInner>
                      <Image src={asset} />
                    </AspectRatioInner>
                  </AspectRatioContainer>
                </Box>
              )
            })}
          </Flex>
        </motion.div>
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

  // '&:before': {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   zIndex: 1000,
  //   boxShadow: `0px 0px 10px rgba(255, 255, 255, 0.75)`,
  // },
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
  background: 'radial-gradient(circle, rgba(173, 0, 255, 0.2), transparent)',
  // top: 0,
  // left: 0,
  borderRadius: '100px',
  width: '200px',
  height: '200px',
  zIndex: 1000,
})

// Hooks

function useAnimatedCard(cardRef: React.MutableRefObject<any>) {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)

  const hover = useMotionValue(0)

  const x = useSpring(useTransform(pointerX, [0, 1], ['-4px', '4px']), {
    stiffness: 300,
    damping: 30,
  })

  const y = useSpring(useTransform(pointerY, [0, 1], ['-4px', '4px']), {
    stiffness: 300,
    damping: 30,
  })

  const boxShadow = useMotionValue(`0px`)

  useEffect(() => {
    function updateBoxShadow() {
      console.log('Pointer: ', pointerX.get(), pointerY.get())
      const shadowOffsetX = transform([0, 1], ['6px', '-6px'])
      const shadowOpacity = transform([0, 1], [0, 0.2])
      const newShadowValue = `${shadowOffsetX(pointerX.get())} ${shadowOffsetX(
        pointerY.get()
      )} 20px rgba(173, 0, 255, ${shadowOpacity(hover.get())})`
      console.log('New Value: ', newShadowValue)
      boxShadow.set(newShadowValue)
    }

    const unsubscribeX = pointerX.onChange(updateBoxShadow)
    const unsubscribeY = pointerY.onChange(updateBoxShadow)
    const unsubscribeHover = hover.onChange(updateBoxShadow)

    return () => {
      unsubscribeX()
      unsubscribeY()
      unsubscribeHover()
    }
  }, [])

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
    tween({
      from: hover.get(),
      to: 1,
      duration: 100,
      ease: linear,
    }).start((v: number) => hover.set(v))
  }, [])

  const onHover = useCallback(
    (e: any) => {
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left //x position within the element.
      const y = e.clientY - rect.top //y position within the element.

      pointerX.set(x / rect.width)
      pointerY.set(y / rect.height)
    },
    [cardRef]
  )

  const onHoverEnd = useCallback(() => {
    tween({
      from: pointerX.get(),
      to: 0.5,
      duration: 100,
    }).start((v: number) => pointerX.set(v))
    tween({
      from: pointerY.get(),
      to: 0.5,
      duration: 100,
    }).start((v: number) => pointerY.set(v))
    tween({
      from: hover.get(),
      to: 0,
      duration: 100,
      ease: linear,
    }).start((v: number) => hover.set(v))
  }, [])

  return {
    onHover,
    onHoverStart,
    onHoverEnd,
    x,
    y,
    boxShadow,
    pointerX,
    pointerY,
    hover,
  }
}
