

import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import animate from "../utils/animate";

const delay = 2

function Nametag({ onEnd }) {
  return <motion.div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
    <motion.div
      className='text-7xl lg:text-8xl font-display font-bold'
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}

      transition={{
        type: 'easeInOut',
        duration: 1
      }}
    >
      <motion.span
        initial={{
          left: "0%"
        }}
        animate={{
          left: "33.333%"
        }}

        transition={{
          type: 'easeInOut',
          duration: 1,
          delay: delay
        }}

        onAnimationComplete={onEnd}

        className='relative'
      >
        lew
      </motion.span>
      <motion.span
        initial={{
          left: "0%",
          opacity: 1
        }}
        animate={{
          opacity: 0,
          left: "33.333%"
        }}

        transition={{
          type: 'easeInOut',
          duration: 1,
          delay: delay
        }}

        className='relative'
      >.digital</motion.span>
    </motion.div>
  </motion.div >
}

function A({ href, children }) {
  return <Link href={href}>
    <span className="text-blue-500 hover:text-blue-300 transition-all cursor-pointer">
      {children} ↗
    </span>
  </Link>
}

function Details() {
  return <motion.div
    className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'

    initial={{
      opacity: 0,
      display: "block"
    }}
    animate={{
      opacity: 1
    }}

    transition={{
      type: 'easeInOut',
      duration: 1,
      delay: 1
    }}
    key="details"
  >
    <div>
      Lewis Carson
      <div className="h-4"></div>
      <ul>
        <li>
          <A href="mailto:torvimmm@gmail.com">mail</A>

        </li>
        <li>
          <A href="https://github.com/lew-d">github</A>
        </li>
        <li>
          <A href="/blog">blog</A>
        </li>
      </ul>
    </div>
  </motion.div >
}

export default function Home() {
  var [isOpen, setIsOpen] = useState(false)

  var onEnd = () => {
    setIsOpen(true)
  }

  return (
    <motion.div
      {...animate}
    >
      <main>
        <AnimatePresence>
          {
            !isOpen ?
              <Nametag onEnd={onEnd} key="nametag" /> :
              <Details key="details" />
          }
        </AnimatePresence>
      </main>
    </motion.div>
  )
}
