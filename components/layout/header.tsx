"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

const navItems = [
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Admissions", href: "/admissions" },
  { label: "Curriculum", href: "/curriculum" },
  { label: "Contact", href: "/contact" },
]

export function Header() {
  const [isVisible, setIsVisible] = React.useState(true)
  const { scrollY } = useScroll()
  const lastScrollY = React.useRef(0)

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastScrollY.current && latest > 100) {
      // Scrolling down - hide navbar
      setIsVisible(false)
    } else {
      // Scrolling up - show navbar
      setIsVisible(true)
    }
    lastScrollY.current = latest
  })

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4"
    >
      <nav className="max-w-7xl mx-auto">
      <div className="bg-white/90 backdrop-blur-md rounded-full px-8 py-4 shadow-lg border border-white/20">
          <div className="flex justify-end items-center gap-10 sm:gap-12">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Link
                  href={item.href}
                  className="text-gray-900 font-semibold text-base sm:text-lg hover:text-blue-700 transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </nav>
    </motion.header>
  )
}
