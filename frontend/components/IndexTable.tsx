import { Table, Thead, Tbody, Tr, Th, Td, Box, Text, Link } from "@chakra-ui/react";

export const IndexTable = (props: { result: any[] }) => (
  <>
  <Box overflowX={{base:"auto", sm:"auto", md: "auto"}} pt={2} pb={12}>
  <Table size="sm" mt={4}>
    <Thead>
      <Tr>
        <Th>馬名</Th>
        <Th>性齢</Th>
        <Th>毛色</Th>
        <Th>レース名</Th>
        <Th>父</Th>
        <Th>母</Th>
        <Th>母父</Th>
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
      <Td minW={40}>
        <Link color='teal.500' href={item.horse_url} target="_blank" rel="noopener">
          {item.horse_name}
        </Link>
      </Td>
      <Td minW={20}>{colorNum(item.horse_age)}</Td>
      <Td minW={20}>{horseColor(item.horse_color)}</Td>
      <Td minW={40}>
      <Link color='teal.500' href={"https://race.netkeiba.com/race/shutuba.html?race_id="+item.race_id+"&rf=race_list"} target="_blank" rel="noopener">
          {item.race_name}
        </Link>
      </Td>
      <Td minW={40}>{colorNum(item.b_ml)}</Td>
      <Td minW={40}>{colorNum(item.b_fml)}</Td>
      <Td minW={40}>{colorNum(item.b_ml_2)}</Td>
    </Tr>
  );
};

const colorNum = (num: any) => {
  if (num > 0) {
    const num_str = "+" + String(num)
    if (num <= 1000) {
      return <Text color="green.400"> {num_str} </Text>
    } else {
      return <Text color="green.400" fontWeight="semibold"> {num_str} </Text>
    }
  } else if (num == "") {
    return <Text> {"-"} </Text>
  } else {
    return <Text> {num} </Text>
  }
}

const horseColor = (color: any) => {
  if (color == "鹿毛") {
    return <Text color="red.900"> {color} </Text>
  } else if (color == "青鹿毛") {
    return <Text color="gray.900"> {color} </Text>
  } else if (color == "栗毛") {
    return <Text color="orange.600"> {color} </Text>
  } else if (color == "黒鹿毛") {
    return <Text color="black"> {color} </Text>
  } else if (color == "青毛") {
    return <Text color="black"> {color} </Text>
  } else if (color == "栃栗毛") {
    return <Text color="orange.700"> {color} </Text>
  }else {
    return <Text color="gray.400"> {color} </Text>
  }
}