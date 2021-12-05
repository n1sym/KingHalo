import { Table, Thead, Tbody, Tr, Th, Td, Box, Text, Link, useColorModeValue } from "@chakra-ui/react";
export function ColorNum(num: any) {
    const first = useColorModeValue('yellow.100', '#f0e68c')
    const second = useColorModeValue('blue.100', '#87ceeb')
    const third = useColorModeValue('orange.100', '#d2b48c')
    const color = useColorModeValue('black', 'black')
    if (num <= 3) {
      const num_str = String(num)
      if (num == 1) {
        return <Text bg={first} textAlign="center" color={color}> {num_str} </Text>
      } else if (num == 2) {
        return <Text bg={second} textAlign="center" color={color}> {num_str} </Text>
      } else if (num == 3) {
        return <Text bg={third} textAlign="center" color={color}> {num_str} </Text>
      } else {
        return <Text color="green.400" textAlign="center"> {num_str} </Text>
      }
    } else if (num == "") {
      return <Text textAlign="center"> {"-"} </Text>
    } else {
      return <Text textAlign="center"> {num} </Text>
    }
  }
  