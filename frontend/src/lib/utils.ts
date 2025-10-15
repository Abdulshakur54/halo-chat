import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import toast from "react-hot-toast"
import type { ToastOptions } from "react-hot-toast"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date into a HH:mm (24-hour) time string
 */
export function formatMessageTime(date: string | number | Date): string {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",  // "Sep"
    day: "numeric",  // "12"
    year: "numeric", // "2025"
  });
}


/**
 * Capitalize the first letter of a string
 */
export const capitalizeFirstLetter = (str: string): string =>
  str ? str[0].toUpperCase() + str.slice(1) : ""

/**
 * Extend toast with a custom `info` method
 */
interface InfoToastOptions extends ToastOptions {
  style?: React.CSSProperties
}

; (toast as typeof toast & { info: (message: string, options?: InfoToastOptions) => void }).info =
  (message: string, options: InfoToastOptions = {}) =>
    toast(message, {
      icon: "ℹ️",
      style: {
        border: "1px solid #3b82f6",
        padding: "16px",
        color: "#3b82f6",
        ...options.style, // allow overrides
      },
      ...options,
    })

export { toast }

