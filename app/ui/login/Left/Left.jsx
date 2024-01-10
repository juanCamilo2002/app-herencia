import Image from 'next/image';
import React from 'react'
import styles from "./left.module.css";

const Left = () => {
  return (
    <div className={styles.container}>
      
      <Image
        className={styles.image}
        src="/Herencia_logo.png"
        alt='logo'
        width={100}
        height={100}
      />
    </div>
  )
}

export default Left;
