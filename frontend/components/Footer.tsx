import { Center, Stack, Text, Link } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Center color="black">
      <Stack pb={8} pt={4}>
        <Center>
          <Text mr={1} mt={2}>contact: </Text>
          <Link
              color="teal.500"
              mt={2}
              href="https://twitter.com/hukurouo_code"
              target="_blank"
              rel="noopener noreferrer"
            >
              @hukurouo
            </Link>
          <Text ml={2} mr={1} mt={2}>source: </Text>
          <Link
              color="teal.500"
              mt={2}
              href="https://github.com/hukurouo/KingHalo"
              target="_blank"
              rel="noopener noreferrer"
            >
              github
            </Link>
          </Center>
        
      </Stack>
      
    </Center>
  )
}