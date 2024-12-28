import React from 'react'
import {
  Box,
  Flex,
  VStack,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Text,
  DrawerOverlay,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { Routes, Route, Link } from 'react-router-dom'
import { HamburgerIcon } from '@chakra-ui/icons'
import { FiHome, FiFileText, FiTag, FiFolder, FiImage, FiLogOut } from 'react-icons/fi'
import { auth } from '../../config/firebase'
import { signOut } from 'firebase/auth'

// Placeholder components (to be created later)
const Overview = () => <Box>Visão Geral</Box>
const Articles = () => <Box>Artigos</Box>
const Categories = () => <Box>Categorias</Box>
const Tags = () => <Box>Tags</Box>
const MediaLibrary = () => <Box>Biblioteca de Mídia</Box>

const menuItems = [
  { icon: FiHome, label: 'Visão Geral', path: '/admin/dashboard' },
  { icon: FiFileText, label: 'Artigos', path: '/admin/articles' },
  { icon: FiFolder, label: 'Categorias', path: '/admin/categories' },
  { icon: FiTag, label: 'Tags', path: '/admin/tags' },
  { icon: FiImage, label: 'Biblioteca de Mídia', path: '/admin/media' },
]

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  const Sidebar = () => (
    <VStack spacing={4} align="stretch" p={4}>
      {menuItems.map((item) => (
        <Link key={item.path} to={item.path}>
          <Flex
            align="center"
            p={3}
            borderRadius="md"
            _hover={{ bg: 'gray.100' }}
            cursor="pointer"
          >
            <Box as={item.icon} mr={3} />
            <Text>{item.label}</Text>
          </Flex>
        </Link>
      ))}
      <Flex
        align="center"
        p={3}
        borderRadius="md"
        _hover={{ bg: 'gray.100' }}
        cursor="pointer"
        onClick={handleLogout}
      >
        <Box as={FiLogOut} mr={3} />
        <Text>Sair</Text>
      </Flex>
    </VStack>
  )

  return (
    <Box minH="100vh">
      {/* Header Mobile */}
      <Flex
        bg="white"
        p={4}
        display={{ base: 'flex', md: 'none' }}
        borderBottomWidth={1}
      >
        <IconButton
          aria-label="Menu"
          icon={<HamburgerIcon />}
          onClick={onOpen}
        />
      </Flex>

      {/* Sidebar Mobile */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Sidebar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Layout Desktop */}
      <Flex>
        {/* Sidebar Desktop */}
        <Box
          w="250px"
          bg="white"
          h="100vh"
          position="fixed"
          display={{ base: 'none', md: 'block' }}
          borderRightWidth={1}
        >
          <Sidebar />
        </Box>

        {/* Content */}
        <Box
          flex={1}
          ml={{ base: 0, md: '250px' }}
          p={6}
        >
          <Routes>
            <Route path="/dashboard" element={<Overview />} />
            <Route path="/articles/*" element={<Articles />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/media" element={<MediaLibrary />} />
          </Routes>
        </Box>
      </Flex>
    </Box>
  )
} 