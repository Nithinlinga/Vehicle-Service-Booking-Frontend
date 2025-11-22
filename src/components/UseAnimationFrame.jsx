
import { frame, motion, useSpring } from "motion/react"
import { useEffect, useRef } from "react"

export default function Drag() {
  const ref = useRef(null)
  const { x, y } = useFollowPointer(ref)

  return <motion.div ref={ref} style={{ ...ball, x, y }} />
}

const spring = { damping: 20, stiffness: 100, restDelta: 0.001 }


export function useFollowPointer(ref) {
  const x = useSpring(0, spring)
  const y = useSpring(0, spring)

  useEffect(() => {
    if (!ref.current) return

    const handlePointerMove = ({ clientX, clientY }) => {
      const element = ref.current

      frame.read(() => {
        x.set(clientX - element.offsetLeft - element.offsetWidth / 2)
        y.set(clientY - element.offsetTop - element.offsetHeight / 2)
      })
    }

    window.addEventListener("pointermove", handlePointerMove)

    return () => window.removeEventListener("pointermove", handlePointerMove)
  }, [])

  return { x, y }
}

/**
 * ==============   Styles   ================
 */

const ball = {
  width: 10,
  height: 10,
  backgroundColor: "#ff0088",
  borderRadius: "50%",
  position: "fixed",   // ensures it floats above layout
  zIndex: 9999,        // very high stacking order
  pointerEvents: "none" // prevents blocking clicks
}
