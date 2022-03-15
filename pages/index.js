import Head from 'next/head'
import Image from 'next/image'
import { styled } from '@stitches/react'
import Header from '../components/Header'
import Button from '../components/Button'


export default function Home() {
  return (
    <>
      <Head>
        <title>AluraGeek</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
    </>
  )
}
