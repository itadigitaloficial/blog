import React from 'react';
import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Tag,
  useColorModeValue,
} from '@chakra-ui/react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

interface Article {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  category: string;
  tags: string[];
  createdAt: string;
  excerpt: string;
}

async function fetchArticles() {
  const articlesRef = collection(db, 'articles');
  const q = query(articlesRef, orderBy('createdAt', 'desc'), limit(10));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Article[];
}

export default function Home() {
  const { data: articles = [], isLoading, error } = useQuery({
    queryKey: ['articles'],
    queryFn: fetchArticles
  });

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={10}>
        <Text>Carregando artigos...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={10}>
        <Text color="red.500">Erro ao carregar os artigos.</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center" mb={8}>
          Blog ITA Digital
        </Heading>

        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
          gap={8}
        >
          {articles.map((article) => (
            <Link to={`/article/${article.id}`} key={article.id}>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                bg={bgColor}
                borderColor={borderColor}
                transition="all 0.3s"
                _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
              >
                <Image
                  src={article.imageUrl || 'https://via.placeholder.com/400x250'}
                  alt={article.title}
                  width="100%"
                  height="250px"
                  objectFit="cover"
                />
                <VStack p={6} spacing={3} align="stretch">
                  <Heading as="h2" size="lg">
                    {article.title}
                  </Heading>
                  <Text color="gray.600" noOfLines={3}>
                    {article.excerpt}
                  </Text>
                  <HStack spacing={2}>
                    <Tag colorScheme="blue">{article.category}</Tag>
                    {article.tags?.slice(0, 2).map((tag) => (
                      <Tag key={tag} colorScheme="gray">
                        {tag}
                      </Tag>
                    ))}
                  </HStack>
                  <Text fontSize="sm" color="gray.500">
                    {new Date(article.createdAt).toLocaleDateString('pt-BR')}
                  </Text>
                </VStack>
              </Box>
            </Link>
          ))}
        </Grid>

        {articles.length === 0 && (
          <Box textAlign="center" py={10}>
            <Text fontSize="lg">Nenhum artigo publicado ainda.</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
} 