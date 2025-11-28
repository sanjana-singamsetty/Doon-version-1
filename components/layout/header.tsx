"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

type NavItem = {
  label: string
  href: string
  dropdown?: Array<{ label: string; href: string }>
}

const navItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  { 
    label: "Admissions", 
    href: "/admissions",
    dropdown: [
      { label: "Admission Login", href: "/admissions/login" },
      { label: "Admission Form", href: "/admissions/application" },
    ]
  },
  { label: "Curriculum", href: "/curriculum" },
  { label: "Contact", href: "/contact" },
]

export function Header() {
  const [isVisible, setIsVisible] = React.useState(true)
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)
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
                className="relative"
                onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.dropdown ? (
                  <>
                    <button
                      className="text-gray-900 font-semibold text-base sm:text-lg hover:text-blue-700 transition-colors duration-200 relative group flex items-center gap-1"
                    >
                      {item.label}
                      <svg
                        className="w-4 h-4 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all duration-300" />
                    </button>
                    {openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                      >
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-gray-900 font-medium text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-900 font-semibold text-base sm:text-lg hover:text-blue-700 transition-colors duration-200 relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all duration-300" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </nav>
    </motion.header>
  )
}
