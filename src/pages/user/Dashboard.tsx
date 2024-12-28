import React from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  useToast
} from '@chakra-ui/react'
import { auth } from '../../config/firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function UserDashboard() {
  const toast = useToast()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/login')
    } catch (error) {
      toast({
        title: 'Erro ao fazer logout',
        description: 'Tente novamente mais tarde',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={6} align="stretch">
        <Heading>Painel do Usuário</Heading>
        
        <Box p={6} borderWidth={1} borderRadius="lg">
          <VStack spacing={4} align="stretch">
            <Text fontSize="lg">Bem-vindo ao seu painel!</Text>
            <Text>Email: {auth.currentUser?.email}</Text>
            
            <Button colorScheme="red" onClick={handleLogout}>
              Sair
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
} 