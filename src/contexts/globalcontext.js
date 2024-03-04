import { SafeAuthPack } from "@safe-global/auth-kit";
import { BrowserProvider, ethers } from "ethers";
import { createContext, useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constant";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    const [safeAuthPack, setSafeAuthPack] = useState(new SafeAuthPack());
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [chainId, setChainId] = useState(0);
    const [ownerAddress, setOwnerAddress] = useState("");
    const [web3Provider, setWeb3Provider] = useState(new ethers.BrowserProvider());
    const [chain, setChain] = useState({ id: 0, name: "Ethereum Sepolia", network: "", explorer: "", rpc: "", })
    const [safes, setSafes] = useState([]);
    const isMounted = useRef(false);

    const safeAuthInitOptions = {
        // enableLogging: true,
        showWidgetButton: false, // Set to true to show the SafeAuth widget button
        chainConfig: {
            blockExplorerUrl: "https://etherscan.io", // The block explorer URL
            chainId: "0xaa36a7", // The chain ID
            displayName: "Ethereum Sepolia", // The chain name
            rpcTarget: "https://rpc.ankr.com/eth_sepolia", // The RPC target
            ticker: "ETH", // The chain ticker
            tickerName: "Ethereum", // The chain ticker name
        },
    };

    const account = {
        safeAuthPack, setSafeAuthPack,
        isAuthenticated, setIsAuthenticated,
        safes, setSafes,
        chain, setChain,
        chainId, setChainId,
        ownerAddress, setOwnerAddress,
        web3Provider, setWeb3Provider,
    };
    const provider = new BrowserProvider(account.safeAuthPack.getProvider());
    const signer = async () => await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, JSON.parse(JSON.stringify(CONTRACT_ABI)), signer);

    const Tx = {
        signer, contract, provider
    }
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            account.safeAuthPack.init(safeAuthInitOptions).then(r => {
                account.safeAuthPack.subscribe('accountsChanged', async (accounts) => {
                    if (accounts.length > 0) {
                        const { safes, eoa } = await account.safeAuthPack.signIn()
                        const provider = account.safeAuthPack.getProvider()

                        // we set react state with the provided values: owner (eoa address), chain, safes owned & web3 provider
                        setChainId(chain.id)
                        setOwnerAddress(eoa)
                        account.setSafes(safes || [])
                        if (provider) {
                            setWeb3Provider(new ethers.BrowserProvider(provider))
                        }
                        account.setIsAuthenticated(true)
                    }
                })
            });
        }
    }, [])

    return (
        <GlobalContext.Provider value={{ toast, account, Tx }}>
            <div className="text-white">
                {children}
                <Toaster />
            </div>
        </GlobalContext.Provider>
    );
};

export { GlobalContext, GlobalContextProvider };