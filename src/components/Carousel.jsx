import { useRef, useEffect, useState } from 'react'
import { motion, useAnimation, useMotionValue } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useI18n } from '../context/I18nContext'

const LANG_MAP = {
    'zh-TW': 'zh-TW',
    'en': 'EN',
    'ja': 'JP',
    'ko': 'ko'
}

const CAROUSEL_IMAGES = [1, 2, 3, 4, 5]
const DRAG_THRESHOLD = 50

export default function Carousel() {
    const { lang } = useI18n()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [autoScrollComplete, setAutoScrollComplete] = useState(false)
    const carousel = useRef()

    // Auto-scroll effect on mount
    useEffect(() => {
        if (!autoScrollComplete) {
            const timer = setTimeout(() => {
                let index = 0
                const interval = setInterval(() => {
                    index++
                    setCurrentIndex(index)
                    if (index >= CAROUSEL_IMAGES.length - 1) {
                        clearInterval(interval)
                        setAutoScrollComplete(true)
                    }
                }, 4000) // Increased to 4 seconds for better viewing

                return () => clearInterval(interval)
            }, 1000)

            return () => clearTimeout(timer)
        }
    }, [autoScrollComplete])

    // Navigate to specific index
    const goToSlide = (index) => {
        setCurrentIndex(index)
    }

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? CAROUSEL_IMAGES.length - 1 : prev - 1))
    }

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === CAROUSEL_IMAGES.length - 1 ? 0 : prev + 1))
    }

    // Handle drag end to snap to slides
    const onDragEnd = (event, info) => {
        const offset = info.offset.x
        if (Math.abs(offset) > DRAG_THRESHOLD) {
            if (offset > 0) {
                goToPrevious()
            } else {
                goToNext()
            }
        }
    }

    const folder = LANG_MAP[lang] || 'EN'

    return (
        <div className="carousel-wrapper">
            <div className="carousel-container">
                {/* Left Arrow */}
                <button
                    className="carousel-arrow carousel-arrow-left"
                    onClick={() => {
                        goToPrevious()
                        setAutoScrollComplete(true) // User interaction stops auto-scroll
                    }}
                    aria-label="Previous screenshot"
                >
                    <ChevronLeft size={32} />
                </button>

                {/* Carousel Images - Now with Drag support */}
                <div className="carousel" ref={carousel}>
                    <motion.div
                        className="inner-carousel"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={onDragEnd}
                        animate={{ x: -currentIndex * 320 }} // 300px width + 20px gap
                        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                        whileTap={{ cursor: "grabbing" }}
                        style={{ cursor: "grab" }}
                    >
                        {CAROUSEL_IMAGES.map((i) => (
                            <motion.div
                                className="carousel-item"
                                key={i}
                            >
                                <img
                                    src={`/assets/${folder}/${folder}_${i}.jpg`}
                                    alt={`App usage screen ${i}`}
                                    draggable="false"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Right Arrow */}
                <button
                    className="carousel-arrow carousel-arrow-right"
                    onClick={() => {
                        goToNext()
                        setAutoScrollComplete(true) // User interaction stops auto-scroll
                    }}
                    aria-label="Next screenshot"
                >
                    <ChevronRight size={32} />
                </button>
            </div>

            {/* Dot Indicators */}
            <div className="carousel-dots">
                {CAROUSEL_IMAGES.map((_, index) => (
                    <button
                        key={index}
                        className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => {
                            goToSlide(index)
                            setAutoScrollComplete(true)
                        }}
                        aria-label={`Go to screenshot ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
