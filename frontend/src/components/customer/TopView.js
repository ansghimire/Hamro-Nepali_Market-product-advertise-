import React from 'react'

import { motion } from 'framer-motion'
import images from '../../assets/images'
import { useRef, useEffect, useState } from 'react'

function TopView() {

    const [width, setWidth] = useState(0);
    const carousel = useRef();

    useEffect(() => {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }, [])
    return (
        <>
            <motion.div ref={carousel} className="carousel cursor-grab " whileTap={{ cursor: "grabbing" }}>
                <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className="inner-carousel flex">
                    {images.map((image, index) => {
                        return (
                            <motion.div key={index} className="item min-h-[15rem] min-w-[20rem] p-[40px]">
                               
                                <img src={image} className="w-[100%] h-[60%] pointer-events-none" alt="" />
                                <p>Pulsar 220 77 Lot</p>
                                <p>Used</p>
                                <p>Rs 1,20,000</p>
                                
                            </motion.div>
                        )
                    })}

                </motion.div>
            </motion.div>
        </>
    )
}

export default TopView