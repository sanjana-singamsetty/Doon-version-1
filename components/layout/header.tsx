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
  { label: "Admissions", href: "/admissions" },
  { label: "Curriculum", href: "/curriculum" },
  // { label: "Contact", href: "/contact" },
]

export function Header() {
  const [isVisible, setIsVisible] = React.useState(true)
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)
  const { scrollY } = useScroll()
  const lastScrollY = React.useRef(0)
  const dropdownRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({})

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

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      let clickedOutside = true

      // Check if click was inside any dropdown
      Object.values(dropdownRefs.current).forEach((ref) => {
        if (ref && ref.contains(target)) {
          clickedOutside = false
        }
      })

      if (clickedOutside) {
        setOpenDropdown(null)
      }
    }

    if (openDropdown) {
      // Use a small timeout to let link clicks process first
      const timeoutId = setTimeout(() => {
        document.addEventListener("click", handleClickOutside)
      }, 200)

      return () => {
        clearTimeout(timeoutId)
        document.removeEventListener("click", handleClickOutside)
      }
    }
  }, [openDropdown])

  const handleDropdownToggle = (itemLabel: string) => {
    setOpenDropdown(openDropdown === itemLabel ? null : itemLabel)
  }

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
      <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 shadow-sm">
          <div className="flex justify-end items-center gap-8 sm:gap-10 lg:gap-12">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="relative"
              >
                {item.dropdown ? (
                  <div 
                    className="relative" 
                    ref={(el) => {
                      if (openDropdown === item.label) {
                        dropdownRefs.current[item.label] = el
                      }
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDropdownToggle(item.label)
                      }}
                      className="text-gray-700 font-medium text-base sm:text-lg hover:text-gray-900 hover:scale-105 transition-all duration-200 flex items-center gap-1"
                      type="button"
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
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
                    </button>
                    {openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[60]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-gray-900 font-medium text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                            onClick={() => {
                              setOpenDropdown(null)
                            }}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 font-medium text-base sm:text-lg hover:text-gray-900 hover:scale-105 transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                )}
              </motion.div>
            ))}
            
            {/* Apply Now Button - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="ml-2 relative"
            >
              <Link
                href="/admissions/login"
                className="text-gray-900 font-extrabold text-base sm:text-lg hover:text-gray-700 hover:scale-110 transition-all duration-200 relative inline-block"
              >
                <motion.span
                  animate={{
                    opacity: [1, 0.3, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-block"
                >
                  Apply Now
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}
