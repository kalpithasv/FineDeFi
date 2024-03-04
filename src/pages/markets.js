import React, { useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from '../contexts/globalcontext';
import { Link, useNavigate } from 'react-router-dom';
import { trimWalletAddress } from '../functions/fn';
import Preloader from '../components/preloader';
import { MdOutlineCheck, MdOutlineClose } from 'react-icons/md';

const MarketsPage = () => {
    const { account, toast } = useContext(GlobalContext);
    const isMounted = useRef(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            setLoading(false)
        }
    }, [])
    const assets = [
        {
            image: 'https://app.aave.com/icons/tokens/eth.svg',
            name: 'Ethereum',
            ticker: 'ETH',
            supply: '615.06K',
            supplyAPY: '1.43%',
            borrow: '425.59K',
            borrowAPY: '2.45%'
        },
        {
            image: 'https://app.aave.com/icons/tokens/usdc.svg',
            name: 'USD Coin',
            ticker: 'USDC',
            supply: '596.63M',
            supplyAPY: '4.93%',
            borrow: '534.53M',
            borrowAPY: '6.15%'
        },

    ];
    return (
        <div>
            {loading && <Preloader />
                || <div>
                    {/* Navbar start */}
                    <div className='my-6 mx-10 flex items-center justify-between'>
                        <div className='w-full'>SecureLend</div>
                        <div className='w-full flex justify-end'>
                            <button className='bg-white lg:text-base text-sm font-[Poppins] font-semibold rounded-full text-black px-6 py-2'>
                                {
                                    account.isAuthenticated && <>{trimWalletAddress(account?.safes[0] || "")}</>
                                    || <Link to='/'>Get Started</Link>
                                }
                            </button>
                        </div>
                    </div>
                    {/* Navbar end */}
                    <div className='lg:mx-12 mx-4'>
                        <div className='flex flex-col gap-y-3'>
                            <div className='grid grid-cols-12 gap-x-1 text-sm text-[#FFFFFF99]'>
                                <div className='col-span-2'>Assets</div>
                                <div className='col-span-3'>Token Supply</div>
                                <div className='col-span-2'>Supply APYI</div>
                                <div className='col-span-2'>Total Borrow</div>
                                <div className='col-span-2'>Borrow API, Variable</div>
                                <div className='col-span-1'></div>
                            </div>
                            {/* <div className='grid grid-cols-12 gap-x-1 border-[#ffffff4d] border-[1px] px-4 py-3 rounded-lg'>
                                <div className='col-span-2'>1</div>
                                <div className='col-span-3'>0x873247A...</div>
                                <div className='col-span-2'>9ETH</div>
                                <div className='col-span-2'>768</div>
                                <div className='col-span-2'>
                                    <div className='flex items-center h-full gap-x-5 w-full justify-between'>
                                        <MdOutlineCheck className='text-lg cursor-pointer text-[#00DC72]' />
                                        <MdOutlineClose className='text-lg cursor-pointer text-[#E10606]' />
                                    </div>
                                </div>
                                <div className='col-span-1'>768</div>
                            </div> */}
                            {
                                assets.map((asset, index) => ({
                                    ...asset,
                                    id: index
                                })).map((asset, index) => (
                                    <div key={index} className='grid grid-cols-12 gap-x-1 border-[#ffffff4d] border-[1px] px-4 py-3 rounded-lg'>
                                        <div className='col-span-2'>
                                            <div className='flex items-center gap-x-3'>
                                                <img src={asset.image} alt="" className='w-6 h-6' />
                                                <div className='flex flex-col'>
                                                    <p>{asset.name}</p>
                                                    <span className='text-sm font-semibold text-gray-500'>{asset.ticker}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-span-3 flex items-center'>{asset.supply}</div>
                                        <div className='col-span-2 flex items-center'>{asset.supplyAPY}</div>
                                        <div className='col-span-2 flex items-center'>{asset.borrow}</div>
                                        <div className='col-span-2 flex items-center'>{asset.borrowAPY}</div>
                                        <div className='col-span-1'>
                                            <div className='flex items-center h-full gap-x-5 w-full justify-between'>
                                                <button onClick={e => navigate('/dashboard')} className='cursor-pointer bg-white text-black px-2 py-1 text-sm rounded-md'>Borrow</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default MarketsPage;