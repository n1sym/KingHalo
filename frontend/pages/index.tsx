import type { NextPage } from 'next'
import Head from 'next/head'
import { Container, Box, Heading, Link, Text, HStack } from '@chakra-ui/react'
import data from '../utils/halo.json'
import resultData from '../utils/result.json'
import {IndexTable} from "../components/IndexTable"
import {ResultTable} from "../components/ResultTable"
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
        <Box pt="8">
          <Heading>今週の母父キングヘイロー</Heading>
          <Text pt="6" pb="2">中央競馬に出走する母父キングヘイローの競走馬を一覧にしたページです。金曜21時更新。</Text>
        </Box>

        <Box pt="4">
          {data.reverse().map((halo: any, index: number) => {
            return (
              <Box key={index} py="4">
                <Heading size="md">{halo.date}</Heading>
                <IndexTable result={halo.list}></IndexTable>
              </Box>
            )
          })}
        </Box>

        <Box pt="4">
          <Heading size="md">直近20レースの競走成績</Heading>
          <ResultTable result={resultData}></ResultTable>
        </Box>
      </main>
      <Footer></Footer>
    </Container>
  )
}

export default Home
