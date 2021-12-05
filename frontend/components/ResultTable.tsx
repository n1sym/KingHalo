import { Table, Thead, Tbody, Tr, Th, Td, Box, Text, Link, useColorModeValue } from "@chakra-ui/react";
import {ColorNum} from "./ColorNum"
import {ColorRaceName} from "./ColorRaceName"

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
      <Td minW={10}>{ColorNum(item.odds_rank)}</Td>
      <Td minW={10}>{ColorNum(item.rank)}</Td>
      <Td minW={48}>
      <Link color='teal.500' href={item.race_url} target="_blank" rel="noopener">
          {ColorRaceName(item.race_name)}
        </Link>
      </Td>
      <Td minW={28} pl={8}>{item.jockey}</Td>
      <Td minW={20}>{item.course}</Td>
    </Tr>
  );
};


