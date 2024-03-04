// import React, { useContext, useEffect } from 'react';
// import Preloader from '../components/preloader';
// import { ethers, BrowserProvider } from "ethers";
// import { EthersAdapter, SafeFactory } from "@safe-global/protocol-kit";
// import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constant";
// import { GlobalContext } from '../contexts/globalcontext';
// import { useNavigate } from 'react-router-dom';

// const AccounValidate = () => {
//     const { toast, account } = useContext(GlobalContext);
//     const provider = new BrowserProvider(account.safeAuthPack.getProvider());
//     const navigate = useNavigate();
//     useEffect(() => {
//         ; (async () => {
//             if (!isMounted.current) {
//                 isMounted.current = true;
//                 if (account.isAuthenticated == false) {
//                     navigate('/')
//                     return;
//                 }
//                 account.safeAuthPack.signIn().then(resp => {
//                     // setUsession(resp);
//                     console.log(resp)
//                 })
//                 //check if the user has safe wallets
//                 if (account.safes.length == 0) {
//                     setView('safe-new')
//                     console.log(usession)
//                     return;
//                 }
//                 setView('kyc')
//                 const user = await account.safeAuthPack.getUserInfo();
//                 console.log(user.email)
//                 // const txn = await Tx.contract.mailToWallet(user.email);
//                 // console.log(Tx.contract)
//                 // console.log(txn)

//                 const txsigner = await provider.getSigner();
//                 const contract = new ethers.Contract(CONTRACT_ADDRESS, JSON.parse(JSON.stringify(CONTRACT_ABI)), txsigner);
//                 // Read message from smart contract
//                 const message = await contract.mailToWallet(user.email);
//                 // console.log(message)
//                 if (message == "0x0000000000000000000000000000000000000000") {
//                     setView('kyc')
//                 } else {
//                     navigate('/dashboard')
//                 }
//             }
//         })();
//     }, [])
//     return (
//         <div>
//             <Preloader text={"Please wait"} />
//         </div>
//     );
// };

// export default AccounValidate;