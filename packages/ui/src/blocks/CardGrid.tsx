import React, { useRef, useLayoutEffect, useState } from 'react'
import { Flex, Box } from 'rebass'

import {
  interval,
  Observable,
  ReplaySubject,
  Observer,
  Subscriber,
  TeardownLogic,
} from 'rxjs'
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame'
import { publish, refCount, map } from 'rxjs/operators'
import { number } from 'prop-types'

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

// Scroll Animation

// export interface FrameIntervalStep {
//   generated: number
//   stepSize: number
// }

// export interface AnimationFrame {
//   timestamp: number
//   delta: number
// }

// let iv: ReplaySubject<FrameIntervalStep>
// export const frameObservable = (): Observable<FrameIntervalStep> => {
//   if (!iv) {
//     iv = new ReplaySubject(1)

//     syncedAnimationFrame
//       .pipe(
//         map(({ timestamp, delta }) => ({
//           generated: animationFrame.now(),
//           timeStamp: timestamp,
//           stepSize: delta,
//         }))
//       )
//       .subscribe(iv)
//   }
//   return iv
// }

// export const syncedAnimationFrame = new Observable<AnimationFrame>(observer => {
//   let previousTimestamp = 0
//   const step: FrameRequestCallback = timestamp => {
//     const delta = timestamp - previousTimestamp
//     observer.next({ timestamp, delta })
//     previousTimestamp = timestamp

//     requestAnimationFrame(step)
//   }

//   requestAnimationFrame(step)
// }).pipe(publish(), refCount())

// // Additive Handler

// class AdditiveControlledObservable<T> extends Observable<T> {
//   constructor(
//     subscribe?: (
//       this: Observable<T>,
//       subscriber: Subscriber<T>
//     ) => TeardownLogic
//   ) {
//     super(subscribe)
//   }

// }

// const clicks = new Observable(observer => {
//   const handler = e => observer.next(e)
//   button.addEventListener('click', handler)
//   return () => button.removeEventListener('click', handler)
// })

// export class ScrollRecognizer {
//   wheelEvent: Observable<MouseWheelEvent>
//   scrollEvent: Observable<ScrollEvent>

//   event = new Subject<Partial<ScrollEvent>>()

//   constructor() {
//     super()

//     this.wheelEvent = fromEvent<MouseWheelEvent>(document.body, 'wheel')
//       .pipe
//       // tap(event => event.preventDefault())
//       ()

//     const scrollEvent = state => {
//       if (state != RecognizerState.Possible) {
//         return EMPTY
//       }

//       return this.wheelEvent.pipe(
//         buffer(syncedAnimationFrame),
//         filter(events => events.length > 0),
//         withLatestFrom(syncedAnimationFrame),
//         assignVelocityAcceleration(),
//         tap(value => {
//           this._currentValue = value
//           if (this.state.value === RecognizerState.Possible) {
//             this.state.next(RecognizerState.Began)
//           } else {
//             this.state.next(RecognizerState.Changed)
//           }
//         }),
//         map(value => ({ ...value, state: this.state.value }))
//       )
//     }

//     this.scrollEvent = this.state.pipe(
//       distinctUntilChanged(),
//       filter(
//         state =>
//           state === RecognizerState.Possible ||
//           state === RecognizerState.Cancelled ||
//           state === RecognizerState.Failed ||
//           state === RecognizerState.Ended
//       ),
//       switchMap(scrollEvent)
//     ) as Observable<ScrollEvent>

//     this.scrollEvent.subscribe(this.event)

//     let missedTicks
//     this.state
//       .pipe(
//         distinctUntilChanged(),
//         switchMap(state => {
//           if (state != RecognizerState.Changed) {
//             return EMPTY
//           }

//           missedTicks = 0
//           return this.wheelEvent.pipe(buffer(syncedAnimationFrame))
//         })
//       )
//       .subscribe(events => {
//         // console.log('Missed Ticks: ', missedTicks)
//         if (events.length > 0) {
//           missedTicks = 0
//         } else if (missedTicks > 2) {
//           this.state.next(RecognizerState.Ended)
//           this.state.next(RecognizerState.Possible)
//         } else {
//           missedTicks += 1
//         }
//       })

//     this.state.subscribe(state => {
//       if (isDoneState(state)) {
//         this.event.next({
//           state,
//           value: 0,
//           acceleration: 0,
//           lowPassAcceleration: 0,
//           lowPassVelocity: 0,
//           velocity: 0,
//           timeStamp: this._currentValue.timeStamp,
//           timeDelta: 0,
//         })
//       }
//     })
//   }

//   subscribe(...params) {
//     return this.event.subscribe(...params)
//   }

//   reset() {
//     this.state.next(RecognizerState.Possible)
//   }

//   set enabled(newValue: Boolean) {
//     if (this._enabled !== newValue) {
//       this._enabled = newValue
//       if (!newValue) {
//         this.state.next(RecognizerState.Cancelled)
//       } else {
//         this.reset()
//       }
//     }
//   }
// }
