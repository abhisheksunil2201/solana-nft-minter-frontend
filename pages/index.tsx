import { Box, calc, Center, Spacer, Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Disconnected from "../components/Disconnected";
import NavBar from "../components/Navbar";
import { useWallet } from "@solana/wallet-adapter-react";
import Connected from "../components/Connected";

const Home: NextPage = () => {
  const { connected } = useWallet();

  return (
    <div className={styles.container}>
      <Head>
        <title>Wizards</title>
        <meta name="The NFT Collection for Solana Wizards" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        w="full"
        h={connected ? "" : "calc(100vh)"}
        bgImage={"url(images/home-background.svg)"}
        backgroundPosition="center"
      >
        <Stack w="full" h={connected ? "" : "calc(100vh)"} justify="center">
          <NavBar />

          <Spacer />
          <Center>{connected ? <Connected /> : <Disconnected />}</Center>
          <Spacer />

          <Center>
            <Box marginBottom={4} color="white">
              <a
                href="https://twitter.com/iamabhi2201"
                target="_blank"
                rel="noopener noreferrer"
              >
                built by @iamabhi2201
              </a>
            </Box>
          </Center>
        </Stack>
      </Box>
    </div>
  );
};

export default Home;
