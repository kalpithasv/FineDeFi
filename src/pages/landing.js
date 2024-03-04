import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import heroAbstractSvg from '../assets/hero.svg';
import ellipse from '../assets/ellipse.png';
import { SafeAuthPack } from "@safe-global/auth-kit";
import { ethers, BrowserProvider } from "ethers";
import { EthersAdapter, SafeFactory } from "@safe-global/protocol-kit";
import { GlobalContext } from '../contexts/globalcontext';


const LandingPage = () => {
    const { account, toast } = useContext(GlobalContext);
    const [loading, setLoading] = useState(true);
    const [btnView, setBtnView] = useState('login');
    const navigate = useNavigate();
    const provider = new BrowserProvider(account.safeAuthPack.getProvider());
    useEffect(() => {
        if (account.isAuthenticated == true) {
            // navigate('/dashboard');
            if(account.safes.length == 0){
                setBtnView('new-wallet')
            } else {
                navigate('/markets');
            }
            console.log(account.safes);
            console.log(account);
        } else {
            if (account.isAuthenticated == false) {
                setLoading(false)
            }
        }
    }, [account.isAuthenticated])

    const loginWeb3Auth = useCallback(async () => {
        if (!account.safeAuthPack) return

        try {
            const { safes, eoa } = await account.safeAuthPack.signIn()
            const provider = account.safeAuthPack.getProvider()

            // we set react state with the provided values: owner (eoa address), chain, safes owned & web3 provider
            // setChainId(chain.id)
            account.setOwnerAddress(eoa)
            account.setSafes(safes || [])
            account.setWeb3Provider(new ethers.BrowserProvider(provider))
            account.setIsAuthenticated(true)

        } catch (error) {
            console.log('error: ', error)
        }
    }, [])

    const createSafe = async () => {
        if (account.safes.length < 1) {
            console.log("Creating Safe...")
            setLoading(true)
            try {
                //create safe wallet
                const signer = await provider.getSigner();
                const ethAdapter = new EthersAdapter({
                    ethers,
                    signerOrProvider: signer,
                });
                const safeFactory = await SafeFactory.create({ ethAdapter });
                const safe = await safeFactory.deploySafe({
                    safeAccountConfig: { threshold: 1, owners: [ account.ownerAddress ] },
                });
                const newSafe = await safe.getAddress();
                account.setSafes([...account.safes, newSafe])
                console.log("SAFE Created!", account.safes);
                // setView('kyc')
                navigate('/dashboard')
                toast.success("Safe Wallet created successfully")
            } catch (error) {
                console.log(error)
                toast.error("Error creating Safe Wallet")
                setBtnView('new-wallet')
                return;
            }
        }
    }

    return (
        <div className='text-white font-[Inter] relative h-screen'>
            {/* Navbar start */}
            <div className='my-6 mx-10 flex items-center justify-between'>
                <div className='w-full'>SecureLend</div>
                <div className='w-full hidden md:flex items-center justify-center gap-x-4 uppercase'>
                    <Link className='hover:underline underline-offset-4'>Home</Link>
                    <Link className='hover:underline underline-offset-4'>About us</Link>
                </div>
                <div className='w-full flex justify-end'>
                    <button className='bg-white lg:text-base text-sm font-[Poppins] font-semibold rounded-full text-black px-6 py-2'>
                        Connect Wallet
                    </button>
                </div>
            </div>
            {/* Navbar end */}

            <div className='items-center my-28 flex justify-center flex-col'>
                <div className='lg:w-[50%] w-[80%] text-center font-[Poppins]'>
                    <h1 className='text-[#7F00FE] lg:leading-[50px] leading-[30px] font-semibold text-xl lg:text-4xl'>Experience the future of decentralized finance with SecureLend</h1>
                    <p className='my-8'>Manage , borrow and lend funds seamlessly</p>
                </div>
                <div>
                    {
                        btnView == 'login' && <button disabled={loading} onClick={loginWeb3Auth} className='bg-white font-[Poppins] font-semibold rounded-full text-black px-6 py-2'>
                            {
                                loading == true ? "Please wait" : 'Sign in with Gmail'
                            }
                        </button> || btnView == 'new-wallet' && <button disabled={loading} onClick={createSafe} className='bg-white font-[Poppins] font-semibold rounded-full text-black px-6 py-2'>
                            {
                                loading == true ? "Please wait" : 'Create a new safe wallet'
                            }
                        </button>
                    }
                </div>
                    {
                        account.isAuthenticated && <div className='my-3'>
                            <p className='text-center'>
                                <b>EOA:</b> {account.ownerAddress || '-'}
                            </p>
                        </div>
                    }
            </div>
            <img src={heroAbstractSvg} alt='hero' className='w-full lg:block hidden absolute bottom-0 h-64' />
            <img src={ellipse} alt='ellipse' className='w-1/2 absolute bottom-16 left-10 -z-20' />
        </div>
    );
};

export default LandingPage;