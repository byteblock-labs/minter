import React,{ useState} from 'react'
import {Box, ChakraProvider,Input, Button, FormLabel,Progress,Text } from '@chakra-ui/react'

import { useSelector} from '../../reducer';
import { connectWallet} from '../../reducer/async/wallet';
import { useDispatch } from '../../reducer';

const SecondaryMint = () => {
    const [qty,setQty] = useState(1);
    const { system} = useSelector(s => s);
    const [address, setAddress] = useState("");
    const dispatch = useDispatch();
    const [iscorrectaddress, setCorrect] = useState(false);
    const [mintedToken, setMintedToken] = useState(0);
    const [totalToken, setTotalToken] = useState(100);
    const [price, setPrice] = useState(0);
    // const address = "KT1Vx2WKCVQamsTvSxabqZoBe267oJeXkcvt";

    const onInput = (e: any) => {
        if(e.target.name==="qty"){
            setQty(e.target.value);
        }else{
            setAddress(e.target.value);
        }
        
    }
    const isCorrectAddress = async (e:any) =>{
        if(e.target.value.length===36 && e.target.value[0]==='K' && e.target.value[1]==='T'){
            const testmint = `https://api.tzkt.io/v1/contracts/${e.target.value}/storage`
            const headers = { 'Content-Type': 'application/json', 'method': 'GET' }
            await fetch(testmint,{headers})
            .then((response) =>response.json())
            .then((data)=>{
                setPrice(parseInt(data.sale.price)/1000000);
                setMintedToken(data.sale.soldAmount);
                setTotalToken(data.sale.saleSupply);
                setCorrect(true)
            })
            .catch((err) => console.error(err));
        }else{
            setCorrect(false)
        }
    }
    const MintTest = async (e:any) =>{

        if(address.length!==36 || address[0]!=='K' ||address[1]!=='T'){
            alert("Please enter correct address");
        }else{
            if(system.status === 'WalletConnected'){
            const contract = await system.toolkit.wallet.at(address);
            await contract.methods
                .mint(qty)
                .send({amount:qty*price});
            }else{
                e.preventDefault();
                dispatch(connectWallet());
            }  
        }  
    }
    return(
        <ChakraProvider >
            <Box w="100%" h="100vh" bg="#FFDEE9" bgGradient= "linear-gradient(to right, #0f0c29, #302b63, #24243e)" color="#FFFFFF">
                <Box w={{base: '70%', md: '60%', lg: '40%'}} top={{base: '30%', md: '10%', lg: '30%'}} left={{base: '15%', md: '20%', lg: '30%'}} pos="absolute">
                    <FormLabel >Contract Adress</FormLabel>
                    <Input mb="5" type="string" name="address" value={address} onChange={(e)=>{onInput(e);isCorrectAddress(e)}}/>
                    {(iscorrectaddress)?
                    <Box mb="5">
                        <FormLabel > Unit Token Price </FormLabel>
                        <Text mb="5">{price+" "}tz</Text>
                        <FormLabel >{mintedToken+'/'+totalToken}</FormLabel>
                        <Progress  value={mintedToken*100/totalToken} />
                    </Box>
                    :null
                    }
                    <FormLabel >Unit</FormLabel>
                    <Input mb="5" type="number" name="qty" value={qty} onChange={e=>onInput(e)}/>
                    <Box w="20%" m="auto" mt={{ base: '1', md: '3', lg: '5' }} color="black">
                        <Button onClick={(e)=>MintTest(e)} > Mint </Button>
                    </Box>
                </Box>
            </Box>
        </ChakraProvider>
    )

}

export default SecondaryMint