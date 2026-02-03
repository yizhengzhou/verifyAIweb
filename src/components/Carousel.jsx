import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../context/I18nContext'

// Mapping languages to asset folder names if they differ, 
// or just assuming standard structure: /assets/{lang}/{lang}_{index}.jpg
// Based on file listing: assets/zh-TW/zh-TW_1.jpg
// We'll need to handle 'en' -> 'EN' or similar case sensitivity if strictly needed, 
// but usually file systems on Mac are case insensitive (though not always). 
// Let's assume the folder names match the lang codes or map them.
const LANG_MAP = {
    'zh-TW': 'zh-TW',
    'en': 'EN',
    'ja': 'JP',
    'ko': 'ko'
}

const CAROUSEL_IMAGES = [1, 2, 3, 4, 5]

export default function Carousel() {
    const { lang } = useI18n()
    const [width, setWidth] = useState(0)
    const carousel = useRef()

    useEffect(() => {
        // Calculate scrollable width
        if (carousel.current) {
            setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
        }
    }, [])

    // Determine folder name
    const folder = LANG_MAP[lang] || 'EN'

    // Construct image paths
    // Note: specific pathing depends on how Vite serves public assets. 
    // If assets is in root, it might need to be moved to public/ or imported.
    // The user says "assets資料夾有app使用說明視覺卡片", but in Vite, 
    // static assets usually go in `public/` to be referenced by string URL, 
    // or `src/assets` to be imported. 
    // The file list showed `assets` at the root, which might be outside `public`?
    // Let's check `vite.config.js` or `index.html` references. 
    // Wait, the file list showed `public` AND `assets` at root. 
    // If `assets` is at root, it's not served by default in Vite unless configured. 
    // However, usually people put them in `public` or `src/assets`.
    // If it's a raw folder at root, we might not be able to link to it directly like `/assets/...` 
    // unless we move it or configure alias.
    // I will check if I should move them to `public/assets` or if they interpret `assets` as `public/assets`.
    // Let's assume for now I might need to move them to `public/images` or similar.
    // Actually, I should probably check if I can move them.
    // For now I will code the component to point to `/assets/${folder}/${folder}_${i}.jpg` 
    // and I will perform a move operation if needed in the next step.

    return (
        <div className="carousel-wrapper">
            <motion.div
                ref={carousel}
                className="carousel"
                whileTap={{ cursor: "grabbing" }}
            >
                <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    className="inner-carousel"
                >
                    {CAROUSEL_IMAGES.map((i) => (
                        <motion.div className="carousel-item" key={i}>
                            <img
                                src={`/assets/${folder}/${folder}_${i}.jpg`}
                                alt={`App usage screen ${i}`}
                                pointerEvents="none"
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    )
}
