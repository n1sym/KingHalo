import { Table, Thead, Tbody, Tr, Th, Td, Box, Text, Link, useColorModeValue } from "@chakra-ui/react";
export function ColorRaceName(raceName: string) {
    const first = useColorModeValue('yellow.100', '#f0e68c')
    const second = useColorModeValue('blue.100', '#87ceeb')
    const third = useColorModeValue('orange.100', '#d2b48c')
    const color = useColorModeValue('teal.500', 'gray.800')
    if (raceName.includes("G1")) {
        return <Text bg={first} p="1" m="-1" color={color}> {raceName} </Text>
    } else if (raceName.includes("G2")) {
        return <Text bg={second} p="1" m="-1" color={color}> {raceName} </Text>
    } else if (raceName.includes("G3")) {
        return <Text bg={third} p="1" m="-1" color={color}> {raceName} </Text>
    } else {
        return <Text> {raceName} </Text>
    }
}