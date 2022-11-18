import {
  Button,
  Container,
  Heading,
  VStack,
  Text,
  HStack,
  Image,
} from "@chakra-ui/react";
import {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PublicKey } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Metaplex,
  walletAdapterIdentity,
  CandyMachineV2,
} from "@metaplex-foundation/js";
import { useRouter } from "next/router";

const Connected: FC = () => {
  const { connection } = useConnection();
  const walletAdapter = useWallet();
  const [candyMachine, setCandyMachine] = useState<CandyMachineV2>();
  const [isMinting, setIsMinting] = useState(false);

  const metaplex = useMemo(() => {
    return Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter));
  }, [connection, walletAdapter]);

  useEffect(() => {
    if (!metaplex) return;

    metaplex
      .candyMachinesV2()
      .findByAddress({
        address: new PublicKey("ASDQkVhEDJeiraBUfgbDo2xPkr1ja5HJQtx5rh7eLhD5"),
      })
      .then((candyMachine) => {
        console.log(candyMachine);
        setCandyMachine(candyMachine);
      })
      .catch((error) => {
        alert(error);
      });
  }, [metaplex]);

  const router = useRouter();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      if (event.defaultPrevented) return;

      if (!walletAdapter.connected || !candyMachine) {
        return;
      }

      try {
        setIsMinting(true);
        const nft = await metaplex.candyMachinesV2().mint({ candyMachine });
        console.log(nft);
        router.push(`/newMint?mint=${nft.nft.address.toBase58()}`);
      } catch (error) {
        alert(error);
      } finally {
        setIsMinting(false);
      }
    },
    [metaplex, walletAdapter, candyMachine]
  );

  return (
    <VStack spacing={20}>
      <Container>
        <VStack spacing={8}>
          <Heading
            color="white"
            as="h1"
            size="2xl"
            noOfLines={1}
            textAlign="center"
          >
            Welcome Wizard.
          </Heading>

          <Text color="bodyText" fontSize="xl" textAlign="center">
            Each SOL Wizard is randomly generated and can be staked to receive
            <Text as="b"> $WIZ</Text>. Use your <Text as="b"> $WIZ</Text> to
            upgrade your wizard and receive perks within the community!
          </Text>
        </VStack>
      </Container>

      <HStack spacing={10}>
        <Image width={"100px"} height={"100px"} src="images/0.png" alt="" />
        <Image width={"100px"} height={"100px"} src="images/1.png" alt="" />
        <Image width={"100px"} height={"100px"} src="images/2.png" alt="" />
        <Image width={"100px"} height={"100px"} src="images/3.png" alt="" />
        <Image width={"100px"} height={"100px"} src="images/4.png" alt="" />
      </HStack>

      <Button
        bgColor="accent"
        color="white"
        maxW="380px"
        onClick={handleClick}
        isLoading={isMinting}
      >
        <Text>Mint sol wiz</Text>
      </Button>
    </VStack>
  );
};

export default Connected;
