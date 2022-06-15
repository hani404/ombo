import React from "react";
import {
  chakra,
  Box,
  GridItem,
  useColorModeValue,
  Button,
  Stack,
  Center,
  Flex,
  Icon,
  SimpleGrid,
  VisuallyHidden,
  Input,
} from "@chakra-ui/react";

const KuttyHero = ({register , setFirstName , setLastName , setEmail , setPassword , setConfirmPassword }) => {
  return (
    <Box px={8} py={24} mx="auto" >
      <form onSubmit={register} name='registration_form'>
      <SimpleGrid
        alignItems="center"
        w={{ base: "full", xl: 11 / 12 }}
        columns={{ base: 1, lg: 11 }}
        gap={{ base: 0, lg: 24 }}
        mx="auto"
      >
        <GridItem
          colSpan={{ base: "auto", lg: 7 }}
          textAlign={{ base: "center", lg: "left" }}
        >
          <chakra.h1
            mb={4}
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            lineHeight={{ base: "shorter", md: "none" }}
            color={useColorModeValue("gray.900", "gray.200")}
            letterSpacing={{ base: "normal", md: "tight" }}
          >
            Ready to start your journey?
          </chakra.h1>
          <chakra.p
            mb={{ base: 10, md: 4 }}
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="thin"
            color="gray.500"
            letterSpacing="wider"
          >
            Low-latency voice and video feels like you’re in the same room. Wave
            hello over video, watch friends stream their games, or gather up and
            have a drawing session with screen share.
          </chakra.p>
        </GridItem>
        <GridItem colSpan={{ base: "auto", md: 4 }}>
          <Box as="form" mb={6} rounded="lg" shadow="xl">
            <Center pb={0} color={useColorModeValue("gray.700", "gray.600")}>
              <p pt={2}>Start talking now</p>
            </Center>
            <SimpleGrid
              columns={1}
              px={6}
              py={4}
              spacing={4}
              borderBottom="solid 1px"
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <Flex>
                <VisuallyHidden>First Name</VisuallyHidden>
                <Input
                   onChange={(event) => {setFirstName(event.target.value)}}
                  mt={0}
                  type="text"
                  placeholder="First Name"
                  required="true"
                />
              </Flex>
              <Flex>
                <VisuallyHidden>Last Name</VisuallyHidden>
                <Input
                  onChange={(event) => {setLastName(event.target.value)}}
                  mt={0}
                  type="text"
                  placeholder="Last Name"
                  required="true"
                />
              </Flex>
              <Flex>
                <VisuallyHidden>Email Address</VisuallyHidden>
                <Input
                  onChange={(event) => {setEmail(event.target.value)}}
                  mt={0}
                  type="email"
                  placeholder="Email Address"
                  required="true"
                />
              </Flex>
              <Flex>
                <VisuallyHidden>Password</VisuallyHidden>
                <Input
                  onChange={(event) => {setPassword(event.target.value)}}
                  mt={0}
                  type="password"
                  placeholder="Password"
                  required="true"
                />
              </Flex>
              <Flex>
                <VisuallyHidden>Confirm Password</VisuallyHidden>
                <Input
                  onChange={(event) =>setConfirmPassword(event.target.value)}
                  mt={0}
                  type="password"
                  placeholder="Confirm Password"
                  required="true"
                />
              </Flex>
              <Button colorScheme="brand" w="full" py={2} type="submit" bg='blueviolet' onSubmit={(e) => register(e)}  >
                Sign up for free
              </Button>
            </SimpleGrid>
          </Box>
          <chakra.p fontSize="xs" textAlign="center" color="gray.600">
            By signing up you agree to our{" "}
            <chakra.a color="brand.500">Terms of Service</chakra.a>
          </chakra.p>
        </GridItem>
      </SimpleGrid>
      </form>
    </Box>
  );
};

export default KuttyHero;