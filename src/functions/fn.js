const cn = (...args) => args.filter(Boolean).join(" ");

const trimWalletAddress = (walletAddress) => {
    return walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4);
}

export { cn, trimWalletAddress };