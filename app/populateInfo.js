import MultiSig from './artifacts/contracts/MultiSig.sol/MultiSig.json';
import {address} from './__config';
import {ethers} from 'ethers';
import "./info.css";

const provider = new ethers.providers.Web3Provider(web3.currentProvider);
const contract = new ethers.Contract(address, MultiSig.abi, provider);

export default async function populateInfo() {
  const required = await contract.required();
  const owners = await contract.getOwners();
  const balance = await provider.getBalance(address);
  document.getElementById('address').innerHTML = address;
  document.getElementById('owners').innerHTML = owners.join(", ");
  document.getElementById('balance').innerHTML = balance;
  document.getElementById('confirmations').innerHTML = required;
}
