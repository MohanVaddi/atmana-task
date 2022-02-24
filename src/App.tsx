import React, { useEffect, useRef, useState } from 'react';

import './App.css';
import axios from 'axios';

import {
    Container,
    VStack,
    Flex,
    Grid,
    GridItem,
    Button,
    Box,
    Text,
    Heading,
} from '@chakra-ui/react';

function App() {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [joke, setJoke] = useState('');

    const btnRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(
                'https://api.chucknorris.io/jokes/categories'
            );
            setCategories(response.data);
        };
        getData();
    }, []);

    const getJokeHandler = (e: any) => {
        const category = e.target.value;
        getJoke(category);
    };

    const getJoke = async (category: string) => {
        const response = await axios.get(
            `https://api.chucknorris.io/jokes/random?category=${category}`
        );
        setCategory(category);
        setJoke(response.data.value);
    };

    return (
        <Container
            w='full'
            maxW='container.md'
            h='100vh'
            pt={20}
            px={{ base: 6, md: 10, lg: 0 }}>
            <Flex w='full' alignItems='center' justifyContent='center'>
                <VStack
                    h='full'
                    w='full'
                    alignItems={'flex-start'}
                    spacing={{ base: 6, md: 10 }}>
                    <Heading fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}>
                        Chuck Norris
                    </Heading>
                    <Box
                        w={'full'}
                        h='full'
                        bgColor={'#d2d2d4'}
                        borderWidth='1px'
                        rounded='lg'
                        shadow='lg'
                        alignContent={'center'}
                        textAlign='center'
                        py={{ base: 2, md: 4, lg: 6 }}>
                        <Grid w='full' templateColumns={'repeat(4,1fr)'}>
                            {categories.map((item, idx) => {
                                return (
                                    <GridItem
                                        key={idx}
                                        p={{ base: 2, md: 4, lg: 4 }}>
                                        <Button
                                            textTransform={'capitalize'}
                                            bgColor={'white'}
                                            w={{
                                                base: '80px',
                                                md: '100px',
                                                lg: '120px',
                                            }}
                                            id={item}
                                            value={item}
                                            onClick={getJokeHandler}>
                                            {item}
                                        </Button>
                                    </GridItem>
                                );
                            })}
                        </Grid>
                    </Box>
                    {joke !== '' && (
                        <VStack
                            h='full'
                            w='full'
                            alignItems={'center'}
                            spacing={4}>
                            <Text
                                textTransform={'capitalize'}
                                fontSize={{ lg: 'xl' }}
                                fontWeight='600'>
                                Selected Category: {category}
                            </Text>
                            <Box
                                w='full'
                                bg={'white'}
                                borderWidth='1px'
                                rounded='lg'
                                shadow='lg'
                                bgColor={'#3395ff'}
                                alignItems={'center'}
                                textAlign='center'>
                                <Grid
                                    w='full'
                                    templateColumns={'repeat(1,1fr)'}>
                                    <GridItem py={{ base: 16, md: 20, lg: 24 }}>
                                        <Text
                                            px={{ base: 2, md: 4, lg: 6 }}
                                            py={{ base: 10, md: 2, lg: 2 }}
                                            color={'white'}
                                            fontSize={{
                                                base: 'md',
                                                md: 'xl',
                                                lg: '2xl',
                                            }}
                                            w='full'>
                                            {joke}
                                        </Text>
                                    </GridItem>
                                </Grid>
                            </Box>
                            <Button
                                w='full'
                                colorScheme={'blue'}
                                variant={'outline'}
                                onClick={() => {
                                    getJoke(category);
                                }}>
                                New Joke
                            </Button>
                        </VStack>
                    )}
                </VStack>
            </Flex>
        </Container>
    );
}

export default App;
