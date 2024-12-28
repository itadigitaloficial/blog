import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';
import { setupAdminUser } from '../../services/adminSetup';
import { useNavigate } from 'react-router-dom';

export default function AdminSetup() {
  const [email] = useState('rogerio@itadigital.com.br');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await setupAdminUser(email, password);

      if (result.success) {
        toast({
          title: 'Administrador criado com sucesso!',
          description: 'Você já pode fazer login com suas credenciais.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/admin/login');
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast({
        title: 'Erro ao criar administrador',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.sm" py={10}>
      <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <VStack spacing={6}>
          <Heading size="lg">Configuração Inicial</Heading>
          <Text>Configure a senha do administrador para o email: {email}</Text>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite uma senha forte"
                />
              </FormControl>

              <Button
                colorScheme="blue"
                width="full"
                type="submit"
                isLoading={isLoading}
              >
                Criar Administrador
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Container>
  );
} 