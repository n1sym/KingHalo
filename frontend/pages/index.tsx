import type { NextPage } from 'next'
import Head from 'next/head'
import { Container, Box, Heading, Link, Text, HStack } from '@chakra-ui/react'
import data from '../utils/halo.json'
import {IndexTable} from "../components/IndexTable"
import Footer from "../components/Footer"

type Halo = {
  date: string,
  list: Horse
}

type Horse = {
  horse_name: string,
  horse_url: string
}

const Home: NextPage = () => {
  return (
    <Container maxW='container.lg'>
      <Head>
        <title>King Halos</title>
        <meta name="description" content="中央競馬に出走する母父キングヘイローの競走馬を一覧にしたページです" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box pt="4">
          <Heading>King Halos</Heading>
          <Text pt="4">中央競馬に出走する母父キングヘイローの競走馬を一覧にしたページです。21時更新。</Text>
        </Box>

        <Box pt="8">
          {data.reverse().map((halo: any, index: number) => {
            return (
              <Box key={index} pb="4">
                <Heading size="md">{halo.date}</Heading>
                <IndexTable result={halo.list}></IndexTable>
              </Box>
            )
          })}
        </Box>
      </main>
      <Footer></Footer>
    </Container>
  )
}

export default Home
