import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
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
  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)
  const cardRef = useRef<any>()

  const x = useSpring(useTransform(pointerX, [0, 1], ['-4px', '4px']), {
    stiffness: 300,
    damping: 30,
  })
  const y = useSpring(useTransform(pointerY, [0, 1], ['-4px', '4px']), {
    stiffness: 300,
    damping: 30,
  })
  const boxShadow = useSpring(
    useTransform(pointerX, [0, 1], ['-45deg', '45deg']),
    {
      stiffness: 300,
      damping: 100,
    }
  )

  const onHover = (e: MouseEvent) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left //x position within the element.
    const y = e.clientY - rect.top //y position within the element.
    console.log('Mouse: ', x, y)
    pointerX.set(x / rect.width)
    pointerY.set(y / rect.height)
  }

  const onHoverEnd = () => {
    pointerX.set(0.5)
    pointerY.set(0.5)
  }

  const layout =
    assets.length > 1
      ? { x: 2, y: Math.ceil(assets.length / 2) }
      : { x: 1, y: 1 }

  console.log('')

  return (
    <RebassCard
      ref={cardRef}
      {...(props as any)}
      // backgroundColor={'blue'}
      onMouseMove={onHover}
      onMouseOut={onHoverEnd}
    >
      <ParallaxContainer
        style={{ x, y }}
        whileHover={{
          scale: 1.05,
          boxShadow: '0px 0px 10px rgba(173, 0, 255, 0.2)',
          zIndex: 1000,
        }}
        onHoverEnd={onHoverEnd}
      >
        <motion.div
          style={{
            x,
            y,
          }}
          whileHover={{ scale: 1.05 }}
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
  overflow: 'hidden',
  borderRadius: 10,
  cursor: 'none',
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
