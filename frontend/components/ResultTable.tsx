import { Table, Thead, Tbody, Tr, Th, Td, Box, Text, Link, useColorModeValue } from "@chakra-ui/react";

export const ResultTable = (props: { result: any[] }) => (
  <>
  <Box overflowX={{base:"auto", sm:"auto", md: "auto"}} pt={2} pb={8}>
  <Table size="sm" mt={4}>
    <Thead>
      <Tr>
        <Th>日付</Th>
        <Th>馬名</Th>
        <Th textAlign="center">人気</Th>
        <Th textAlign="center">着順</Th>
        <Th>レース名</Th>
        <Th pl={8}>騎手</Th>
        <Th>距離</Th>
      </Tr>
    </Thead>
    <Tbody>
      {props.result.map((item: any, index: number) => {
        return displayThColor(index, item);
      })}
    </Tbody>
  </Table>
  </Box>
  </>
);

const displayThColor = (index: number, item: any) => {
  return (
    <Tr key={index}>
      <Td minW={10}>{item.date.substring(5, 10)}</Td>
      <Td minW={40}>
        <Link color='teal.500' href={item.horse_url} target="_blank" rel="noopener">
          {item.horse_name}
        </Link>
      </Td>
      <Td minW={10}>{colorNum(item.odds_rank)}</Td>
      <Td minW={10}>{colorNum(item.rank)}</Td>
      <Td minW={48}>
      <Link color='teal.500' href={item.race_url} target="_blank" rel="noopener">
          {colorRaceName(item.race_name)}
        </Link>
      </Td>
      <Td minW={28} pl={8}>{item.jockey}</Td>
      <Td minW={20}>{item.course}</Td>
    </Tr>
  );
};

function colorNum(num: any) {
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

function colorRaceName(raceName: string) {
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