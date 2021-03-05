import setupEvents from './setupEvents';
import MultiSig from './artifacts/contracts/MultiSig.sol/MultiSig.json';
import {address} from './__config';
import {ethers} from 'ethers';
import "./index.css";

setupEvents();

async function newTransaction() {
  const provider = new ethers.providers.Web3Provider(ethereum);
  await ethereum.request({ method: 'eth_requestAccounts' });

  const signer = provider.getSigner();
  const contract = new ethers.Contract(address, MultiSig.abi, signer);
  const destination = document.getElementById("destination").value;
  const wei = document.getElementById("wei").value;
  await contract.submitTransaction(destination, wei, "0x");
}

document.getElementById("deploy").addEventListener("click", newTransaction);
