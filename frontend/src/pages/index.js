import Head from 'next/head';
import Web3Modal from 'web3modal';
import { useState, useEffect, useRef } from 'react';
import { providers, Contract } from 'ethers';

export default function Home() {
	const [walletConnected, setWalletConnected] = useState(false);
	const [joinedWhitelist, setJoinedWhitelist] = useState(false);
	const [loading, setLoading] = useState(false);
	const [numWhitelisted, setNumWhitelisted] = useState(0);

	// To persist wallet login while on page
	const web3ModalRef = useRef();

	return <div></div>;
}
