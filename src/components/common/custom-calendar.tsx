'use client'

import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

interface ModernCalendarProps {
  value?: string
  onChange: (date: string) => void
  error?: boolean
  className?: string
}

export default function CustomCalendar({
  value,
  onChange,
  error,
  className,
}: ModernCalendarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  })
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle mounting for portal
  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate years from 1980 to current year
  const currentYear = new Date().getFullYear()
  const years = Array.from(
    { length: currentYear - 1980 + 1 },
    (_, i) => currentYear - i
  )

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  // Initialize from value prop
  useEffect(() => {
    if (value) {
      const date = new Date(value)
      if (!isNaN(date.getTime())) {
        setSelectedDate(date)
        setSelectedYear(date.getFullYear())
        setSelectedMonth(date.getMonth())
      }
    }
  }, [value])

  // Get calendar days for the selected month/year
  const getCalendarDays = () => {
    const firstDay = new Date(selectedYear, selectedMonth, 1)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const totalDays = 42 // 6 weeks * 7 days

    for (let i = 0; i < totalDays; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      days.push(date)
    }

    return days
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const dateString = `${year}-${month}-${day}`
    onChange(dateString)
    setIsOpen(false)
  }

  const formatDisplayDate = () => {
    if (selectedDate) {
      return selectedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }
    return 'Select date'
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString()
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === selectedMonth
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (selectedMonth === 0) {
        setSelectedMonth(11)
        setSelectedYear(selectedYear - 1)
      } else {
        setSelectedMonth(selectedMonth - 1)
      }
    } else {
      if (selectedMonth === 11) {
        setSelectedMonth(0)
        setSelectedYear(selectedYear + 1)
      } else {
        setSelectedMonth(selectedMonth + 1)
      }
    }
  }

  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const viewportWidth = window.innerWidth
      const dropdownHeight = 400 // Approximate height of dropdown
      const dropdownWidth = Math.max(rect.width, 320) // Minimum width of 320px

      let top = rect.bottom + 8
      let left = rect.left

      // Adjust if dropdown would go below viewport
      if (top + dropdownHeight > viewportHeight) {
        top = rect.top - dropdownHeight - 8
      }

      // Adjust if dropdown would go beyond right edge
      if (left + dropdownWidth > viewportWidth) {
        left = viewportWidth - dropdownWidth - 16
      }

      // Ensure dropdown doesn't go beyond left edge
      if (left < 16) {
        left = 16
      }

      setDropdownPosition({
        top,
        left,
        width: dropdownWidth,
      })
    }
  }

  const handleToggle = () => {
    if (!isOpen) {
      updateDropdownPosition()
    }
    setIsOpen(!isOpen)
  }

  // Handle window resize and scroll
  useEffect(() => {
    if (isOpen) {
      const handleResize = () => updateDropdownPosition()
      const handleScroll = () => updateDropdownPosition()

      window.addEventListener('resize', handleResize)
      window.addEventListener('scroll', handleScroll, true)

      return () => {
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('scroll', handleScroll, true)
      }
    }
  }, [isOpen])

  // Close calendar when clicking outside
  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node

        // Don't close if clicking on the button or inside the dropdown
        if (
          (buttonRef.current && buttonRef.current.contains(target)) ||
          (dropdownRef.current && dropdownRef.current.contains(target))
        ) {
          return
        }

        setIsOpen(false)
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <>
      <div className={`relative ${className}`}>
        {/* Calendar Input */}
        <button
          ref={buttonRef}
          type="button"
          onClick={handleToggle}
          className="w-full bg-[#F4F4F50D] border h-14 text-lg rounded-4xl px-6 flex items-center justify-between transition-all duration-200 hover:border-[#FFE99960] focus:border-yellow-400 focus:outline-none text-left"
          style={{
            borderColor: error ? '#FFE99980' : '#F4F4F51A',
          }}
        >
          <span
            className={
              selectedDate ? 'text-white' : 'text-[#8C8C97] font-light'
            }
          >
            {formatDisplayDate()}
          </span>
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/calendar.svg" alt="calendar-icon" className="w-5 h-5" />
            <ChevronDown
              className={`w-4 h-4 text-[#8C8C97] transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Calendar Dropdown - Rendered at document body level using portal */}
      {isOpen &&
        mounted &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed bg-[#020D11F5] backdrop-blur-xl border border-[#FFFFFF1A] rounded-2xl p-6 shadow-2xl"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
              zIndex: 9999,
            }}
          >
            {/* Header with Year and Month Dropdowns */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 rounded-lg hover:bg-[#FFFFFF0D] transition-colors duration-200"
              >
                <ChevronLeft className="w-5 h-5 text-[#F4F4F5]" />
              </button>

              <div className="flex items-center gap-3">
                {/* Month Dropdown */}
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="bg-[#F4F4F50D] border border-[#F4F4F51A] rounded-lg px-3 py-2 text-[#F4F4F5] text-sm focus:border-yellow-400 focus:outline-none cursor-pointer hover:border-[#FFE99960] transition-colors duration-200"
                >
                  {months.map((month, index) => (
                    <option
                      key={month}
                      value={index}
                      className="bg-[#020D11] text-[#F4F4F5]"
                    >
                      {month}
                    </option>
                  ))}
                </select>

                {/* Year Dropdown */}
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="bg-[#F4F4F50D] border border-[#F4F4F51A] rounded-lg px-3 py-2 text-[#F4F4F5] text-sm focus:border-yellow-400 focus:outline-none cursor-pointer hover:border-[#FFE99960] transition-colors duration-200"
                >
                  {years.map((year) => (
                    <option
                      key={year}
                      value={year}
                      className="bg-[#020D11] text-[#F4F4F5]"
                    >
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => navigateMonth('next')}
                className="p-2 rounded-lg hover:bg-[#FFFFFF0D] transition-colors duration-200"
              >
                <ChevronRight className="w-5 h-5 text-[#F4F4F5]" />
              </button>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div
                  key={day}
                  className="h-8 flex items-center justify-center text-xs font-medium text-[#8C8C97]"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {getCalendarDays().map((date, index) => {
                const isCurrentMonthDate = isCurrentMonth(date)
                const isTodayDate = isToday(date)
                const isSelectedDate = isSelected(date)

                return (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(date)}
                    className={`
                      h-10 w-full rounded-lg text-sm font-medium transition-all duration-200 relative
                      ${
                        !isCurrentMonthDate
                          ? 'text-[#8C8C97] opacity-40 hover:opacity-60'
                          : 'text-[#F4F4F5] hover:bg-[#FFFFFF0D]'
                      }
                      ${
                        isSelectedDate
                          ? 'bg-[#FFE999] text-[#020D11] hover:bg-[#FFE999] hover:opacity-90 shadow-lg'
                          : ''
                      }
                      ${
                        isTodayDate && !isSelectedDate
                          ? 'bg-[#FFFFFF1A] border border-[#FFE99960]'
                          : ''
                      }
                    `}
                  >
                    {date.getDate()}
                    {isTodayDate && !isSelectedDate && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#FFE999] rounded-full" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Footer with Today Button */}
            <div className="mt-4 pt-4 border-t border-[#FFFFFF1A]">
              <button
                onClick={() => handleDateSelect(new Date())}
                className="w-full py-2 text-sm text-[#FFE999] hover:text-[#FFE999CC] transition-colors duration-200 font-medium"
              >
                Today
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
