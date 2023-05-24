import Head from 'next/head';
import Web3Modal from 'web3modal';
import { useState, useEffect, useRef } from 'react';
import { providers, Contract } from 'ethers';
import { WHITELIST_CONTRACT_ADDY, abi } from '../../constants';

export default function Home() {
	const [walletConnected, setWalletConnected] = useState(false);
	const [joinedWhitelist, setJoinedWhitelist] = useState(false);
	const [loading, setLoading] = useState(false);
	const [numWhitelisted, setNumWhitelisted] = useState(0);

	// To persist wallet login while on page
	const web3ModalRef = useRef();

	// Helper function that returns an ETH RPC object with or without signing privileges
	// Read-access only (without signing privileges) is the default
	const getProviderOrSigner = async (needSigner = false) => {
		const provider = await web3ModalRef.current.connect();
		const web3Provider = new providers.Web3Provider(provider);

		// If user not on correct network (Goerli)
		const { chainId } = await web3Provider.getNetwork();
		if (chainId !== 5) {
			window.alert('Please change your network to Goerli');
			throw new Error('Please change your network to Goerli');
		}

		if (needSigner) {
			const signer = web3Provider.getSigner();
			return signer;
		}

		return web3Provider;
	};

	// Functions
	const addAddressToWhitelist = async () => {
		try {
			// Need a signer for a write txn
			const signer = await getProviderOrSigner(true);
			const whitelistContract = new Contract(
				WHITELIST_CONTRACT_ADDY,
				abi,
				signer
			);

			const txn = await whitelistContract.addAddressToWhitelist();
			setLoading(true);

			// Wait for txn to get mined
			await txn.wait();
			setLoading(false);

			await getNumberOfWhitelisted();
			setJoinedWhitelist(true);
		} catch (err) {
			console.error(err);
		}
	};

	const getNumberOfWhitelisted = async () => {
		try {
			// Just need provider to make a read txn
			const provider = await getProviderOrSigner();
			const whitelistContract = new Contract(
				WHITELIST_CONTRACT_ADDY,
				abi,
				provider
			);

			const _numWhitelisted = await whitelistContract.numAddressesWhitelisted();
			setNumWhitelisted(_numWhitelisted);
		} catch (err) {
			console.error(err);
		}
	};

	// Checks if address is in whitelist
	const checkIfAddressInWhiteList = async () => {
		try {
			// Need signer to get address
			const signer = await getProviderOrSigner(true);
			const whitelistContract = new Contract(
				WHITELIST_CONTRACT_ADDY,
				abi,
				signer
			);

			const address = await signer.getAddress();
			const _joinedWhitelist = await whitelistContract.whitelistedAddresses(
				address
			);
			setJoinedWhitelist(_joinedWhitelist);
		} catch (err) {
			console.error(err);
		}
	};

	// Connects a MetaMask wallet
	const connectWallet = async () => {
		try {
			await getProviderOrSigner();
			setWalletConnected(true);

			checkIfAddressInWhiteList();
			getNumberOfWhitelisted();
		} catch (err) {
			console.error(err);
		}
	};

	// TODO: Clean up messy branch logic
	// Conditionally renders a button based on web app's current state
	const renderBtn = () => {
		if (walletConnected) {
			if (joinedWhitelist) {
				return (
					<div>
						You have joined the whitelist! Keep an eye out for future updates!
					</div>
				);
			} else if (loading) {
				return <button>Loading, hang tight!</button>;
			} else {
				return (
					<button onClick={addAddressToWhitelist}>Join The Whitelist!</button>
				);
			}
		} else {
			return <button onClick={connectWallet}>Connect Your Wallet</button>;
		}
	};

	// Assigns MetaMask instance to ref if no connected wallet on render
	useEffect(() => {
		if (!walletConnected) {
			web3ModalRef.current = new Web3Modal({
				network: 'goerli',
				providerOptions: {},
				disableInjectedProvider: false,
			});
			connectWallet();
		}
	}, [walletConnected]);

	return (
		<div>
			<Head>
				<title></title>
				<meta name='description' content='whitelist-site' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div>
				<div>
					<h1></h1>
					<div></div>
					<div>{numWhitelisted} have already joined the whitelist!</div>
					{renderBtn()}
				</div>
				<div>
					<img />
				</div>
			</div>

			<footer>Made by Ford Pickert </footer>
		</div>
	);
}
