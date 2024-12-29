import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Tag,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useQuery } from '@tanstack/react-query';

interface Article {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  category: string;
  tags: string[];
  createdAt: string;
  author: {
    name: string;
    avatar?: string;
  };
}

async function fetchArticle(id: string) {
  const docRef = doc(db, 'articles', id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    throw new Error('Artigo não encontrado');
  }

  return {
    id: docSnap.id,
    ...docSnap.data()
  } as Article;
}

export default function ArticleDetail() {
  const { id = '' } = useParams();
  const { data: article, isLoading, error } = useQuery({
    queryKey: ['article', id],
    queryFn: () => fetchArticle(id)
  });

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  if (isLoading) {
    return (
      <Container maxW="container.md" py={10}>
        <Text>Carregando artigo...</Text>
      </Container>
    );
  }

  if (error || !article) {
    return (
      <Container maxW="container.md" py={10}>
        <Text color="red.500">Erro ao carregar o artigo.</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          bg={bgColor}
          borderColor={borderColor}
        >
          <Image
            src={article.imageUrl || 'https://via.placeholder.com/1200x600'}
            alt={article.title}
            width="100%"
            height="400px"
            objectFit="cover"
          />
          
          <Box p={8}>
            <VStack spacing={4} align="stretch">
              <Heading as="h1" size="2xl">
                {article.title}
              </Heading>

              <HStack spacing={2}>
                <Tag colorScheme="blue" size="lg">
                  {article.category}
                </Tag>
                {article.tags?.map((tag) => (
                  <Tag key={tag} colorScheme="gray" size="lg">
                    {tag}
                  </Tag>
                ))}
              </HStack>

              <HStack spacing={4}>
                {article.author?.avatar && (
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    borderRadius="full"
                    boxSize="40px"
                  />
                )}
                <VStack spacing={0} align="start">
                  <Text fontWeight="bold">{article.author?.name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {new Date(article.createdAt).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </Text>
                </VStack>
              </HStack>

              <Divider />

              <Box
                className="article-content"
                dangerouslySetInnerHTML={{ __html: article.content }}
                sx={{
                  'h2': {
                    fontSize: '2xl',
                    fontWeight: 'bold',
                    mt: 8,
                    mb: 4
                  },
                  'p': {
                    mb: 4,
                    lineHeight: 'tall'
                  },
                  'img': {
                    my: 6,
                    borderRadius: 'md'
                  }
                }}
              />
            </VStack>
          </Box>
        </Box>
      </VStack>
    </Container>
  );
} 