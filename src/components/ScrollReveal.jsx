import { motion, useReducedMotion } from 'framer-motion'

const easeOut = [0.22, 1, 0.36, 1]

function useRevealMotionProps() {
  const reduceMotion = useReducedMotion()

  return reduceMotion
    ? {
        initial: { opacity: 1, y: 0 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.16, margin: '0px 0px -48px 0px' },
        transition: { duration: 0.42, ease: easeOut },
      }
}

export function ScrollReveal({ element = 'section', children, className, ...rest }) {
  const Motion = element === 'footer' ? motion.footer : motion.section
  const motionProps = useRevealMotionProps()

  return (
    <Motion className={className} {...motionProps} {...rest}>
      {children}
    </Motion>
  )
}

const staggerContainer = (reduceMotion) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: reduceMotion ? 0 : 0.06,
      delayChildren: reduceMotion ? 0 : 0.04,
    },
  },
})

const staggerItem = (reduceMotion) =>
  reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 12 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.36, ease: easeOut },
        },
      }

export function StaggerGrid({ children, className }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={staggerContainer(reduceMotion)}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.14, margin: '0px 0px -36px 0px' }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div className={className} variants={staggerItem(reduceMotion)}>
      {children}
    </motion.div>
  )
}
