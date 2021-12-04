import type { NextPage } from 'next'
import Head from 'next/head'
import { Container, Box, Heading } from '@chakra-ui/react'
import data from '../utils/test.json'

const Home: NextPage = () => {
  return (
    <Container maxW='container.lg'>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box py="4">
          <Heading>BMS King Halo</Heading>
        </Box>

        <Box py="4">
          {data.map((d: {name: string; age: number}, index: number)=>{
            return (
              <div key={index}>
                name: {d.name} age: {d.age}
              </div>
            )
          })}
        </Box>
      </main>
    </Container>
  )
}

export default Home