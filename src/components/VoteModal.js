import React, {useState, useEffect} from 'react';
import {Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	Box,
	Text,
	VStack, 
	RadioGroup,
	Radio,
	FormLabel, 
	ModalFooter, 
	ModalCloseButton,
	Button,
  useToast,
} from "@chakra-ui/react";
import { getCandidates } from "../utils";

const VoteModal = ({isOpen, onClose, category, roles}) => {
	const [loading, setLoading] = useState(false);
	const [candidates, setCandidates] = useState([])
	const [choice, setChoice] = useState("")
  const toast = useToast();
	const submitVote = () => {
		onClose()
		console.log("!")
	}

  const parseContestants = (names, addr, category) => {
    if(names.length===0){
      setCandidates([])
    } else{
      let newArr = []
      for(let i=0; i<names.length; i++){
        let obj = {
          name:names[i],
          addr: addr[i],
          category:category[i]
        }
        newArr.push(obj)
      }
      setCandidates(newArr)
    }
  }

	useEffect(()=>{
		//console.log("open")
		getCandidates(window.ethereum).then( r => parseContestants(r[0], r[1], r[2]))
		.catch(e => toast({
                title:"Sorry",
                description:"An error occured while trying to fetch election contestants",
                status:"error",
                duration: 5000,
                isClosable:true
            }))
	}, [])

    return (
        <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>

          <ModalHeader>
            Cast your vote here
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box>
              <Text> Select one candidate of your choice for each role </Text>

              <FormLabel as="view">Select one candidate of your choice for each role</FormLabel>
              <RadioGroup value={choice} mb={4} >
                <VStack spacing="15px">

     
                </VStack>
              </RadioGroup>
              <ModalFooter>
                
                <Button 
                    colorScheme="orange" 
                    mr={3} 
                    onClick={submitVote}
                    isLoading={loading ? true : false}>
                  Submit
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
	) 
};

export default VoteModal;
