import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Heading,
  Container
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../config/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

interface LoginForm {
  email: string
  password: string
}

export default function AdminLogin() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<LoginForm>()
  const toast = useToast()
  const navigate = useNavigate()

  const onSubmit = async (data: LoginForm) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
      const userData = userDoc.data()

      if (userData?.role !== 'admin') {
        throw new Error('Acesso não autorizado')
      }

      navigate('/admin/dashboard')
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
          <Heading textAlign="center" mb={6}>Login Administrativo</Heading>
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
        </VStack>
      </Box>
    </Container>
  )
} 