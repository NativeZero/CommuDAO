import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const taodumNFT = '0x2036186F6d5287FcB05C56C38374AC5236d8A61d'
const taomeme = '0xdbCCc9F8920e7274eeC62e695084D3bCe443c3dd'
const gear = '0xdCbe8EdAbCe8a19B201B09206536C34435ec3921'
const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const MechHarvestZone = ({ setisLoading, txupdate, setTxupdate, setisError, setErrMsg, erc20ABI, erc721ABI, gearFieldABI }) => {
    const { address } = useAccount()

    const [isTransferModal, setIsTransferModal] = React.useState(false)
    const [transferNftid, setTransferNftid] = React.useState(null)
    const [transferName, setTransferName] = React.useState("")
    const [transferTo, setTransferTo] = React.useState("")

    const [nft, setNft] = React.useState([])
    const [allDaily, setAllDaily] = React.useState("0.000")
    const [allReward, setAllReward] = React.useState("0.000")
    const [gearBalance, setGearBalance] = React.useState("0.000")

    const [tmBalance, setTmBalance] = React.useState("0.000")
    const [tmStakedBalance, setTmStakedBalance] = React.useState("0.000")
    const [inputTM, setInputTM] = React.useState('')

    const [gearTokenPending, setGearTokenPending] = React.useState("0.000")

    const transferToHandle = (event) => { setTransferTo(event.target.value) }
    const transferNFT = (_nftid) => {
        setIsTransferModal(true)
        setTransferNftid(_nftid)
        for (let i = 0; i <= nft.length - 1; i++) {
            if (nft[i].Id === Number(_nftid)) {
                setTransferName(nft[i].Name)
            }
        }
    }
    const transferNFTConfirm = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: taodumNFT,
                abi: erc721ABI,
                functionName: 'transferFrom',
                args: [address, transferTo, transferNftid],
            })
            const tx = await writeContract(config)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    React.useEffect(() => {
        window.scrollTo(0, 0)
        console.log("Connected to " + address)
        const taodumNFTSC = new ethers.Contract(taodumNFT, erc721ABI, providerJBC)
        setNft([])
        
        const thefetch = async () => {
            let nfts = []
            const stakeFilter = await taodumNFTSC.filters.Transfer(address, gear, null)
            const stakeEvent = await taodumNFTSC.queryFilter(stakeFilter, 2260250, "latest")
            const stakeMap = await Promise.all(stakeEvent.map(async (obj) => String(obj.args.tokenId)))
            const stakeRemoveDup = stakeMap.filter((obj, index) => stakeMap.indexOf(obj) === index)
            const data0 = address !== null && address !== undefined ? await readContracts({
                contracts: stakeRemoveDup.map((item) => (
                    {
                        address: gear,
                        abi: gearFieldABI,
                        functionName: 'nftStake',
                        args: [String(item)],
                    }
                ))
            }) : [Array(stakeRemoveDup.length).fill({tokenOwnerOf: ''})]

            let yournftstake = []
            for (let i = 0; i <= stakeRemoveDup.length - 1 && address !== null && address !== undefined; i++) {
                if (data0[i].tokenOwnerOf.toUpperCase() === address.toUpperCase()) {
                    yournftstake.push({Id: String(stakeRemoveDup[i])})
                }
            }
            console.log(yournftstake)

            const data1 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftstake.map((item) => (
                    {
                        address: taodumNFT,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftstake.length).fill('')]

            const data11 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftstake.map((item) => (
                    {
                        address: gear,
                        abi: gearFieldABI,
                        functionName: 'calculateRewards',
                        args: [String(item.Id), address, 1],
                    }
                ))
            }) : [Array(yournftstake.length).fill(0)]

            let _allDaily = 0
            let _allReward = 0
            for (let i = 0; i <= yournftstake.length - 1; i++) {
                const nftipfs = data1[i]
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"))
                    nft = await response.json()
                } catch {}

                let _reward = 0
                if (Number(yournftstake[i].Id.slice(0, 3)) >= 271) {
                    _reward = 100;
                } else if (Number(yournftstake[i].Id.slice(0, 3)) >= 146) {
                    _reward = 120;
                } else if (Number(yournftstake[i].Id.slice(0, 3)) >= 77) {
                    _reward = 150;
                } else if (Number(yournftstake[i].Id.slice(0, 3)) >= 23) {
                    _reward = 180;
                } else {
                    _reward = 250;
                }

                _allDaily += Number(ethers.utils.formatEther(String(_reward * 372756008454 * 8640000000000)))
                _allReward += Number(ethers.utils.formatEther(String(data11[i])))

                nfts.push({
                    Id: yournftstake[i].Id,
                    Name: nft.name + " [" + yournftstake[i].Id + "]",
                    Image: nft.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(ethers.utils.formatEther(String(_reward * 372756008454 * 8640000000000))),
                    isStaked: true,
                    Reward: String(data11[i]),
                })
            }

            const walletFilter = await taodumNFTSC.filters.Transfer(null, address, null)
            const walletEvent = await taodumNFTSC.queryFilter(walletFilter, 2725554, "latest")
            const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
            const walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            const data2 = address !== null && address !== undefined ? await readContracts({
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: taodumNFT,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: [String(item)],
                    }
                ))
            }) : [Array(walletRemoveDup.length).fill('')]

            let yournftwallet = []
            for (let i = 0; i <= walletRemoveDup.length - 1 && address !== null && address !== undefined; i++) {
                if (data2[i].toUpperCase() === address.toUpperCase()) {
                    yournftwallet.push({Id: String(walletRemoveDup[i])})
                }
            }
            console.log(yournftwallet)

            const data3 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftwallet.map((item) => (
                    {
                        address: taodumNFT,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftwallet.length).fill('')]

            for (let i = 0; i <= yournftwallet.length - 1; i++) {
                const nftipfs = data3[i]
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"))
                    nft = await response.json()
                } catch {}

                let _reward = 0
                if (Number(yournftstake[i].Id.slice(0, 3)) >= 271) {
                    _reward = 100;
                } else if (Number(yournftstake[i].Id.slice(0, 3)) >= 146) {
                    _reward = 120;
                } else if (Number(yournftstake[i].Id.slice(0, 3)) >= 77) {
                    _reward = 150;
                } else if (Number(yournftstake[i].Id.slice(0, 3)) >= 23) {
                    _reward = 180;
                } else {
                    _reward = 250;
                }

                nfts.push({
                    Id: yournftwallet[i].Id,
                    Name: nft.name + " [" + yournftwallet[i].Id + "]",
                    Image: nft.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(ethers.utils.formatEther(String(_reward * 372756008454 * 8640000000000))),
                    isStaked: false,
                    Reward: 0,
                })
            }

            if (nfts.length === 0) { nfts.push(null) }

            console.log(nfts)

            const dataToken = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: gear,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: taomeme,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: gear,
                        abi: gearFieldABI,
                        functionName: 'tokenStake',
                        args: [address],
                    },
                    {
                        address: gear,
                        abi: gearFieldABI,
                        functionName: 'calculateRewards',
                        args: [0, address, false],
                    },
                ],
            }) : [0, 0, 0, ]

            const vaBal = dataToken[0]
            const tmBal = dataToken[1]
            const tmStakeBal = dataToken[2].tokenAmount
            const gearTokenPend = dataToken[3] !== null ? dataToken[3] : 0

            let _reward2 = 0
            if (Number(ethers.utils.formatEther(String(tmStakeBal))) < 800000) {
                _reward2 = 0.15
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 800000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 900000) {
                _reward2 = 0.85
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 900000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 1000000) {
                _reward2 = 0.95
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 1000000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 1200000) {
                _reward2 = 1.00
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 1200000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 1300000) {
                _reward2 = 1.05
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 1300000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 1400000) {
                _reward2 = 1.10
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 1400000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 1500000) {
                _reward2 = 1.15
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 1500000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 2000000) {
                _reward2 = 1.20
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 2000000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 2100000) {
                _reward2 = 1.25
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 2100000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 2200000) {
                _reward2 = 1.30
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 2200000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 2300000) {
                _reward2 = 1.35
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 2300000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 3000000) {
                _reward2 = 1.50
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 3000000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 3100000) {
                _reward2 = 1.55
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 3100000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 3200000) {
                _reward2 = 1.60
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 3200000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 3300000) {
                _reward2 = 1.65
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 3300000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 5000000) {
                _reward2 = 1.80
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 5000000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 5100000) {
                _reward2 = 1.85
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 5100000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 5200000) {
                _reward2 = 1.90
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 5200000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 5300000) {
                _reward2 = 1.95
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 5300000) {
                _reward2 = 2.50
            }

            _allDaily += Number(ethers.utils.formatEther(String(_reward2 * 2314810000000 * 86400)))
            _allReward += Number(ethers.utils.formatEther(String(gearTokenPend)))

            return [nfts, _allDaily, _allReward, vaBal, tmBal, tmStakeBal, gearTokenPend, ]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            result[0].length > 0 && address !== undefined ? setNft(result[0]) : setNft([null])
            setAllDaily(result[1])
            setAllReward(result[2])
            setGearBalance(ethers.utils.formatEther(String(result[3])))
            setTmBalance(ethers.utils.formatEther(String(result[4])))
            setTmStakedBalance(ethers.utils.formatEther(String(result[5])))
            setGearTokenPending(ethers.utils.formatEther(String(result[6])))
        })

    }, [address, txupdate, erc20ABI, erc721ABI, gearFieldABI])

    const stakeNft = async (_nftid) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract({
                address: taodumNFT,
                abi: erc721ABI,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== gear.toUpperCase()) {
                const config = await prepareWriteContract({
                    address: taodumNFT,
                    abi: erc721ABI,
                    functionName: 'approve',
                    args: [gear, _nftid],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }        
            const config2 = await prepareWriteContract({
                address: gear,
                abi: gearFieldABI,
                functionName: 'stake',
                args: [_nftid, 1],
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }
    
    const unstakeNft = async (_nftid, _unstake) => {
        setisLoading(true)
        try {
            const config2 = await prepareWriteContract({
                address: gear,
                abi: gearFieldABI,
                functionName: 'unstake',
                args: [_nftid, 1, _unstake],
            })
            const tx2 = await writeContract(config2)
            await tx2.wait()
            setTxupdate(tx2)
        } catch {}
        setisLoading(false)
    }

    const staketoken = async () => {
        setisLoading(true)
        try {
            const allowed = await readContract({
                address: taomeme,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, gear],
            })
            if (Number(ethers.utils.parseEther(String(inputTM))) > Number(allowed)) {
                const config = await prepareWriteContract({
                    address: taomeme,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [gear, ethers.constants.MaxUint256],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const config2 = await prepareWriteContract({
                address: gear,
                abi: gearFieldABI,
                functionName: 'stake',
                args: [ethers.utils.parseEther(String(inputTM)), 0],
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }
    const unstaketoken = async (_unstake) => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: gear,
                abi: gearFieldABI,
                functionName: 'unstake',
                args: [0, 0, _unstake],
            })
            const tx = await writeContract(config)
            await tx.wait()
            setTxupdate(tx)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    return (
        <>
            {isTransferModal ?
                <div className="centermodal">
                    <div className="wrapper">
                        <div className="bold" style={{width: "500px", height: "250px", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around", fontSize: "40px", letterSpacing: "3px"}}>
                            <div style={{fontSize: "20px"}}>{transferName}</div>
                            <input style={{width: "80%", padding: "10px", fontSize: "20px"}} value={transferTo} onChange={transferToHandle} placeholder="Enter 0x..."></input>
                            <div className="button" style={{width: "50%"}} onClick={transferNFTConfirm}>TRANSFER</div>
                            <div className="button" style={{width: "50%", background: "gray"}} onClick={() => setIsTransferModal(false)}>CLOSE</div>
                        </div>
                    </div>
                </div> :
                <></>
            }
            <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left",  backgroundImage: "url('https://nftstorage.link/ipfs/bafybeidlzwhqtdrt4dnymhtf3v5vbhfwaczn6i3676iqr2aymrwbqbtw4m')", overflow: "scroll"}}>
                <div style={{flexDirection: "column", margin: "30px 100px", color: "#fff"}}>
                    <div className="pixel" style={{fontSize: "75px", width: "fit-content", padding: "0 10px"}}>Mech Harvest Zone</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "15px", padding: "0 10px"}} className="pixel">Stake TAODUM / TAOMEME to earn $Gear.</div>
                </div>
                <div style={{margin: "30px 100px"}}>
                    <img src="https://nftstorage.link/ipfs/bafybeiegwsyuqu5d47hobxpnuj5zdsy2fgzautcobr6imm3soc4r6uibg4" width="150" alt="$GEAR"/>
                </div>
            </div>

            <div style={{margin: "0", paddingTop: "40px", minHeight: "fit-content", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "14px", flexFlow: "row wrap"}} className="collection pixel">
                <div style={{width: "95%", minHeight: "120px", height: "fit-content", margin: "10px", padding: "20px", fontSize: "10px", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap"}} className="nftCard">
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>TAODUM ON WALLET</div>
                        <div style={{fontSize: "24px"}} className="emp">{nft.length > 0 && nft[0] !== null ? nft.length : 0}</div>
                    </div>
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>TOTAL DAILY REWARD</div>
                        <div style={{fontSize: "24px", display: "flex"}} className="emp">
                            {Number(allDaily) > 0 ? allDaily.toFixed(3) : 0}
                            <img style={{marginLeft: "10px"}} src="https://nftstorage.link/ipfs/bafybeiegwsyuqu5d47hobxpnuj5zdsy2fgzautcobr6imm3soc4r6uibg4" width="26" alt="$GEAR"/>
                        </div>
                    </div>
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>TOTAL PENDING REWARD</div>
                        <div style={{fontSize: "24px", display: "flex"}}>
                            {Number(allReward) > 0 ? allReward.toFixed(3) : 0}
                            <img style={{marginLeft: "10px"}} src="https://nftstorage.link/ipfs/bafybeiegwsyuqu5d47hobxpnuj5zdsy2fgzautcobr6imm3soc4r6uibg4" width="26" alt="$GEAR"/>
                        </div>
                    </div>
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>GEAR BALANCE</div>
                        <div style={{fontSize: "24px", display: "flex"}}>
                            {Number(gearBalance) > 0 ? gearBalance.toFixed(3) : 0}
                            <img style={{marginLeft: "10px"}} src="https://nftstorage.link/ipfs/bafybeiegwsyuqu5d47hobxpnuj5zdsy2fgzautcobr6imm3soc4r6uibg4" width="26" alt="$GEAR"/>
                        </div>
                    </div>
                </div>

                <div style={{width: "95%", borderBottom: "1px solid #dddade", margin: "40px 10px 10px 10px"}}></div>
                <div style={{width: "95%", margin: "20px 10px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px", textAlign: "left"}} className="bold">TAOMEME STAKING</div>
                <div style={{marginBottom: "80px", width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", flexWrap: "wrap"}}>
                    <div className="nftCard" style={{position: "relative", margin: "10px", padding: "30px 20px", justifyContent: "space-around", fontSize: "14px"}}>
                        <div style={{position: "absolute", top: 15, right: 15, padding: "7px 20px", letterSpacing: 1, background: "transparent", border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="bold">
                            Multiplier&nbsp; 
                            {tmStakedBalance < 800000 && 'x0.15'}
                            {tmStakedBalance >= 800000 && tmStakedBalance < 900000 && 'x0.85'}
                            {tmStakedBalance >= 900000 && tmStakedBalance < 1000000 && 'x0.95'}
                            {tmStakedBalance >= 1000000 && tmStakedBalance < 1200000 && 'x1.00'}
                            {tmStakedBalance >= 1200000 && tmStakedBalance < 1300000 && 'x1.05'}
                            {tmStakedBalance >= 1300000 && tmStakedBalance < 1400000 && 'x1.10'}
                            {tmStakedBalance >= 1400000 && tmStakedBalance < 1500000 && 'x1.15'}
                            {tmStakedBalance >= 1500000 && tmStakedBalance < 2000000 && 'x1.20'}
                            {tmStakedBalance >= 2000000 && tmStakedBalance < 2100000 && 'x1.25'}
                            {tmStakedBalance >= 2100000 && tmStakedBalance < 2200000 && 'x1.30'}
                            {tmStakedBalance >= 2200000 && tmStakedBalance < 2300000 && 'x1.35'}
                            {tmStakedBalance >= 2300000 && tmStakedBalance < 3000000 && 'x1.50'}
                            {tmStakedBalance >= 3000000 && tmStakedBalance < 3100000 && 'x1.55'}
                            {tmStakedBalance >= 3100000 && tmStakedBalance < 3200000 && 'x1.60'}
                            {tmStakedBalance >= 3200000 && tmStakedBalance < 3300000 && 'x1.65'}
                            {tmStakedBalance >= 3300000 && tmStakedBalance < 5000000 && 'x1.80'}
                            {tmStakedBalance >= 5000000 && tmStakedBalance < 5100000 && 'x1.85'}
                            {tmStakedBalance >= 5100000 && tmStakedBalance < 5200000 && 'x1.90'}
                            {tmStakedBalance >= 5200000 && tmStakedBalance < 5300000 && 'x1.95'}
                            {tmStakedBalance >= 5300000 && 'x2.50'}
                        </div>
                        <div style={{marginTop: "50px", width: "100%", display: "flex", justifyContent: "space-between"}}>
                            <div>Required JTAO for Next Level of Multiplier:</div>
                            <div className="bold">
                                {tmStakedBalance < 800000 && '800,000'}
                                {tmStakedBalance >= 800000 && tmStakedBalance < 900000 && '900,000'}
                                {tmStakedBalance >= 900000 && tmStakedBalance < 1000000 && '1,000,000'}
                                {tmStakedBalance >= 1000000 && tmStakedBalance < 1200000 && '1,200,000'}
                                {tmStakedBalance >= 1200000 && tmStakedBalance < 1300000 && '1,300,000'}
                                {tmStakedBalance >= 1300000 && tmStakedBalance < 1400000 && '1,400,000'}
                                {tmStakedBalance >= 1400000 && tmStakedBalance < 1500000 && '1,500,000'}
                                {tmStakedBalance >= 1500000 && tmStakedBalance < 2000000 && '2,000,000'}
                                {tmStakedBalance >= 2000000 && tmStakedBalance < 2100000 && '2,100,000'}
                                {tmStakedBalance >= 2100000 && tmStakedBalance < 2200000 && '2,200,000'}
                                {tmStakedBalance >= 2200000 && tmStakedBalance < 2300000 && '2,300,000'}
                                {tmStakedBalance >= 2300000 && tmStakedBalance < 3000000 && '3,000,000'}
                                {tmStakedBalance >= 3000000 && tmStakedBalance < 3100000 && '3,100,000'}
                                {tmStakedBalance >= 3100000 && tmStakedBalance < 3200000 && '3,200,000'}
                                {tmStakedBalance >= 3200000 && tmStakedBalance < 3300000 && '3,300,000'}
                                {tmStakedBalance >= 3300000 && tmStakedBalance < 5000000 && '5,000,000'}
                                {tmStakedBalance >= 5000000 && tmStakedBalance < 5100000 && '5,100,000'}
                                {tmStakedBalance >= 5100000 && tmStakedBalance < 5200000 && '5,200,000'}
                                {tmStakedBalance >= 5200000 && tmStakedBalance < 5300000 && '5,300,000'}
                                {tmStakedBalance >= 5300000 && 'MAX'}
                            </div>
                        </div>
                        <div style={{width: 300, padding: 20, border: "1px solid #dddade", borderRadius: 12, display: "flex", flexDirection: "row", alignItem: "center", justifyContent: "space-between"}}>
                            <div style={{lineHeight: 1.5, fontSize: "12px", textAlign: "left"}}>
                                Pending Rewards<br></br>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <img src="https://nftstorage.link/ipfs/bafybeiegwsyuqu5d47hobxpnuj5zdsy2fgzautcobr6imm3soc4r6uibg4" width="12" alt="$GEAR"/>
                                    &nbsp;{gearTokenPending}
                                </div>
                            </div>
                            {tmStakedBalance !== 0 ?
                                <div style={{lineHeight: 2}} className="button"  onClick={() => unstaketoken(false)}>HARVEST</div> :
                                <div style={{lineHeight: 2, background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST</div>
                            }
                        </div>
                        <div style={{width: "90%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #dddade", padding: "15px"}}>
                            <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px", textAlign: "left", fontSize: "14px"}}>
                                <div>$JTAO STAKED</div>
                                <div className="bold" style={{cursor: "pointer"}}>{tmStakedBalance}</div>
                            </div>
                            <div style={{width: "100%", display: "flex", justifyContent: "flex-end", marginBottom: "7.5px"}}>
                                <div style={{letterSpacing: "1px", width: "70px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => unstaketoken(true)}>Unstake</div>
                            </div>
                        </div>
                        <div style={{width: "90%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #dddade", padding: "15px"}}>
                            <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px", textAlign: "left", fontSize: "14px"}}>
                                <div>$JTAO BALANCE</div>
                                <div className="bold" style={{cursor: "pointer"}} onClick={() => setInputTM(tmBalance)}>{tmBalance}</div>
                            </div>
                            <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                                <input
                                    placeholder="0.0"
                                    style={{width: "170px", padding: "5px 20px", border: "1px solid #dddade"}}
                                    value={inputTM}
                                    onChange={(event) => setInputTM(event.target.value)}
                                />
                                <div style={{letterSpacing: "1px", width: "50px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={staketoken}>Stake</div>
                            </div>
                        </div>
                    </div>
                    <div className="nftCard" style={{margin: "10px", padding: "30px 20px", justifyContent: "space-around", fontSize: "18px"}}>
                        <div>TAOMEME PFP is coming soon!</div>
                        <div style={{width: "250px", height: "250px", borderRadius: "16px", border: "1px solid gray"}}></div>
                        <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}></div>
                        {false &&
                        <>
                        <div>TAOMEME PFP N1</div>
                        <img src='https://nftstorage.link/ipfs/bafybeibvvcappbfq4pw7hvtdwsaageoelga5vwpco3qffcrwzzsk2wxoau' width="250" alt="Can not load metadata." />
                        <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <div className="button" style={{fontSize: "14px"}}>MINT [8,888 JTAO]</div>
                            <div style={{alignSelf: "center", background: "gray", fontSize: "14px"}} className="button">UP RARITY</div>
                        </div>
                        </>
                        }
                    </div>
                </div>

                <div style={{width: "95%", borderBottom: "1px solid #dddade", margin: "40px 10px 10px 10px"}}></div>
                <div style={{width: "95%", margin: "20px 10px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px", textAlign: "left"}} className="bold">TAODUM STAKING</div>
                <div style={{marginBottom: "80px", width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", flexWrap: "wrap"}}>
                    {nft.length > 0 ?
                        <>
                        {nft[0] !== null ?
                            <>
                            {nft.map((item, index) => (
                                <div className="nftCard" style={{margin: "10px", padding: "30px 20px", justifyContent: "space-around", fontSize: "14px"}} key={index}>
                                    <img src={item.Image} width="150" alt="Can not load metadata." />
                                    <div>{item.Name}</div>
                                    <div style={{width: 300, display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                        {item.isStaked ?
                                            <>
                                                <div style={{background: "rgb(239, 194, 35)", width: 16, height: 16, borderRadius: "50%", marginRight: 7}}></div>
                                                <div style={{color: "black"}}>On Staking</div>
                                            </> :
                                            <>
                                                <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, borderRadius: "50%", marginRight: 7}}></div>
                                                <div style={{color: "black"}}>Available for stake</div>
                                            </>
                                        }
                                    </div>
                                    <div>
                                        Earn: {Number(item.RewardPerSec).toFixed(4)}
                                        &nbsp;
                                        <img src="https://nftstorage.link/ipfs/bafybeiegwsyuqu5d47hobxpnuj5zdsy2fgzautcobr6imm3soc4r6uibg4" width="12" alt="$GEAR"/>
                                        &nbsp;GEAR/DAY
                                    </div>
                                    <div style={{width: 300, padding: 20, border: "1px solid #dddade", borderRadius: 12, display: "flex", flexDirection: "row", alignItem: "center", justifyContent: "space-between"}}>
                                        <div style={{lineHeight: 1.5, fontSize: "12px", textAlign: "left"}}>
                                            Pending Rewards<br></br>
                                            <div style={{display: "flex", alignItems: "center"}}>
                                                <img src="https://nftstorage.link/ipfs/bafybeiegwsyuqu5d47hobxpnuj5zdsy2fgzautcobr6imm3soc4r6uibg4" width="12" alt="$GEAR"/>
                                                &nbsp;{ethers.utils.formatEther(String(item.Reward))}
                                            </div>
                                        </div>
                                        {item.Reward > 0 ?
                                            <div style={{lineHeight: 2}} className="button" onClick={() => {unstakeNft(item.Id, false)}}>HARVEST</div> :
                                            <div style={{lineHeight: 2, background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST</div>
                                        }
                                    </div>
                                    {item.isStaked ?
                                        <div style={{background: "gray"}} className="button" onClick={() => {unstakeNft(item.Id, true)}}>UNSTAKE</div> :
                                        <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                            <div className="button" onClick={() => {stakeNft(item.Id)}}>STAKE</div>
                                            <div style={{alignSelf: "center", background: "gray"}} className="button" onClick={() => transferNFT(item.Id)}>TRANSFER</div>
                                        </div>
                                    }
                                </div>
                            ))}
                            </> :
                            <div className="nftCard" style={{margin: "10px", padding: "30px 20px", justifyContent: "center"}}>
                                {address !== undefined ?
                                    <>
                                        <img src="https://l3img.b-cdn.net/ipfs/QmUmf3MEZg99qqLJ6GsewESVum8sm72gfH3wyiVPZGH6HA" width="150" alt="No_NFTs" />
                                        <div style={{marginTop: "30px"}} className="bold">This wallet doesn't have NFTs.</div>
                                    </> :
                                    <>
                                        <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-sign-in"></i>
                                        <div className="bold">Please connect wallet to view your NFTs.</div>
                                    </>
                                }
                            </div>
                        }
                        </> :
                        <div className="nftCard" style={{margin: "10px", padding: "30px 20px", justifyContent: "center"}}>
                            <ThreeDots fill="#5f6476" />
                            <div className="bold" style={{marginTop: "80px"}}>Loading NFTs...</div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default MechHarvestZone