import { Table, Thead, Tbody, Tr, Th, Td, Box, Text, Link } from "@chakra-ui/react";

export const IndexTable = (props: { result: any[] }) => (
  <>
  <Box overflowX={{base:"auto", sm:"auto", md: "auto"}} pt={2} pb={4}>
  <Table size="sm" mt={4}>
    <Thead>
      <Tr>
        <Th>馬名</Th>
        <Th>性齢</Th>
        <Th>毛色</Th>
        <Th>開催</Th>
        <Th>レース名</Th>
        <Th>父</Th>
        <Th>母</Th>
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
      <Td minW={24}>{kaisai(item.race_id)}</Td>
      <Td minW={40}>
      <Link color='teal.500' href={"https://race.netkeiba.com/race/shutuba.html?race_id="+item.race_id+"&rf=race_list"} target="_blank" rel="noopener">
          {item.race_name}
        </Link>
      </Td>
      <Td minW={40}>{colorNum(item.b_ml)}</Td>
      <Td minW={40}>{colorNum(item.b_fml)}</Td>
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

interface KaisaiId {
  [key: string]: string;
}

const kaisai = (raceId: number) => {
  const kaisaiId: keyof KaisaiId = String(raceId).substring(4, 6)
  const hash = {
    "01": "札幌",
    "02": "函館",
    "03": "福島",
    "04": "新潟",
    "05": "東京",
    "06": "中山", 
    "07": "中京", 
    "08": "京都",
    "09": "阪神",
    "10": "小倉"
  } as KaisaiId
  const rId = Number(String(raceId).substring(10, 12))
  return <Text> {hash[kaisaiId]} {rId}R </Text>
}