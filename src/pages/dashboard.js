import { DatePicker, Input, Progress, Select } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { MdOutlineCheck, MdOutlineClose } from "react-icons/md";
import { GlobalContext } from '../contexts/globalcontext';
import { useNavigate } from 'react-router-dom';
import Preloader from '../components/preloader';
import { trimWalletAddress } from '../functions/fn';
import { AnonAadhaarProof, AnonAadhaarProvider, LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react";
import { ethers, BrowserProvider } from "ethers";
import Safe, { EthersAdapter, SafeFactory, PredictedSafeProps } from "@safe-global/protocol-kit";
import { CONTRACT_ABI, CONTRACT_ABI_2, CONTRACT_ADDRESS } from "../constant";
import dayjs from 'dayjs';
import { formatEther, parseEther, parseGwei } from "viem";
const Dashboard = () => {
    const { account, toast } = useContext(GlobalContext);
    const isMounted = useRef(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [anonAadhaar] = useAnonAadhaar();
    const [loanAmount, setLoanAmount] = useState('');
    const [collateralAmount, setCollateralAmount] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [usession, setUsession] = useState({});
    const provider = new BrowserProvider(account.safeAuthPack.getProvider());
    const [btnDisabled, setBtnDisabled] = useState(false);
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            if (account.isAuthenticated == false) {
                navigate('/')
                return;
            } else {
                setLoading(false)
            }
        }
    }, [])
    const creditScoreChartColors = {
        '0%': '#ec0000',
        '30%': '#d7c70e',
        '100%': '#04db00'
    }
    useEffect(() => {
        ; (async () => {
            console.log("Anon Aadhaar status: ", anonAadhaar.status);
            var ldata = JSON.parse(localStorage.getItem("anonAadhaar") || "{}");
            console.log(ldata);
        })()
    }, [anonAadhaar])

    const handleBorrowFormSubmit = async (e) => {
        e.preventDefault();
        //validate
        if (loanAmount == '' || collateralAmount == '' || dueDate == '') {
            toast.error("Please fill all the fields");
            return;
        }
        const loanAmountInWei = parseEther(loanAmount);
        const collateralAmountInWei = parseEther(collateralAmount);
        //convert date to unix timestamp
        const dueDateUnix = dayjs(dueDate).unix();
        console.log(loanAmountInWei, collateralAmountInWei, dueDateUnix);
        // return;
        // const user = await account.safeAuthPack.getUserInfo();
        setBtnDisabled(true);
        const txsigner = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, JSON.parse(JSON.stringify(CONTRACT_ABI_2)), txsigner);
        const ethAdapter = new EthersAdapter({
            ethers,
            // signer: txsigner,
            signerOrProvider: txsigner || provider,
        });

        const protocolKit = await Safe.create({
            ethAdapter,
            safeAddress: account.safes[0],
        })


        // const safeFactory = await SafeFactory.create({ ethAdapter });
        // const owner = account.ownerAddress;
        // const safe = await safeFactory.deploySafe({ owner, 1 });

        // const safeTransaction = await safe.createTransaction({
        //     to: '0xTargetContractAddress',
        //     value: '0x0',
        //     data: '0xTransactionData',
        //     operation: 0,
        //     safeTxGas: 100000,
        //     baseGas: 10000,
        //     gasPrice: 10000000000,
        //     gasToken: '0x0',
        //     nonce: 0,
        //     chainId: await ethAdapter.getChainId(),
        // });
        try {
            const encodedFunction = ethers.encodeBytes32String('sendEther(address, uint256)');
            const encodedParam = ethers.AbiCoder.defaultAbiCoder().encode(['address', 'uint256'], [account.ownerAddress, loanAmountInWei]);
            const transactionata = ethers.concat([encodedFunction, encodedParam]);
            const safeTransactionData = {
                to: `${CONTRACT_ADDRESS}`,
                data: transactionata,
                value: '0x0',
            }
            const safeTransaction = await protocolKit.createTransaction({
                transactions: [safeTransactionData],
            });
            await protocolKit.signTypedData(safeTransaction)
            console.log(await protocolKit.executeTransaction(safeTransaction));
        } catch (e) {
            // console.log(e);
        }
        setBtnDisabled(false);
        toast.success("Transaction sent!");
        //clear form
        setLoanAmount('');
        setCollateralAmount('');
        setDueDate('');
        //clear console
        console.clear();
    }
    return (
        <div className='text-white font-[Poppins]'>
            {
                loading && <Preloader />
                || <div>
                    {/* Navbar start */}
                    <div className='my-6 mx-10 flex items-center justify-between'>
                        <div className='w-full'>SecureLend</div>
                        <div className='w-full flex justify-end'>
                            <button className='bg-white lg:text-base text-sm font-[Poppins] font-semibold rounded-full text-black px-6 py-2'>
                                {trimWalletAddress(account?.safes[0] || "")}
                            </button>
                        </div>
                    </div>
                    {/* Navbar end */}
                    <div className='flex items-center justify-center w-full mb-11'>
                        <div className='lg:w-[50%] lg:mx-0 mx-4 space-y-10'>
                            <div className='flex flex-col lg:flex-row items-center gap-x-6 w-full'>
                                <div className='w-full'>
                                    <h1 className='text-sm font-semibold'>Liquidity Pool</h1>
                                    <div className='my-2 border-[1px] rounded-xl px-24 py-14 border-[#ffffff4d]'>
                                        <p className='text-3xl text-center font-[Poppins] text-[#00D1FF]'>$98,467.21</p>
                                    </div>
                                </div>
                                <div className="w-full lg:w-auto">
                                    <h1 className='text-sm font-semibold'>Credit Score</h1>
                                    <div className='w-full flex items-center justify-center my-2 border-[1px] rounded-xl px-16  py-4 border-[#ffffff4d]'>
                                        <Progress format={percent => 0} type='dashboard' percent={(2 / 100) * 100} strokeWidth={10} strokeColor={creditScoreChartColors} />
                                    </div>
                                </div>
                            </div>
                            {anonAadhaar?.status === "logged-in" && (<div className='w-full'>
                                <h1 className='text-sm font-semibold'>Borrow</h1>
                                <div className='my-2 border-[1px] rounded-xl p-8 border-[#ffffff4d]'>
                                    <form className='flex flex-col gap-y-6' onSubmit={handleBorrowFormSubmit}>
                                        <div className='flex flex-col gap-y-1'>
                                            <label htmlFor='amount' className='text-xs'>Loan Amount</label>
                                            <Input value={loanAmount} onChange={e => setLoanAmount(e.target.value)} id='amount' placeholder='Ex: 0.1 ETH' />
                                        </div>
                                        <div className='flex flex-col gap-y-1'>
                                            <label htmlFor='amount' className='text-xs'>Collateral Amount</label>
                                            <Input value={collateralAmount} onChange={e => setCollateralAmount(e.target.value)} id='amount' placeholder='Ex: 0.1 ETH' />
                                        </div>
                                        <div className='flex flex-col gap-y-1'>
                                            <label htmlFor='amount' className='text-xs'>Repayment Due-date</label>
                                            <DatePicker value={
                                                dueDate ? dayjs(dueDate) : undefined
                                            } id='amount' onChange={e => {
                                                setDueDate(e?.format('YYYY-MM-DD'))
                                            }} placeholder='Select a date' />
                                        </div>
                                        <div className='w-full flex'>
                                            <button disabled={btnDisabled} className='bg-[#141414] w-full py-2 text-sm rounded-md uppercase text-[#C9C9C999]'>
                                                {btnDisabled ? "Please wait" : "Request"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            )}
                            <div className='w-full'>
                                <h1 className='text-sm font-semibold'>Get your Aadhar Verified</h1>
                                <div className='my-2 border-[1px] rounded-xl p-8 border-[#ffffff4d]'>
                                    <form className='flex flex-col gap-y-6' onSubmit={e => e.preventDefault()}>
                                        {anonAadhaar?.status !== "logged-in" && <div className="my-7 w-full flex flex-col gap-y-1 items-center justify-center">
                                            <p className='text-sm text-center'>Verification of Aadhar is mandatory</p>
                                            <LogInWithAnonAadhaar />
                                        </div>}
                                        {anonAadhaar?.status === "logged-in" && (
                                            <>
                                                <p>✅ Aadhaar verified</p>
                                                <AnonAadhaarProof code={JSON.stringify(anonAadhaar.pcd, null, 2)} />
                                            </>
                                        )}
                                    </form>
                                </div>
                            </div>
                            {/* <div className='w-full'>
                                <div className='flex flex-col gap-y-3'>
                                    <div className='grid grid-cols-12 gap-x-1 text-sm text-[#FFFFFF99]'>
                                        <div className='col-span-2'>SI No.</div>
                                        <div className='col-span-4'>Address</div>
                                        <div className='col-span-2'>Token</div>
                                        <div className='col-span-3'>Credit Score</div>
                                        <div className='col-span-1'></div>
                                    </div>
                                    <div className='grid grid-cols-12 gap-x-1 border-[#ffffff4d] border-[1px] px-4 py-3 rounded-lg'>
                                        <div className='col-span-2'>1</div>
                                        <div className='col-span-4'>0x873247A...</div>
                                        <div className='col-span-2'>9ETH</div>
                                        <div className='col-span-3'>768</div>
                                        <div className='col-span-1'>
                                            <div className='flex items-center h-full gap-x-5 w-full justify-between'>
                                                <MdOutlineCheck className='text-lg cursor-pointer text-[#00DC72]' />
                                                <MdOutlineClose className='text-lg cursor-pointer text-[#E10606]' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-12 gap-x-1 border-[#ffffff4d] border-[1px] px-4 py-3 rounded-lg'>
                                        <div className='col-span-2'>2</div>
                                        <div className='col-span-4'>0x873247A...</div>
                                        <div className='col-span-2'>9ETH</div>
                                        <div className='col-span-3'>768</div>
                                        <div className='col-span-1'>
                                            <div className='flex items-center h-full gap-x-5 w-full justify-between'>
                                                <MdOutlineCheck className='text-lg cursor-pointer text-[#00DC72]' />
                                                <MdOutlineClose className='text-lg cursor-pointer text-[#E10606]' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Dashboard;