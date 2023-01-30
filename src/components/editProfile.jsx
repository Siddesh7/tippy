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
} from "@chakra-ui/react";
import axios from "axios";
import { useRef, useState } from "react";
import { useAccount } from "wagmi";

export default function EditProfile() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const [formData, setFormData] = useState({ twitter: "", wallet: "" });

  const { address } = useAccount();

  function getUser() {
    axios
      .get(`${process.env.REACT_APP_URL}user`, {
        params: {
          wallet: address,
        },
      })
      .then((response) => {
        setFormData(response.data[0]);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Button
        className="text-black"
        onClick={() => {
          onOpen();
          getUser();
        }}
      >
        Edit Profile
      </Button>
      {console.log(formData)}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Twitter Username </FormLabel>{" "}
              <Input
                ref={initialRef}
                placeholder="Twitter Username"
                onChange={(e) => {
                  setFormData({ ...formData, twitter: e.target.value });
                }}
                value={formData.twitter}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Wallet</FormLabel>

              <Input
                placeholder="wallet"
                onChange={(e) => {
                  setFormData({ ...formData, wallet: e.target.value });
                }}
                value={formData.wallet}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              save
            </Button>

            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
