import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  CircularProgress,
  InputRightElement,
  InputGroup,
  Alert,
  AlertIcon,
  useAccordion,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef, useState } from "react";
import { useAccount, useProvider, useSigner } from "wagmi";
import { createNewFlow } from "../utilities";

export default function InitialFocus() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searching, setSearching] = useState(false);
  const initialRef = useRef(null);
  const [formData, setFormData] = useState({ user: "", tip: 0 });
  const [data, setData] = useState(null);
  const { address } = useAccount();
  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner();
  function handleUser() {
    setSearching(true);
    console.log({ medium: "twitter", twitter: formData.user });
    axios
      .get(`${process.env.REACT_APP_URL}user`, {
        params: {
          medium: "twitter",
          user: formData.user,
        },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        setSearching(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Twitter Username </FormLabel>{" "}
              <InputGroup size="sm">
                <Input
                  ref={initialRef}
                  placeholder="Twitter Username"
                  onChange={(e) => {
                    setFormData({ ...formData, user: e.target.value });
                  }}
                  value={formData.user}
                />
                <InputRightElement width="4.5rem">
                  {!searching ? (
                    <Button
                      h="1.75rem"
                      size="sm"
                      bg={"green"}
                      color="white"
                      onClick={handleUser}
                    >
                      Search
                    </Button>
                  ) : (
                    <CircularProgress
                      size={"20px"}
                      isIndeterminate
                      color="green.300"
                    />
                  )}
                </InputRightElement>{" "}
              </InputGroup>
            </FormControl>
            {data !== null && data.length == 0 ? (
              <Alert status="warning">
                <AlertIcon />
                Seems your this user hasn't verified their wallet
              </Alert>
            ) : (
              <Alert status="success">
                <AlertIcon />
                This user has signed up!
              </Alert>
            )}
            <FormControl mt={4}>
              <FormLabel>$xUSDC to tip per month</FormLabel>
              {data !== null && data.length !== 0 ? (
                <Input
                  placeholder="USDC tip/mo"
                  onChange={(e) => {
                    setFormData({ ...formData, tip: e.target.value });
                  }}
                  value={formData.tip}
                />
              ) : (
                <Input
                  disabled
                  placeholder="USDC tip/mo"
                  onChange={(e) => {
                    setFormData({ ...formData, tip: e.target.value });
                  }}
                  value={formData.tip}
                />
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            {data !== null && data.length != 0 ? (
              <Button
                colorScheme="blue"
                mr={3}
                disabled
                onClick={() => {
                  createNewFlow(data[0].wallet, formData.tip, provider, signer);
                  console.log(data[0].wallet, formData.tip);
                }}
              >
                Create
              </Button>
            ) : (
              <CircularProgress
                size={"20px"}
                isIndeterminate
                color="green.300"
              />
            )}
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
