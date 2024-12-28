import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Heading,
  Container,
  Text,
  Link as ChakraLink
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { useNavigate } from 'react-router-dom'

interface LoginForm {
  email: string
  password: string
}

export default function UserLogin() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<LoginForm>()
  const toast = useToast()
  const navigate = useNavigate()

  const onSubmit = async (data: LoginForm) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      navigate('/dashboard')
    } catch (error) {
      toast({
        title: 'Erro ao fazer login',
        description: 'Verifique suas credenciais e tente novamente',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Container maxW="container.sm" py={10}>
      <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <VStack spacing={4} align="stretch">
          <Heading textAlign="center" mb={6}>Login</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  {...register('email')}
                  placeholder="seu@email.com"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  {...register('password')}
                  placeholder="********"
                />
              </FormControl>
              <Button
                colorScheme="blue"
                width="full"
                type="submit"
                isLoading={isSubmitting}
              >
                Entrar
              </Button>
            </VStack>
          </form>
          <Text textAlign="center" mt={4}>
            Área administrativa?{' '}
            <ChakraLink as={Link} to="/admin/login" color="blue.500">
              Clique aqui
            </ChakraLink>
          </Text>
        </VStack>
      </Box>
    </Container>
  )
} 