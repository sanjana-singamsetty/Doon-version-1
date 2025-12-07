import { Poppins, Crimson_Pro } from "next/font/google"

/**
 * Font Constants
 * 
 * - Poppins: Used for all body text and normal content
 * - Crimson Pro: Used for headings (h1-h6) and subheadings
 */

export const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const crimsonPro = Crimson_Pro({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-crimson-pro",
  display: "swap",
})

