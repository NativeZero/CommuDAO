import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const cmdaonft = '0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A'
const narutanft = '0x5E620D8980335167d9eF36cEf5d9A6Ea6607a8Cb'
const bbnft = '0xc304195Ad2F55810EcD1e63d9D975e29138Dbd4E'
const doijibToken = '0x7414e2D8Fb8466AfA4F85A240c57CB8615901FFB'
const silToken = '0x2a081667587c35956d34A4cC3bf92b9CA0ef2C6f'
const dunMo = '0xD30F5d6ABc3dBd9Df01eC0FE891114914Ee1360A'
const mintStOPT_Router = '0xeFb6F6018F5D6c0D1e58F751a57fa716e72d1182'
const salonRouter = '0x76B6B24BA53042A0e02Cc0e84c875d74EAeFb74a'
const slot1 = '0x171b341FD1B8a2aDc1299f34961e19B552238cb5'
const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const ss = 1

const Memeticorbit = ({ intrasubModetext, navigate, setisLoading, txupdate, setTxupdate, setisError, setErrMsg, erc721ABI, erc20ABI, dunMoABI, mintStOPTABI, salonABI, slot1ABI }) => {
    let { address } = useAccount()
    const youraddr = address
    if (intrasubModetext === undefined || intrasubModetext.toUpperCase() === "YOURBAG") {
        navigate('/dungeon/memetic-orbit/' + address)
    } else if (intrasubModetext.length === 42) {
        address = intrasubModetext
    } else if (address === undefined) {
    } else {
        navigate('/dungeon/memetic-orbit/' + address)
    }
    
    const [isTransferModal, setIsTransferModal] = React.useState(false)
    const [transferNftCol, setTransferNftCol] = React.useState(null)
    const [transferNftid, setTransferNftid] = React.useState(null)
    const [transferName, setTransferName] = React.useState("")
    const [transferTo, setTransferTo] = React.useState(null)

    const [nft, setNft] = React.useState([])
    const [characterSlot, setCharacterSlot] = React.useState(null)
    const [characterSlotLevel, setCharacterSlotLevel] = React.useState(null)
    const [isOp, setIsOp] = React.useState(null)
    const [hatSlot, setHatSlot] = React.useState(null)
    const [hatSlotLevel, setHatSlotLevel] = React.useState(null)
    const [clothSlot, setClothSlot] = React.useState(null)
    const [clothSlotLevel, setClothSlotLevel] = React.useState(null)
    const [accSlot, setAccSlot] = React.useState(null)
    const [accSlotLevel, setAccSlotLevel] = React.useState(null)
    const [backSlot, setBackSlot] = React.useState(null)
    const [backSlotLevel, setBackSlotLevel] = React.useState(null)
    const [shoesSlot, setShoesSlot] = React.useState(null)
    const [shoesSlotLevel, setShoesSlotLevel] = React.useState(null)
    const [weaponSlot, setWeaponSlot] = React.useState(null)
    const [wpSlotLevel, setWpSlotLevel] = React.useState(null)
    const [weaponSlot2, setWeapon2Slot] = React.useState(null)
    const [wpSlot2Level, setWpSlot2Level] = React.useState(null)
    const [accSlot2, setAccSlot2] = React.useState(null)
    const [accSlot2Level, setAccSlot2Level] = React.useState(null)
    const [accSlot3, setAccSlot3] = React.useState(null)
    const [accSlot3Level, setAccSlot3Level] = React.useState(null)
    const [accSlot4, setAccSlot4] = React.useState(null)
    const [accSlot4Level, setAccSlot4Level] = React.useState(null)
    const [accSlot5, setAccSlot5] = React.useState(null)
    const [accSlot5Level, setAccSlot5Level] = React.useState(null)
    const [accSlot6, setAccSlot6] = React.useState(null)
    const [accSlot6Level, setAccSlot6Level] = React.useState(null)
    const [soulSlot, setSoulSlot] = React.useState(null)
    const [soulSlotLevel, setSoulSlotLevel] = React.useState(null)
    const [badgeSlot, setBadgeSlot] = React.useState(null)
    const [badgeSlotLevel, setBadgeSlotLevel] = React.useState(null)

    const [ss1CharacterSlot, setSs1CharacterSlot] = React.useState(null)
    const [ss1CharacterSlotLevel, setSs1CharacterSlotLevel] = React.useState(null)
    const [ss1HatSlot, setSs1HatSlot] = React.useState(null)
    const [ss1HatSlotLevel, setSs1HatSlotLevel] = React.useState(null)
    const [ss1ClothSlot, setSs1ClothSlot] = React.useState(null)
    const [ss1ClothSlotLevel, setSs1ClothSlotLevel] = React.useState(null)
    const [ss1AccSlot, setSs1AccSlot] = React.useState(null)
    const [ss1BackSlot, setSs1BackSlot] = React.useState(null)
    const [ss1BackSlotLevel, setSs1BackSlotLevel] = React.useState(null)
    const [ss1ShoesSlot, setSs1ShoesSlot] = React.useState(null)
    const [ss1ShoesSlotLevel, setSs1ShoesSlotLevel] = React.useState(null)
    const [ss1WeaponSlot, setSs1WeaponSlot] = React.useState(null)
    const [ss1WpSlotLevel, setSs1WpSlotLevel] = React.useState(null)

    const [allPower, setAllPower] = React.useState(0)
    const [isStakeNow, setIsStakeNow] = React.useState(null)
    const [timeToRunout, setTimeToRunout] = React.useState(null)
    const [isRunout, setIsRunout] = React.useState(false)
    const [rewardPending, setRewardPending] = React.useState(0)
    const [yourSS1CMPOW, setYourSS1CMPOW] = React.useState(0)

    const [lastedSTOPT, setLastedSTOPT] = React.useState(null)

    const [skinSlot1, setSkinSlot1] = React.useState(null)

    const [doijibBalance, setDoijibBalance] = React.useState(0)
    const [silBalance, setSilBalance] = React.useState(0)
    const [landBonus, setLandBonus] = React.useState(0)
    const [myhouse, setMyhouse] = React.useState(0)

    React.useEffect(() => {
        window.scrollTo(0, 0)
        const cmdaonftSC = new ethers.Contract(cmdaonft, erc721ABI, providerJBC)
        const narutanftSC = new ethers.Contract(narutanft, erc721ABI, providerJBC)
        const bbnftSC = new ethers.Contract(bbnft, erc721ABI, providerJBC)
        setNft([])
        
        const thefetch = async () => {
            const dataHouse = await readContracts({
                contracts: [
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10026010']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10026002']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10001001']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10001002']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10001003']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10001004']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10001005']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10001006']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10001007']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10001008']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10001009']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10001010']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10001011']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10026006']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10002001']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10002002']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10002003']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10002004']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10002005']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10002006']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10002007']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10002008']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10002009']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10002010']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10002011']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10026011']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003001']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003002']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003003']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003004']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003005']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003006']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003007']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003008']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003009']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003010']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003011']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003012']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003013']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003014']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003015']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003016']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003017']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003018']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003019']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003020']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003021']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003022']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10026010']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10026002']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10001001']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10001002']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10001003']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10001004']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10001005']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10001006']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10001007']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10001008']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10001009']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10001010']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10001011']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10026006']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10002001']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10002002']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10002003']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10002004']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10002005']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10002006']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10002007']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10002008']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10002009']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10002010']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10002011']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10026011']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003001']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003002']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003003']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003004']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003005']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003006']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003007']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003008']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003009']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003010']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003011']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003012']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003013']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003014']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003015']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003016']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003017']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003018']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003019']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003020']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003021']
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003022']
                    },
                ],
            }) 

            let house = 0
            let myhouseMul = 0
            for (let i = 0; i <= dataHouse.length - 1; i++) {
                if (address.toUpperCase() === dataHouse[1].result.toUpperCase()) {
                    house = 10026002
                    myhouseMul = Number(dataHouse[49].result) * 10
                } else if (address.toUpperCase() === dataHouse[2].result.toUpperCase()) {
                    house = 10001001
                    myhouseMul = Number(dataHouse[50].result) * 10
                } else if (address.toUpperCase() === dataHouse[3].result.toUpperCase()) {
                    house = 10001002
                    myhouseMul = Number(dataHouse[51].result) * 10
                } else if (address.toUpperCase() === dataHouse[4].result.toUpperCase()) {
                    house = 10001003
                    myhouseMul = Number(dataHouse[52].result) * 10
                } else if (address.toUpperCase() === dataHouse[5].result.toUpperCase()) {
                    house = 10001004
                    myhouseMul = Number(dataHouse[53].result) * 10
                } else if (address.toUpperCase() === dataHouse[6].result.toUpperCase()) {
                    house = 10001005
                    myhouseMul = Number(dataHouse[54].result) * 10
                } else if (address.toUpperCase() === dataHouse[7].result.toUpperCase()) {
                    house = 10001006
                    myhouseMul = Number(dataHouse[55].result) * 10
                } else if (address.toUpperCase() === dataHouse[8].result.toUpperCase()) {
                    house = 10001007
                    myhouseMul = Number(dataHouse[56].result) * 10
                } else if (address.toUpperCase() === dataHouse[9].result.toUpperCase()) {
                    house = 10001008
                    myhouseMul = Number(dataHouse[57].result) * 10
                } else if (address.toUpperCase() === dataHouse[10].result.toUpperCase()) {
                    house = 10001009
                    myhouseMul = Number(dataHouse[58].result) * 10
                } else if (address.toUpperCase() === dataHouse[11].result.toUpperCase()) {
                    house = 10001010
                    myhouseMul = Number(dataHouse[59].result) * 10
                } else if (address.toUpperCase() === dataHouse[12].result.toUpperCase()) {
                    house = 10001011
                    myhouseMul = Number(dataHouse[60].result) * 10
                } else if (address.toUpperCase() === dataHouse[13].result.toUpperCase()) {
                    house = 10026006
                    myhouseMul = Number(dataHouse[61].result) * 5
                } else if (address.toUpperCase() === dataHouse[0].result.toUpperCase()) {
                    house = 10026010
                    myhouseMul = Number(dataHouse[48].result) * 5
                } else if (address.toUpperCase() === dataHouse[14].result.toUpperCase()) {
                    house = 10002001
                    myhouseMul = Number(dataHouse[62].result) * 5
                } else if (address.toUpperCase() === dataHouse[15].result.toUpperCase()) {
                    house = 10002002
                    myhouseMul = Number(dataHouse[63].result) * 5
                } else if (address.toUpperCase() === dataHouse[16].result.toUpperCase()) {
                    house = 10002003
                    myhouseMul = Number(dataHouse[64].result) * 5
                } else if (address.toUpperCase() === dataHouse[17].result.toUpperCase()) {
                    house = 10002004
                    myhouseMul = Number(dataHouse[65].result) * 5
                } else if (address.toUpperCase() === dataHouse[18].result.toUpperCase()) {
                    house = 10002005
                    myhouseMul = Number(dataHouse[66].result) * 5
                } else if (address.toUpperCase() === dataHouse[19].result.toUpperCase()) {
                    house = 10002006
                    myhouseMul = Number(dataHouse[67].result) * 5
                } else if (address.toUpperCase() === dataHouse[20].result.toUpperCase()) {
                    house = 10002007
                    myhouseMul = Number(dataHouse[68].result) * 5
                } else if (address.toUpperCase() === dataHouse[21].result.toUpperCase()) {
                    house = 10002008
                    myhouseMul = Number(dataHouse[69].result) * 5
                } else if (address.toUpperCase() === dataHouse[22].result.toUpperCase()) {
                    house = 10002009
                    myhouseMul = Number(dataHouse[70].result) * 5
                } else if (address.toUpperCase() === dataHouse[23].result.toUpperCase()) {
                    house = 10002010
                    myhouseMul = Number(dataHouse[71].result) * 5
                } else if (address.toUpperCase() === dataHouse[24].result.toUpperCase()) {
                    house = 10002011
                    myhouseMul = Number(dataHouse[72].result) * 5
                } else if (address.toUpperCase() === dataHouse[25].result.toUpperCase()) {
                    house = 10026011
                    myhouseMul = Number(dataHouse[73].result)
                } else if (address.toUpperCase() === dataHouse[26].result.toUpperCase()) {
                    house = 10003001
                    myhouseMul = Number(dataHouse[74].result)
                } else if (address.toUpperCase() === dataHouse[27].result.toUpperCase()) {
                    house = 10003002
                    myhouseMul = Number(dataHouse[75].result)
                } else if (address.toUpperCase() === dataHouse[28].result.toUpperCase()) {
                    house = 10003003
                    myhouseMul = Number(dataHouse[76].result)
                } else if (address.toUpperCase() === dataHouse[29].result.toUpperCase()) {
                    house = 10003004
                    myhouseMul = Number(dataHouse[77].result)
                } else if (address.toUpperCase() === dataHouse[30].result.toUpperCase()) {
                    house = 10003005
                    myhouseMul = Number(dataHouse[78].result)
                } else if (address.toUpperCase() === dataHouse[31].result.toUpperCase()) {
                    house = 10003006
                    myhouseMul = Number(dataHouse[79].result)
                } else if (address.toUpperCase() === dataHouse[32].result.toUpperCase()) {
                    house = 10003007
                    myhouseMul = Number(dataHouse[80].result)
                } else if (address.toUpperCase() === dataHouse[33].result.toUpperCase()) {
                    house = 10003008
                    myhouseMul = Number(dataHouse[81].result)
                } else if (address.toUpperCase() === dataHouse[34].result.toUpperCase()) {
                    house = 10003009
                    myhouseMul = Number(dataHouse[82].result)
                } else if (address.toUpperCase() === dataHouse[35].result.toUpperCase()) {
                    house = 10003010
                    myhouseMul = Number(dataHouse[83].result)
                } else if (address.toUpperCase() === dataHouse[36].result.toUpperCase()) {
                    house = 10003011
                    myhouseMul = Number(dataHouse[84].result)
                } else if (address.toUpperCase() === dataHouse[37].result.toUpperCase()) {
                    house = 10003012
                    myhouseMul = Number(dataHouse[85].result)
                } else if (address.toUpperCase() === dataHouse[38].result.toUpperCase()) {
                    house = 10003013
                    myhouseMul = Number(dataHouse[86].result)
                } else if (address.toUpperCase() === dataHouse[39].result.toUpperCase()) {
                    house = 10003014
                    myhouseMul = Number(dataHouse[87].result)
                } else if (address.toUpperCase() === dataHouse[40].result.toUpperCase()) {
                    house = 10003015
                    myhouseMul = Number(dataHouse[88].result)
                } else if (address.toUpperCase() === dataHouse[41].result.toUpperCase()) {
                    house = 10003016
                    myhouseMul = Number(dataHouse[89].result)
                } else if (address.toUpperCase() === dataHouse[42].result.toUpperCase()) {
                    house = 10003017
                    myhouseMul = Number(dataHouse[90].result)
                } else if (address.toUpperCase() === dataHouse[43].result.toUpperCase()) {
                    house = 10003018
                    myhouseMul = Number(dataHouse[91].result)
                } else if (address.toUpperCase() === dataHouse[44].result.toUpperCase()) {
                    house = 10003019
                    myhouseMul = Number(dataHouse[92].result)
                } else if (address.toUpperCase() === dataHouse[45].result.toUpperCase()) {
                    house = 10003020
                    myhouseMul = Number(dataHouse[93].result)
                } else if (address.toUpperCase() === dataHouse[46].result.toUpperCase()) {
                    house = 10003021
                    myhouseMul = Number(dataHouse[94].result)
                } else if (address.toUpperCase() === dataHouse[47].result.toUpperCase()) {
                    house = 10003022
                    myhouseMul = Number(dataHouse[95].result)
                }
            }

            const nftEQ = await readContract({
                address: dunMo,
                abi: dunMoABI,
                functionName: 'nftEquip',
                args: [address],
            })
            const nftEQ2 = await readContract({
                address: dunMo,
                abi: dunMoABI,
                functionName: 'nftEquip2',
                args: [address],
            })
            /*const nftEQColMul = await readContract({
                address: dunMo,
                abi: dunMoABI,
                functionName: 'nftEquipColMul',
                args: [address],
            })
            const nftEQColMul2 = await readContract({
                address: dunMo,
                abi: dunMoABI,
                functionName: 'nftEQColMul2',
                args: [address],
            })*/
            const nftEQMemeSS1 = await readContract({
                address: dunMo,
                abi: dunMoABI,
                functionName: 'nftEquipMeme',
                args: [address, 1],
            })

            const data = await readContracts({
                contracts: [
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[0])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[3])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[4])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[5])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[6])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[2])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[1])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ2[0])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ2[1])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ2[2])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ2[3])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ2[4])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ2[5])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ2[6])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ2[7])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS1[0])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS1[1])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS1[2])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS1[3])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS1[4])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS1[5])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS1[6])],
                    },
                    {
                        address: doijibToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: silToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: mintStOPT_Router,
                        abi: mintStOPTABI,
                        functionName: 'userTimeStamp',
                        args: [address, 2],
                    },
                    {
                        address: dunMo,
                        abi: dunMoABI,
                        functionName: 'calculateRewards',
                        args: [address, ss, house],
                    },
                    {
                        address: salonRouter,
                        abi: salonABI,
                        functionName: 'skin',
                        args: [address, 1],
                    }, 
                ],
            })
            
            let nfts = []

            let res_main_char = null
            try {
                res_main_char = data[0].status === 'success' ? await fetch(data[0].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft_main_char = res_main_char !== null ? await res_main_char.json() : {image: null, name: null}
            const nftEQ_main_char_Img = nft_main_char.image !== null ? nft_main_char.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_main_char_Name = nft_main_char.name
            if (res_main_char !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[0]),
                    Name: nftEQ_main_char_Name,
                    Image: nftEQ_main_char_Img,
                    Description: nft_main_char.description,
                    Attribute: nft_main_char.attributes,
                    RewardPerSec: Number(nftEQ[0]) % 100000,
                    isStaked: true,
                    Slot: 1
                })
            }
            let res_main_acc1 = null
            try {
                res_main_acc1 = data[1].status === 'success' ? await fetch(data[1].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft_main_acc = res_main_acc1 !== null ? await res_main_acc1.json() : {image: null, name: null}
            const nftEQ_main_acc_Img = nft_main_acc.image !== null ? nft_main_acc.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_main_acc_Name = nft_main_acc.name
            if (res_main_acc1 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[3]),
                    Name: nftEQ_main_acc_Name,
                    Image: nftEQ_main_acc_Img,
                    Description: nft_main_acc.description,
                    Attribute: nft_main_acc.attributes,
                    RewardPerSec: Number(nftEQ[3]) % 100000,
                    isStaked: true,
                    Slot: 4
                })
            }
            let res_main_back = null
            try {
                res_main_back = data[2].status === 'success' ? await fetch(data[2].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft_main_back = res_main_back !== null ? await res_main_back.json() : {image: null, name: null}
            const nftEQ_main_back_Img = nft_main_back.image !== null ? nft_main_back.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_main_back_Name = nft_main_back.name
            if (res_main_back !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[4]),
                    Name: nftEQ_main_back_Name,
                    Image: nftEQ_main_back_Img,
                    Description: nft_main_back.description,
                    Attribute: nft_main_back.attributes,
                    RewardPerSec: Number(nftEQ[4]) % 100000,
                    isStaked: true,
                    Slot: 5
                })
            }
            let res_main_shoes = null
            try {
                res_main_shoes = data[3].status === 'success' ? await fetch(data[3].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft_main_shoes = res_main_shoes !== null ? await res_main_shoes.json() : {image: null, name: null}
            const nftEQ_main_shoes_Img = nft_main_shoes.image !== null ? nft_main_shoes.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_main_shoes_Name = nft_main_shoes.name
            if (res_main_shoes !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[5]),
                    Name: nftEQ_main_shoes_Name,
                    Image: nftEQ_main_shoes_Img,
                    Description: nft_main_shoes.description,
                    Attribute: nft_main_shoes.attributes,
                    RewardPerSec: Number(nftEQ[5]) % 100000,
                    isStaked: true,
                    Slot: 6
                })
            }
            let res_main_wp1 = null
            try {
                res_main_wp1 = data[4].status === 'success' ? await fetch(data[4].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft_main_wp1 = res_main_wp1 !== null ? await res_main_wp1.json() : {image: null, name: null}
            const nftEQ_main_wp1_Img = nft_main_wp1.image !== null ? nft_main_wp1.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_main_wp1_Name = nft_main_wp1.name
            if (res_main_wp1 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[6]),
                    Name: nftEQ_main_wp1_Name,
                    Image: nftEQ_main_wp1_Img,
                    Description: nft_main_wp1.description,
                    Attribute: nft_main_wp1.attributes,
                    RewardPerSec: Number(nftEQ[6]) % 100000,
                    isStaked: true,
                    Slot: 7
                })
            }
            let res_main_cloth = null
            try {
                res_main_cloth = data[5].status === 'success' ? await fetch(data[5].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft_main_cloth = res_main_cloth !== null ? await res_main_cloth.json() : {image: null, name: null}
            const nftEQ_main_cloth_Img = nft_main_cloth.image !== null ? nft_main_cloth.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_main_cloth_Name = nft_main_cloth.name
            if (res_main_cloth !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[2]),
                    Name: nftEQ_main_cloth_Name,
                    Image: nftEQ_main_cloth_Img,
                    Description: nft_main_cloth.description,
                    Attribute: nft_main_cloth.attributes,
                    RewardPerSec: Number(nftEQ[2]) % 100000,
                    isStaked: true,
                    Slot: 3
                })
            }
            let res_main_hat = null
            try {
                res_main_hat = data[6].status === 'success' ? await fetch(data[6].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft_main_hat = res_main_hat !== null ? await res_main_hat.json() : {image: null, name: null}
            const nftEQ_main_hat_Img = nft_main_hat.image !== null ? nft_main_hat.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_main_hat_Name = nft_main_hat.name
            if (res_main_hat !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[1]),
                    Name: nftEQ_main_hat_Name,
                    Image: nftEQ_main_hat_Img,
                    Description: nft_main_hat.description,
                    Attribute: nft_main_hat.attributes,
                    RewardPerSec: Number(nftEQ[1]) % 100000,
                    isStaked: true,
                    Slot: 2
                })
            }
            let res_main_wp2 = null
            try {
                res_main_wp2 = data[7].status === 'success' ? await fetch(data[7].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft_main_wp2 = res_main_wp2 !== null ? await res_main_wp2.json() : {image: null, name: null}
            const nftEQ_main_wp2_Img = nft_main_wp2.image !== null ? nft_main_wp2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_main_wp2_Name = nft_main_wp2.name
            if (res_main_wp2 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ2[0]),
                    Name: nftEQ_main_wp2_Name,
                    Image: nftEQ_main_wp2_Img,
                    Description: nft_main_wp2.description,
                    Attribute: nft_main_wp2.attributes,
                    RewardPerSec: Number(nftEQ2[0]) % 100000,
                    isStaked: true,
                    Slot: 14
                })
            }
            let res_main_acc2 = null
            try {
                res_main_acc2 = data[8].status === 'success' ? await fetch(data[8].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft_main_acc2 = res_main_acc2 !== null ? await res_main_acc2.json() : {image: null, name: null}
            const nftEQ_main_acc2_Img = nft_main_acc2.image !== null ? nft_main_acc2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_main_acc2_Name = nft_main_acc2.name
            if (res_main_acc2 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ2[1]),
                    Name: nftEQ_main_acc2_Name,
                    Image: nftEQ_main_acc2_Img,
                    Description: nft_main_acc2.description,
                    Attribute: nft_main_acc2.attributes,
                    RewardPerSec: Number(nftEQ2[1]) % 100000,
                    isStaked: true,
                    Slot: 9
                })
            }
            let res_main_acc3 = null
            try {
                res_main_acc3 = data[9].status === 'success' ? await fetch(data[9].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft_main_acc3 = res_main_acc3 !== null ? await res_main_acc3.json() : {image: null, name: null}
            const nftEQ_main_acc3_Img = nft_main_acc3.image !== null ? nft_main_acc3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_main_acc3_Name = nft_main_acc3.name
            if (res_main_acc3 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ2[2]),
                    Name: nftEQ_main_acc3_Name,
                    Image: nftEQ_main_acc3_Img,
                    Description: nft_main_acc3.description,
                    Attribute: nft_main_acc3.attributes,
                    RewardPerSec: Number(nftEQ2[2]) % 100000,
                    isStaked: true,
                    Slot: 10
                })
            }
            let res_main_acc4 = null
            try {
                res_main_acc4 = data[10].status === 'success' ? await fetch(data[10].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft_main_acc4 = res_main_acc4 !== null ? await res_main_acc4.json() : {image: null, name: null}
            const nftEQ_main_acc4_Img = nft_main_acc4.image !== null ? nft_main_acc4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_main_acc4_Name = nft_main_acc4.name
            if (res_main_acc4 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ2[3]),
                    Name: nftEQ_main_acc4_Name,
                    Image: nftEQ_main_acc4_Img,
                    Description: nft_main_acc4.description,
                    Attribute: nft_main_acc4.attributes,
                    RewardPerSec: Number(nftEQ2[3]) % 100000,
                    isStaked: true,
                    Slot: 11
                })
            }
            let res_main_acc5 = null
            try {
                res_main_acc5 = data[11].status === 'success' ? await fetch(data[11].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft_main_acc5 = res_main_acc5 !== null ? await res_main_acc5.json() : {image: null, name: null}
            const nftEQ_main_acc5_Img = nft_main_acc5.image !== null ? nft_main_acc5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_main_acc5_Name = nft_main_acc5.name
            if (res_main_acc5 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ2[4]),
                    Name: nftEQ_main_acc5_Name,
                    Image: nftEQ_main_acc5_Img,
                    Description: nft_main_acc5.description,
                    Attribute: nft_main_acc5.attributes,
                    RewardPerSec: Number(nftEQ2[4]) % 100000,
                    isStaked: true,
                    Slot: 12
                })
            }
            let res_main_acc6 = null
            try {
                res_main_acc6 = data[12].status === 'success' ? await fetch(data[12].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft_main_acc6 = res_main_acc6 !== null ? await res_main_acc6.json() : {image: null, name: null}
            const nftEQ_main_acc6_Img = nft_main_acc6.image !== null ? nft_main_acc6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_main_acc6_Name = nft_main_acc6.name
            if (res_main_acc6 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ2[5]),
                    Name: nftEQ_main_acc6_Name,
                    Image: nftEQ_main_acc6_Img,
                    Description: nft_main_acc6.description,
                    Attribute: nft_main_acc6.attributes,
                    RewardPerSec: Number(nftEQ2[5]) % 100000,
                    isStaked: true,
                    Slot: 13
                })
            }
            let res_main_soul = null
            try {
                res_main_soul = data[13].status === 'success' ? await fetch(data[13].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft_main_soul = res_main_soul !== null ? await res_main_soul.json() : {image: null, name: null}
            const nftEQ_main_soul_Img = nft_main_soul.image !== null ? nft_main_soul.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_main_soul_Name = nft_main_soul.name
            if (res_main_soul !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ2[6]),
                    Name: nftEQ_main_soul_Name,
                    Image: nftEQ_main_soul_Img,
                    Description: nft_main_soul.description,
                    Attribute: nft_main_soul.attributes,
                    RewardPerSec: Number(nftEQ2[6]) % 100000,
                    isStaked: true,
                    Slot: 15
                })
            }
            let res_main_badge = null
            try {
                res_main_badge = data[14].status === 'success' ? await fetch(data[14].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft_main_badge = res_main_badge !== null ? await res_main_badge.json() : {image: null, name: null}
            const nftEQ_main_badge_Img = nft_main_badge.image !== null ? nft_main_badge.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_main_badge_Name = nft_main_badge.name
            if (res_main_badge !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ2[7]),
                    Name: nftEQ_main_badge_Name,
                    Image: nftEQ_main_badge_Img,
                    Description: nft_main_badge.description,
                    Attribute: nft_main_badge.attributes,
                    RewardPerSec: Number(nftEQ2[7]) % 100000,
                    isStaked: true,
                    Slot: 8
                })
            }
            let memeSS1cmpow = 0
            let res_meme_char_ss1 = null
            try {
                res_meme_char_ss1 = data[15].status === 'success' ? await fetch(data[15].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft_meme_char_ss1 = res_meme_char_ss1 !== null ? await res_meme_char_ss1.json() : {image: null, name: null}
            const nftEQ_meme_char_ss1_Img = nft_meme_char_ss1.image !== null ? nft_meme_char_ss1.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_meme_char_ss1_Name = nft_meme_char_ss1.name
            memeSS1cmpow += res_meme_char_ss1 !== null ? Number(nftEQMemeSS1[0]) % 100000 : 0
            if (res_meme_char_ss1 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQMemeSS1[0]),
                    Name: nftEQ_meme_char_ss1_Name,
                    Image: nftEQ_meme_char_ss1_Img,
                    Description: nft_meme_char_ss1.description,
                    Attribute: nft_meme_char_ss1.attributes,
                    RewardPerSec: Number(nftEQMemeSS1[0]) % 100000,
                    isStaked: true,
                    Slot: 1
                })
            }
            let res_meme_hat_ss1 = null
            try {
                res_meme_hat_ss1 = data[16].status === 'success' ? await fetch(data[16].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft_meme_hat_ss1 = res_meme_hat_ss1 !== null ? await res_meme_hat_ss1.json() : {image: null, name: null}
            const nftEQ_meme_hat_ss1_Img = nft_meme_hat_ss1.image !== null ? nft_meme_hat_ss1.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_meme_hat_ss1_Name = nft_meme_hat_ss1.name
            memeSS1cmpow += res_meme_hat_ss1 !== null ? Number(nftEQMemeSS1[1]) % 100000 : 0
            if (res_meme_hat_ss1 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQMemeSS1[1]),
                    Name: nftEQ_meme_hat_ss1_Name,
                    Image: nftEQ_meme_hat_ss1_Img,
                    Description: nft_meme_hat_ss1.description,
                    Attribute: nft_meme_hat_ss1.attributes,
                    RewardPerSec: Number(nftEQMemeSS1[1]) % 100000,
                    isStaked: true,
                    Slot: 2
                })
            }
            let res_meme_cloth_ss1 = null
            try {
                res_meme_cloth_ss1 = data[17].status === 'success' ? await fetch(data[17].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft_meme_cloth_ss1 = res_meme_cloth_ss1 !== null ? await res_meme_cloth_ss1.json() : {image: null, name: null}
            const nftEQ_meme_cloth_ss1_Img = nft_meme_cloth_ss1.image !== null ? nft_meme_cloth_ss1.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_meme_cloth_ss1_Name = nft_meme_cloth_ss1.name
            memeSS1cmpow += res_meme_cloth_ss1 !== null ? Number(nftEQMemeSS1[2]) % 100000 : 0
            if (res_meme_cloth_ss1 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQMemeSS1[2]),
                    Name: nftEQ_meme_cloth_ss1_Name,
                    Image: nftEQ_meme_cloth_ss1_Img,
                    Description: nft_meme_cloth_ss1.description,
                    Attribute: nft_meme_cloth_ss1.attributes,
                    RewardPerSec: Number(nftEQMemeSS1[2]) % 100000,
                    isStaked: true,
                    Slot: 3
                })
            }
            let res_meme_acc_ss1 = null
            try {
                res_meme_acc_ss1 = data[18].status === 'success' ? await fetch(data[18].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft_meme_acc_ss1 = res_meme_acc_ss1 !== null ? await res_meme_acc_ss1.json() : {image: null, name: null}
            const nftEQ_meme_acc_ss1_Img = nft_meme_acc_ss1.image !== null ? nft_meme_acc_ss1.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            memeSS1cmpow += res_meme_acc_ss1 !== null ? Number(nftEQMemeSS1[3]) % 100000 : 0
            if (res_meme_acc_ss1 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQMemeSS1[3]),
                    Name: nft_meme_acc_ss1.name,
                    Image: nftEQ_meme_acc_ss1_Img,
                    Description: nft_meme_acc_ss1.description,
                    Attribute: nft_meme_acc_ss1.attributes,
                    RewardPerSec: Number(nftEQMemeSS1[3]) % 100000,
                    isStaked: true,
                    Slot: 4
                })
            }
            let res_meme_back_ss1 = null
            try {
                res_meme_back_ss1 = data[19].status === 'success' ? await fetch(data[19].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft_meme_back_ss1 = res_meme_back_ss1 !== null ? await res_meme_back_ss1.json() : {image: null, name: null}
            const nftEQ_meme_back_ss1_Img = nft_meme_back_ss1.image !== null ? nft_meme_back_ss1.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_meme_back_ss1_Name = nft_meme_back_ss1.name
            memeSS1cmpow += res_meme_back_ss1 !== null ? Number(nftEQMemeSS1[4]) % 100000 : 0
            if (res_meme_back_ss1 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQMemeSS1[4]),
                    Name: nftEQ_meme_back_ss1_Name,
                    Image: nftEQ_meme_back_ss1_Img,
                    Description: nft_meme_back_ss1.description,
                    Attribute: nft_meme_back_ss1.attributes,
                    RewardPerSec: Number(nftEQMemeSS1[4]) % 100000,
                    isStaked: true,
                    Slot: 5
                })
            }
            let res_meme_shoes_ss1 = null
            try {
                res_meme_shoes_ss1 = data[20].status === 'success' ? await fetch(data[20].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft_meme_shoes_ss1 = res_meme_shoes_ss1 !== null ? await res_meme_shoes_ss1.json() : {image: null, name: null}
            const nftEQ_meme_shoes_ss1_Img = nft_meme_shoes_ss1.image !== null ? nft_meme_shoes_ss1.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_meme_shoes_ss1_Name = nft_meme_shoes_ss1.name
            memeSS1cmpow += res_meme_back_ss1 !== null ? Number(nftEQMemeSS1[5]) % 100000 : 0
            if (res_meme_back_ss1 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQMemeSS1[5]),
                    Name: nftEQ_meme_shoes_ss1_Name,
                    Image: nftEQ_meme_shoes_ss1_Img,
                    Description: nft_meme_shoes_ss1.description,
                    Attribute: nft_meme_shoes_ss1.attributes,
                    RewardPerSec: Number(nftEQMemeSS1[5]) % 100000,
                    isStaked: true,
                    Slot: 6
                })
            }
            let res_meme_weapon_ss1 = null
            try {
                res_meme_weapon_ss1 = data[21].status === 'success' ? await fetch(data[21].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft_meme_weapon_ss1 = res_meme_weapon_ss1 !== null ? await res_meme_weapon_ss1.json() : {image: null, name: null}
            const nftEQ_meme_weapon_ss1_Img = nft_meme_weapon_ss1.image !== null ? nft_meme_weapon_ss1.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_meme_weapon_ss1_Name = nft_meme_weapon_ss1.name
            memeSS1cmpow += res_meme_weapon_ss1 !== null ? Number(nftEQMemeSS1[6]) % 100000 : 0
            if (res_meme_weapon_ss1 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQMemeSS1[6]),
                    Name: nftEQ_meme_weapon_ss1_Name,
                    Image: nftEQ_meme_weapon_ss1_Img,
                    Description: nft_meme_weapon_ss1.description,
                    Attribute: nft_meme_weapon_ss1.attributes,
                    RewardPerSec: Number(nftEQMemeSS1[6]) % 100000,
                    isStaked: true,
                    Slot: 7
                })
            }

            const nftStatus = await readContract({
                address: dunMo,
                abi: dunMoABI,
                functionName: 'nftStatus',
                args: [address],
            })

            const allPow = Number(nftStatus[0])
            const refuelAt = Number(nftStatus[1])
            const isStaked = nftStatus[2]

            const doijibBal = data[22].result
            const silBal = data[23].result
            const stOPTClaim = isStaked ? data[24].result : 0
            const rewardpending = isStaked ? data[25].result : 0
            const skinslot1 = data[26].result

                        
            const walletFilter = await cmdaonftSC.filters.Transfer(null, address, null)
            const walletEvent = await cmdaonftSC.queryFilter(walletFilter, 335000, "latest")
            const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
            const walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            const data2 = address !== null && address !== undefined ? await readContracts({
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: [String(item)],
                    }
                ))
            }) : [Array(walletRemoveDup.length).fill('')]
            let yournftwallet = []
            for (let i = 0; i <= walletRemoveDup.length - 1 && address !== null && address !== undefined; i++) {
                if (data2[i].result.toUpperCase() === address.toUpperCase()) {
                    yournftwallet.push({Id: String(walletRemoveDup[i])})
                }
            }
            const data3 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftwallet.map((item) => (
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftwallet.length).fill('')]
            for (let i = 0; i <= yournftwallet.length - 1; i++) {
                const nftipfs = data3[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"))
                    nft = await response.json()
                } catch {}
                nfts.push({
                    Col: 1,
                    Id: yournftwallet[i].Id,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(yournftwallet[i].Id.slice(-5)),
                    isStaked: false
                })
            }

            const walletFilter2 = await narutanftSC.filters.Transfer(null, address, null)
            const walletEvent2 = await narutanftSC.queryFilter(walletFilter2, 2852393, "latest")
            const walletMap2 = await Promise.all(walletEvent2.map(async (obj) => String(obj.args.tokenId)))
            const walletRemoveDup2 = walletMap2.filter((obj, index) => walletMap2.indexOf(obj) === index)
            const data4 = address !== null && address !== undefined ? await readContracts({
                contracts: walletRemoveDup2.map((item) => (
                    {
                        address: narutanft,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: [String(item)],
                    }
                ))
            }) : [Array(walletRemoveDup2.length).fill('')]
            let yournftwallet2 = []
            for (let i = 0; i <= walletRemoveDup2.length - 1 && address !== null && address !== undefined; i++) {
                if (data4[i].result.toUpperCase() === address.toUpperCase()) {
                    yournftwallet2.push({Id: String(walletRemoveDup2[i])})
                }
            }
            const data5 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftwallet2.map((item) => (
                    {
                        address: narutanft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftwallet2.length).fill('')]
            for (let i = 0; i <= yournftwallet2.length - 1; i++) {
                const nftipfs = data5[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"))
                    nft = await response.json()
                } catch {}
                nfts.push({
                    Col: 2,
                    Id: yournftwallet2[i].Id,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(yournftwallet2[i].Id.slice(-5)),
                    isStaked: false
                })
            }

            const walletFilter3 = await bbnftSC.filters.Transfer(null, address, null)
            const walletEvent3 = await bbnftSC.queryFilter(walletFilter3, 3478177, "latest")
            const walletMap3 = await Promise.all(walletEvent3.map(async (obj) => String(obj.args.tokenId)))
            const walletRemoveDup3 = walletMap3.filter((obj, index) => walletMap3.indexOf(obj) === index)
            const data6 = address !== null && address !== undefined ? await readContracts({
                contracts: walletRemoveDup3.map((item) => (
                    {
                        address: bbnft,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: [String(item)],
                    }
                ))
            }) : [Array(walletRemoveDup3.length).fill('')]
            let yournftwallet3 = []
            for (let i = 0; i <= walletRemoveDup3.length - 1 && address !== null && address !== undefined; i++) {
                if (data6[i].result.toUpperCase() === address.toUpperCase()) {
                    yournftwallet3.push({Id: String(walletRemoveDup3[i])})
                }
            }
            const data7 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftwallet3.map((item) => (
                    {
                        address: bbnft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftwallet3.length).fill('')]
            for (let i = 0; i <= yournftwallet3.length - 1; i++) {
                const nftipfs = data7[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"))
                    nft = await response.json()
                } catch {}
                nfts.push({
                    Col: 3,
                    Id: yournftwallet3[i].Id,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: 0,
                    isStaked: false
                })
            }
            if (nfts.length === 0) { nfts.push(null) }
            
            return [
                nfts, 
                nftEQ_main_char_Img, nftEQ_main_char_Name, nftEQ_main_acc_Img, nftEQ_main_acc_Name, nftEQ_main_back_Img, nftEQ_main_back_Name, nftEQ_main_shoes_Img, nftEQ_main_shoes_Name, nftEQ_main_wp1_Img, nftEQ_main_wp1_Name, nftEQ_main_cloth_Img, nftEQ_main_cloth_Name, nftEQ_main_hat_Img, nftEQ_main_hat_Name,
                nftEQ_main_wp2_Img, nftEQ_main_wp2_Name, nftEQ_main_acc2_Img, nftEQ_main_acc2_Name, nftEQ_main_acc3_Img, nftEQ_main_acc3_Name, nftEQ_main_acc4_Img, nftEQ_main_acc4_Name, nftEQ_main_acc5_Img, nftEQ_main_acc5_Name, nftEQ_main_acc6_Img, nftEQ_main_acc6_Name, nftEQ_main_soul_Img, nftEQ_main_soul_Name, nftEQ_main_badge_Img, nftEQ_main_badge_Name,
                nftEQ_meme_char_ss1_Img, nftEQ_meme_char_ss1_Name, nftEQ_meme_hat_ss1_Img, nftEQ_meme_hat_ss1_Name, nftEQ_meme_cloth_ss1_Img, nftEQ_meme_cloth_ss1_Name, nftEQ_meme_acc_ss1_Img, nftEQ_meme_back_ss1_Img, nftEQ_meme_back_ss1_Name, nftEQ_meme_shoes_ss1_Img, nftEQ_meme_shoes_ss1_Name, nftEQ_meme_weapon_ss1_Img, nftEQ_meme_weapon_ss1_Name,
                allPow, isStaked, refuelAt, rewardpending, stOPTClaim, doijibBal, silBal, skinslot1, myhouseMul, house, memeSS1cmpow,
            ]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            setNft(result[0])

            setCharacterSlot(result[1])
            if (result[2] !== null && result[2].slice(-1) === "]" && result[2].slice(-3, -2) === ".") {
                setCharacterSlotLevel(result[2].slice(-2, -1))
            } else if (result[2] !== null && result[2].slice(-1) === "]" && result[2].slice(-4, -3) === ".") {
                setCharacterSlotLevel(result[2].slice(-3, -1))
            } else {
                setCharacterSlotLevel(null)
            }
            result[2] !== null && result[2].slice(0, 7) === "SAPIENS" ? setIsOp(true) : setIsOp(false)
            setAccSlot(result[3])
            result[4] !== null && result[4].slice(-2, -1) === "+" ? setAccSlotLevel(result[4].slice(-1)) : setAccSlotLevel(null)
            setBackSlot(result[5])
            result[6] !== null && result[6].slice(-2, -1) === "+" ? setBackSlotLevel(result[6].slice(-1)) : setBackSlotLevel(null)
            setShoesSlot(result[7])
            result[8] !== null && result[8].slice(-2, -1) === "+" ? setShoesSlotLevel(result[8].slice(-1)) : setShoesSlotLevel(null)
            setWeaponSlot(result[9])
            result[10] !== null && result[10].slice(-2, -1) === "+" ? setWpSlotLevel(result[10].slice(-1)) : setWpSlotLevel(null)
            setClothSlot(result[11])
            result[12] !== null && result[12].slice(-2, -1) === "+" ? setClothSlotLevel(result[12].slice(-1)) : setClothSlotLevel(null)
            setHatSlot(result[13])
            result[14] !== null && result[14].slice(-2, -1) === "+" ? setHatSlotLevel(result[14].slice(-1)) : setHatSlotLevel(null)
            setWeapon2Slot(result[15])
            result[16] !== null && result[16].slice(-2, -1) === "+" ? setWpSlot2Level(result[16].slice(-1)) : setWpSlot2Level(null)
            setAccSlot2(result[17])
            result[18] !== null && result[18].slice(-2, -1) === "+" ? setAccSlot2Level(result[18].slice(-1)) : setAccSlot2Level(null)
            setAccSlot3(result[19])
            result[20] !== null && result[20].slice(-2, -1) === "+" ? setAccSlot3Level(result[20].slice(-1)) : setAccSlot3Level(null)
            setAccSlot4(result[21])
            result[22] !== null && result[22].slice(-2, -1) === "+" ? setAccSlot4Level(result[22].slice(-1)) : setAccSlot4Level(null)
            setAccSlot5(result[23])
            result[24] !== null && result[24].slice(-2, -1) === "+" ? setAccSlot5Level(result[24].slice(-1)) : setAccSlot5Level(null)
            setAccSlot6(result[25])
            result[26] !== null && result[26].slice(-2, -1) === "+" ? setAccSlot6Level(result[26].slice(-1)) : setAccSlot6Level(null)
            setSoulSlot(result[27])
            result[28] !== null && result[28].slice(-2, -1) === "+" ? setSoulSlotLevel(result[28].slice(-1)) : setSoulSlotLevel(null)
            setBadgeSlot(result[29])
            result[30] !== null && result[30].slice(-2, -1) === "+" ? setBadgeSlotLevel(result[30].slice(-1)) : setBadgeSlotLevel(null)

            setSs1CharacterSlot(result[31])
            if (result[32] !== null && result[32].slice(-1) === "]" && result[32].slice(-3, -2) === ".") {
                setSs1CharacterSlotLevel(result[32].slice(-2, -1))
            } else if (result[32] !== null && result[32].slice(-1) === "]" && result[32].slice(-4, -3) === ".") {
                setSs1CharacterSlotLevel(result[32].slice(-3, -1))
            } else {
                setSs1CharacterSlotLevel(null)
            }
            setSs1HatSlot(result[33])
            result[34] !== null && result[34].slice(-2, -1) === "+" ? setSs1HatSlotLevel(result[34].slice(-1)) : setSs1HatSlotLevel(null)
            setSs1ClothSlot(result[35])
            result[36] !== null && result[36].slice(-2, -1) === "+" ? setSs1ClothSlotLevel(result[36].slice(-1)) : setSs1ClothSlotLevel(null)
            setSs1AccSlot(result[37])
            setSs1BackSlot(result[38])
            result[39] !== null && result[39].slice(-2, -1) === "+" ? setSs1BackSlotLevel(result[39].slice(-1)) : setSs1BackSlotLevel(null)
            setSs1ShoesSlot(result[40])
            result[41] !== null && result[41].slice(-2, -1) === "+" ? setSs1ShoesSlotLevel(result[41].slice(-1)) : setSs1ShoesSlotLevel(null)
            setSs1WeaponSlot(result[42])
            result[43] !== null && result[43].slice(-2, -1) === "+" ? setSs1WpSlotLevel(result[43].slice(-1)) : setSs1WpSlotLevel(null)
            
            setAllPower(result[44])
            setIsStakeNow(result[45])
            const gasOut = new Date((Number(result[46]) * 1000) + (7 * 86400 * 1000))
            result[46] !== 0 ?
                setTimeToRunout(gasOut.toLocaleString('es-CL')) :
                setTimeToRunout(null)
            result[46] !== 0 && Date.now() - (Number(result[46]) * 1000) > (7 * 86400 * 1000) ? setIsRunout(true) : setIsRunout(false)
            setRewardPending(ethers.utils.formatEther(String(result[47])))

            setLastedSTOPT(Number(result[46]) * 1000 === Number(result[48]) * 1000)
            setDoijibBalance(ethers.utils.formatEther(String(result[49])))
            setSilBalance(ethers.utils.formatEther(String(result[50])))
            setSkinSlot1(result[51])
            setLandBonus(result[52])
            setMyhouse(result[53])
            setYourSS1CMPOW(result[54])
        })

    }, [address, txupdate, erc721ABI, erc20ABI, dunMoABI, mintStOPTABI, salonABI, slot1ABI])

    const transferToHandle = (event) => { setTransferTo(event.target.value) }
    const transferNFT = (_col, _nftid) => {
        setIsTransferModal(true)
        setTransferNftCol(_col)
        setTransferNftid(_nftid)
        for (let i = 0; i <= nft.length - 1; i++) {
            if (nft[i].Id === Number(_nftid)) {
                setTransferName(nft[i].Name)
            }
        }
    }
    const transferNFTConfirm = async () => {
        setisLoading(true)
        let addr = ''
        if (transferNftCol === 1) {
            addr = cmdaonft
        } else if (transferNftCol === 2) {
            addr = narutanft
        } else if (transferNftCol === 3) {
            addr = bbnft
        }
        try {
            const config = await prepareWriteContract({
                address: addr,
                abi: erc721ABI,
                functionName: 'transferFrom',
                args: [address, transferTo, transferNftid],
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const equipNft = async (_nftid, slot, _isMeme) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract({
                address: cmdaonft,
                abi: erc721ABI,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== dunMo.toUpperCase()) {
                const config = await prepareWriteContract({
                    address: cmdaonft,
                    abi: erc721ABI,
                    functionName: 'approve',
                    args: [dunMo, _nftid],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: dunMo,
                abi: dunMoABI,
                functionName: 'equip',
                args: [_nftid, 0, slot, _isMeme, ss],
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const unstakeNft = async (_slot, _isMeme) => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: dunMo,
                abi: dunMoABI,
                functionName: 'unstake',
                args: [_slot, myhouse, _isMeme, ss],
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const refuelStake = async () => {
        setisLoading(true)
        try {
            let gasAddr = ''
            let gasIndex = 0
            if (ss === 1) {
                gasAddr = doijibToken
                gasIndex = 1
            }
            const gasAllow = await readContract({
                address: gasAddr,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, dunMo],
            })
            if (gasAllow < (700000 * 10**18)) {
                    const config = await prepareWriteContract({
                        address: gasAddr,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [dunMo, ethers.utils.parseEther(String(10**8))],
                    })
                    const { hash: hash0 } = await writeContract(config)
                    await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: dunMo,
                abi: dunMoABI,
                functionName: 'refuel',
                args: [gasIndex, false, myhouse]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    /*const mintStOPT = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: mintStOPT_Router,
                abi: mintStOPTABI,
                functionName: 'mintST',
                args: [2]
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }*/

    return (
    <>
        {isTransferModal &&
            <div className="centermodal">
                <div className="wrapper">
                    <div className="bold" style={{width: "500px", height: "250px", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around", fontSize: "40px", letterSpacing: "3px"}}>
                        <div style={{fontSize: "20px"}}>{transferName}</div>
                        <input style={{width: "80%", padding: "10px", fontSize: "20px"}} value={transferTo} onChange={transferToHandle} placeholder="Enter 0x..."></input>
                        <div className="button" style={{width: "50%"}} onClick={transferNFTConfirm}>TRANSFER</div>
                        <div className="button" style={{width: "50%", background: "gray"}} onClick={() => setIsTransferModal(false)}>CLOSE</div>
                    </div>
                </div>
            </div>
        }
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", backgroundImage: "url('https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYeJjdaanuuX27L1RyXLM957MitBQRQ5qr3W4hZJFoGjy')", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div className="pixel" style={{fontSize: "75px", color: "#fff", width: "fit-content"}}>Memetic Orbit</div>
                <div style={{fontSize: "17px", color: "#fff", width: "fit-content", marginTop: "30px"}} className="pixel">Exploring exotic orbit to collect a variable rare token.</div>
            </div>
            <div style={{margin: "30px 100px"}}></div>
        </div>

        <div style={{background: "#0a090d", margin: "0", padding: "75px 0", minHeight: "inherit", alignItems: "flex-start"}} className="collection">
            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", overflow: "scroll"}} className="pixel mainprofile">
                <div style={{background: "none rgba(255, 255, 255, 0.1)", backdropFilter: "blur(14px)", boxShadow: "none", border: 0, justifyContent: "space-around", padding: "30px", width: "1540px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                    <div style={{background: "#2f1a52", color: "#fff", width: "370px", height: "360px", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", boxShadow: "3px 3px 0 #0d0a1f"}}>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                        <div style={{fontSize: "22px", lineHeight: "15px"}}>LAYER 1 STAKING</div>
                            <div style={{display: "flex", flexDirection: "row", alignItems: "center", color: "rgb(0, 209, 255)"}}>
                                {isStakeNow ?
                                    <>
                                    {isRunout ?
                                        <>
                                            <div style={{backgroundColor: "red", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                            <div>Run Out of Gas</div>
                                        </> :
                                        <>
                                            <div style={{background: "rgb(239, 194, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                            <div>On Staking</div>
                                        </>
                                    }
                                    </> :
                                    <>
                                        {isStakeNow === false &&
                                            <>
                                                <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                <div>Available for stake</div>
                                            </>
                                        }
                                    </>
                                }
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                            {address !== undefined ?
                                <>ADDRESS <div>{address.slice(0, 4) + "..." + address.slice(-4)}</div></> :
                                <>ADDRESS <div>-</div></>
                            }
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                            TOTAL CMPOW 
                            <div>{Number(allPower).toLocaleString('en-US', {maximumFractionDigits:0})} [land multiplier x{Number(landBonus)}]</div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                            REWARD BALANCE
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreigld4xmmrmu763t2vsju3tqhcodgxxsrmgvrlfhdjktgujgcmpmde" height="20" alt="$SIL"/>
                                <div style={{marginLeft: "5px"}}>{Number(silBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                            REWARD PENDING
                            <div style={{display: "flex", flexDirection: "row", color: timeToRunout !== 0 && timeToRunout !== null  ? "#ff007a" : "#5f6476"}}>
                                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreigld4xmmrmu763t2vsju3tqhcodgxxsrmgvrlfhdjktgujgcmpmde" height="20" alt="$SIL"/>
                                <div style={{marginLeft: "5px"}}>{Number(rewardPending).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                            GAS USAGE
                            <div style={{display: "flex", flexDirection: "row"}}>
                                {ss === 1 &&
                                    <>
                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi" height="20" alt="$DOIJIB"/>
                                        <div style={{marginLeft: "5px"}}>{Number(doijibBalance).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </>
                                }
                                <div style={{marginLeft: "5px"}}>/700,000</div>
                            </div>
                        </div>
                        {isStakeNow ?
                            <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>GAS RUN OUT AT <div>{timeToRunout}</div></div>
                            : <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>GAS RUN OUT IN <div>7 day</div></div>
                        }
                        {address !== undefined && address === youraddr ?
                            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                {isStakeNow ?
                                    <>
                                        <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                        <div style={{alignSelf: "center", background: isRunout ? "#67BAA7" : "#ff007a"}} className="button" onClick={() => unstakeNft(0, false)}>HARVEST & UNSTAKE</div>
                                    </> :
                                    <>
                                        {isStakeNow !== null && (ss === 1 && Number(doijibBalance) >= 700000) ?
                                            <>
                                                {allPower !== 0 ?
                                                    <div style={{alignSelf: "center"}} className="button" onClick={refuelStake}>REFUEL GAS</div> :
                                                    <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                }
                                            </> :
                                            <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                        }
                                        <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST & UNSTAKE</div>
                                    </>
                                }
                            </div> :
                            <div style={{height: "41px"}}></div>
                        }
                    </div>
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                        {accSlot !== null ?
                            <img src={accSlot} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/accessories.png" width="100px" alt="Can not load metadata." />
                        }
                        {accSlotLevel !== null && <div style={{position: "absolute", top: "85px", right: "30px", padding: "2px", fontSize: "25px"}}>+{accSlotLevel}</div>}
                        {accSlot2 !== null ?
                            <img src={accSlot2} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/accessories.png" width="100px" alt="Can not load metadata." />
                        }
                        {accSlot2Level !== null && <div style={{position: "absolute", top: "237.5px", right: "30px", padding: "2px", fontSize: "25px"}}>+{accSlot2Level}</div> }
                        {accSlot3 !== null ?
                            <img src={accSlot3} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/accessories.png" width="100px" alt="Can not load metadata." />
                        }
                        {accSlot3Level !== null && <div style={{position: "absolute", top: "385px", right: "30px", padding: "2px", fontSize: "25px"}}>+{accSlot3Level}</div>}
                    </div>
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                        {hatSlot !== null ?
                            <img src={hatSlot} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/hat.png" width="100px" alt="Can not load metadata." />
                        }
                        {hatSlotLevel !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px", fontSize: "25px"}}>+{hatSlotLevel}</div>}
                        {clothSlot !== null ?
                            <img src={clothSlot} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/cloth.png" width="100px" alt="Can not load metadata." />
                        }
                        {clothSlotLevel !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px", fontSize: "25px"}}>+{clothSlotLevel}</div>}
                        {shoesSlot !== null ?
                            <img src={shoesSlot} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/shoes.png" width="100px" alt="Can not load metadata." />
                        }
                        {shoesSlotLevel !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px", fontSize: "25px"}}>+{shoesSlotLevel}</div>}
                    </div>
                    <div style={{position: "relative", width: "300px", height: "450px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                        <div style={{position: "relative", width: "300px", height: "150px", padding: "0 20px 20px 20px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
                            {soulSlot !== null ?
                                <img src={soulSlot} width="100px" alt="Can not load metadata." /> :
                                <div style={{width: "100px", height: "100px", borderRadius: "16px", border: "1px solid gray"}}></div>
                            }
                            {soulSlotLevel !== null && <div style={{position: "absolute", top: "85px", right: "200px", padding: "2px", fontSize: "25px"}}>+{soulSlotLevel}</div>}
                            {badgeSlot !== null ?
                                <img src={badgeSlot} width="100px" alt="Can not load metadata." /> :
                                <div style={{width: "100px", height: "100px", borderRadius: "16px", border: "1px solid gray"}}></div>
                            }
                            {badgeSlotLevel !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px", fontSize: "25px"}}>+{badgeSlotLevel}</div>}
                        </div>
                        {nft.length > 0 ?
                            <>
                                {characterSlot !== null ?
                                    <>
                                        {(Number(skinSlot1) === 0 || (characterSlot !== "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia4kwbvcyynfxu77fpguwoogfqqe45kktalxylnad4wivnhqjtt2m" && characterSlot !== "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidr4uq5voosuz6v4hqhiempf4a36x5aq6i4uceym2xbje65o5mwia")) &&
                                            <img src={characterSlot} width="300px" alt="Can not load metadata." />
                                        }
                                        {characterSlot === "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia4kwbvcyynfxu77fpguwoogfqqe45kktalxylnad4wivnhqjtt2m" && Number(String(skinSlot1).slice(0, 1)) === 1 &&
                                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibynd6gqsb7idmhy7xk5qx5cdzmayvns7gfj7dsvpfymg2kjjajtm" width="300px" alt="Can not load metadata." />
                                        }
                                        {characterSlot === "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidr4uq5voosuz6v4hqhiempf4a36x5aq6i4uceym2xbje65o5mwia" && Number(String(skinSlot1).slice(0, 1)) === 1 &&
                                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif5fecf5rqrlixcxtpzplo7frtftt3yh2cmx6oca4l2jxuryjju2m" width="300px" alt="Can not load metadata." />
                                        }
                                    </> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                }
                            </> :
                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <ThreeDots fill="#5f6476" />
                            </div>
                        }
                        {characterSlotLevel !== null && <div style={{position: "absolute", bottom: "15px", right: "20px", padding: "2px", fontSize: "25px", color: "#000"}}>Lv.{characterSlotLevel}</div>}
                        {/*isOp && isStakeNow && !lastedSTOPT && isRunout &&
                            <div style={{position: "absolute", top: "300px", left: 0, border: "1px solid rgb(70, 55, 169)", boxShadow: "6px 6px 0 #00000040", borderRadius: 0, background: "rgb(103, 186, 167)"}} className="button" onClick={mintStOPT}>Obtain stOPT <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibtp4almzmdovhvygxeyykw5fa6pqe76cbdum4quispehlddqgp2e" height="18" alt="$stOPT"/></div>
                        */}
                    </div>
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                        {accSlot4 !== null ?
                            <img src={accSlot4} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/accessories.png" width="100px" alt="Can not load metadata." />
                        }
                        {accSlot4Level !== null && <div style={{position: "absolute", top: "85px", right: "35px", padding: "2px", fontSize: "25px"}}>+{accSlot4Level}</div>}
                        {backSlot !== null ?
                            <img src={backSlot} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/back.png" width="100px" alt="Can not load metadata." />
                        }
                        {backSlotLevel !== null && <div style={{position: "absolute", top: "237.5px", right: "35px", fontSize: "25px"}}>+{backSlotLevel}</div>}
                        {weaponSlot !== null ?
                            <img src={weaponSlot} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/weapon.png" width="100px" alt="Can not load metadata." />
                        }
                        {wpSlotLevel !== null && <div style={{position: "absolute", top: "385px", right: "35px", padding: "2px", fontSize: "25px"}}>+{wpSlotLevel}</div>}
                    </div>
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                        {accSlot5 !== null ?
                            <img src={accSlot5} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/accessories.png" width="100px" alt="Can not load metadata." />
                        }
                        {accSlot5Level !== null && <div style={{position: "absolute", top: "85px", right: "35px", padding: "2px", fontSize: "25px"}}>+{accSlot5Level}</div>}
                        {accSlot6 !== null ?
                            <img src={accSlot6} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/accessories.png" width="100px" alt="Can not load metadata." />
                        }
                        {accSlot6Level !== null && <div style={{position: "absolute", top: "237.5px", right: "35px", padding: "2px", fontSize: "25px"}}>+{accSlot6Level}</div>}
                        {weaponSlot2 !== null ?
                            <img src={weaponSlot2} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/weapon.png" width="100px" alt="Can not load metadata." />
                        }
                        {wpSlot2Level !== null && <div style={{position: "absolute", top: "385px", right: "35px", padding: "2px", fontSize: "25px"}}>+{wpSlot2Level}</div>}
                    </div>
                </div>
            </div>

            {<div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", overflow: "scroll"}} className="pixel mainprofile">
                <div style={{background: "none rgba(255, 255, 255, 0.1)", backdropFilter: "blur(14px)", boxShadow: "none", border: 0, justifyContent: "space-around", padding: "30px", width: "1140px", height: "fit-content", marginBottom: "100px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                    <div style={{background: "#2f1a52", color: "#fff", width: "370px", height: "360px", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", boxShadow: "3px 3px 0 #0d0a1f"}}>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                            <div style={{fontSize: "22px", lineHeight: "15px"}}>L2 MEME STAKING SS 1<br></br><br></br>D.O.M. THE DOI OLYMPUS MAFIA</div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                            TOTAL CMPOW
                            <div style={{display: "flex", flexDirection: "row"}}>{ss === 1 && yourSS1CMPOW}</div>
                        </div>
                        <div style={{height: "160px", width: "100%", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", textAlign: "center", letterSpacing: 1}} className="bold">
                            <div style={{width: "100%", margin: "20px 0 10px 0", textAlign: "left", letterSpacing: 0.5, fontSize: "10px"}} className="light">Fulfill all slots to win this season badge. Season will end within 28 + 7 days.</div>
                            <div style={{width: "100px", height: "100px", borderRadius: "16px", border: "1px solid gray"}}></div>
                        </div>
                    </div>
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                        {ss === 1 && 
                            <>
                                {ss1HatSlot !== null ?
                                    <img src={ss1HatSlot} width="100px" alt="Can not load metadata." /> :
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmSgooLEbo2MrxT3rNzFKq1fGkweGZJhV2ejPhKpAgoSWr" width="100px" alt="Can not load metadata." />
                                }
                                {ss1HatSlotLevel !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px", fontSize: "25px"}}>+{ss1HatSlotLevel}</div>}
                                {ss1ClothSlot !== null ?
                                    <img src={ss1ClothSlot} width="100px" alt="Can not load metadata." /> :
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmPY9gNNpai3UGtx8jSsohn3scvsioJM7AvmQLbFnBjvwq" width="100px" alt="Can not load metadata." />
                                }
                                {ss1ClothSlotLevel !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px", fontSize: "25px"}}>+{ss1ClothSlotLevel}</div>}
                                {ss1ShoesSlot !== null ?
                                    <img src={ss1ShoesSlot} width="100px" alt="" /> :
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmT4aYAh5veaM7fawV4MbufZBGWKFcJ4QmXdzNqmHYMxXk" width="100px" alt="Can not load metadata." />
                                }
                                {ss1ShoesSlotLevel !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px", fontSize: "25px"}}>+{ss1ShoesSlotLevel}</div>}
                            </>
                        }
                    </div>
                    <div style={{position: "relative", width: "300px", height: "400px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                        <div style={{width: "300px", height: "65px"}}></div>
                        {nft.length > 0 ?
                            <>
                                {(ss === 1 && ss1CharacterSlot !== null) ?
                                    <img src={ss1CharacterSlot} width="300px" alt="Can not load metadata." /> :
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmViHN4xqFWr9x9t4q1QGMNanm3f7u2fBD6PU9x4ZKdyzk" width="300px" alt="Can not load metadata." />
                                }
                            </> :
                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <ThreeDots fill="#5f6476" />
                            </div>
                        }
                        {ss1CharacterSlotLevel !== null && <div style={{position: "absolute", bottom: "40px", right: "10px", padding: "2px", fontSize: "25px", color: "#000"}}>Lv.{ss1CharacterSlotLevel}</div>}
                    </div>
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                        {ss === 1 && 
                            <>
                                {ss1AccSlot !== null ?
                                    <img src={ss1AccSlot} width="100px" alt="Can not load metadata." /> :
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYYCgcgbqdh59kuyuXSxWom7igRYqPnXLY4DNjL3mJpY8" width="100px" alt="Can not load metadata." />
                                }
                                {ss1BackSlot !== null ?
                                    <img src={ss1BackSlot} width="100px" alt="Can not load metadata." /> :
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmRFpQsLUgJPjgXXBeREddUVAEcyJwzqG79VJ7BeYd8LSj" width="100px" alt="Can not load metadata." />
                                }
                                {ss1BackSlotLevel !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", fontSize: "25px"}}>+{ss1BackSlotLevel}</div> }
                                {ss1WeaponSlot !== null ?
                                    <img src={ss1WeaponSlot} width="100px" alt="Can not load metadata." /> :
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmRKTx7BpuUicaecf4bKYSroAvedLGw3mncWAHHSfLszJc" width="100px" alt="Can not load metadata." />
                                }
                                {ss1WpSlotLevel !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px", fontSize: "25px"}}>+{ss1WpSlotLevel}</div>}
                            </>
                        }
                    </div>
                </div>
            </div>}
            
            {nft.length > 0 ?
                <div style={{marginTop: "40px", width: "1650px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "wrap"}}>
                    {nft[0] !== null ?
                        <>
                        {nft.map((item, index) => (
                            <>
                                {((item.Col === 1 && item.Id / 100000000000 <= 8) || 
                                (ss === 1 && 
                                    (
                                        (item.Col === 2 && 
                                            (
                                                (Number(item.Id) >= 700000118800 && Number(item.Id) <= 700025018800) || 
                                                (Number(item.Id) >= 500000118800 && Number(item.Id) <= 500025018800)
                                            )
                                        ) || 
                                        (item.Col === 3 && 
                                            (Number(item.Id) >= 100000001 && Number(item.Id) <= 100001000)
                                        )
                                    )
                                )) &&
                                    <div style={{background: "#2f1a52", boxShadow: "none", border: 0, color: "#fff", justifyContent: "space-around", padding: "20px", margin: "10px", height: "500px"}} className="nftCard" key={index}>
                                        <div style={{width: "150px", height: "150px", display: "flex", justifyContent: "center", overflow: "hidden"}}>
                                            <img src={item.Image} height="100%" alt="Can not load metadata." />
                                        </div>
                                        <div className="emp bold">{item.Name}</div>
                                        <div className="bold">{item.RewardPerSec} cmpow per sec</div>
                                        <div style={{fontSize: "12px", textAlign: "left", wordBreak: "break-word"}} className="light">{item.Description}</div>
                                        {address === youraddr ?
                                            <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap"}}>
                                                {item.isStaked ?
                                                    <>
                                                        {item.Col === 1 && 
                                                            <div style={{background: "gray"}} className="pixel button" onClick={() => unstakeNft(item.Slot, false)}>UNEQUIP L1</div>
                                                        }
                                                        {(ss === 1 &&
                                                            (
                                                                (item.Col === 1 && 
                                                                    (
                                                                        (Number(item.Id) >= 102000108000 && Number(item.Id) <= 102033308000) || 
                                                                        (Number(item.Id) >= 220010810800 && Number(item.Id) <= 220020910800) || 
                                                                        (Number(item.Id) >= 300010100600 && Number(item.Id) <= 300054800600) || 
                                                                        (Number(item.Id) >= 612000102550 && Number(item.Id) <= 612025600250)
                                                                    )
                                                                ) || 
                                                                item.Col === 2 || 
                                                                item.Col === 3
                                                            )
                                                        ) &&
                                                            <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => unstakeNft(item.Slot, true)}>UNEQUIP L2 SS1</div>
                                                        }
                                                    </> :
                                                    <>
                                                        {item.Col === 1 && 
                                                            <>
                                                                {((item.Id / 100000000000) | 0) === 1 && 
                                                                    <>
                                                                        <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Id, 1, false)}>EQUIP L1 MAIN CHAR</div>
                                                                        <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Id, 15, false)}>EQUIP L1 SOUL</div>
                                                                    </>
                                                                }
                                                                {((item.Id / 100000000000) | 0) === 2 && <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Id, 2, false)}>EQUIP L1 HAT</div>}
                                                                {((item.Id / 100000000000) | 0) === 3 && <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Id, 3, false)}>EQUIP L1 CLOTH</div>}
                                                                {((item.Id / 100000000000) | 0) === 4 && 
                                                                    <>
                                                                        <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Id, 4, false)}>EQUIP L1 ACC (1)</div>
                                                                        <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Id, 9, false)}>EQUIP L1 ACC (2)</div>
                                                                        <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Id, 10, false)}>EQUIP L1 ACC (3)</div>
                                                                        <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Id, 11, false)}>EQUIP L1 ACC (4)</div>
                                                                        <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Id, 12, false)}>EQUIP L1 ACC (5)</div>
                                                                        <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Id, 13, false)}>EQUIP L1 ACC (6)</div>
                                                                    </>
                                                                }
                                                                {((item.Id / 100000000000) | 0) === 5 && <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Id, 5, false)}>EQUIP L1 BACK</div>}
                                                                {((item.Id / 100000000000) | 0) === 6 && <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Id, 6, false)}>EQUIP L1 SHOES</div>}
                                                                {((item.Id / 100000000000) | 0) === 7 && 
                                                                    <>
                                                                        <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Id, 7, false)}>EQUIP L1 WEAPON (1)</div>
                                                                        <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Id, 14, false)}>EQUIP L1 WEAPON (2)</div>
                                                                    </>
                                                                }
                                                                {((item.Id / 100000000000) | 0) === 8 && <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Id, 8, false)}>EQUIP L1 BADGE</div>}
                                                            </>
                                                        }
                                                        {(ss === 1 && item.Col === 1 && (Number(item.Id) >= 102000108000 && Number(item.Id) <= 102033308000)) && <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Id, 1, true)}>EQUIP L2 SS1 MAIN CHAR</div>}
                                                        {(ss === 1 && item.Col === 1 && (Number(item.Id) >= 220010810800 && Number(item.Id) <= 220020910800)) && <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Id, 2, true)}>EQUIP L2 SS1 HAT</div>}
                                                        {(ss === 1 && item.Col === 1 && (Number(item.Id) >= 300010100600 && Number(item.Id) <= 300054800600)) && <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Id, 3, true)}>EQUIP L2 SS1 CLOTH</div>}
                                                        {(ss === 1 && item.Col === 3 && (Number(item.Id) >= 100000001 && Number(item.Id) <= 100001000)) && <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Id, 4, true)}>EQUIP L2 SS1 ACC</div>}
                                                        {(ss === 1 && item.Col === 2 && (Number(item.Id) >= 500000118800 && Number(item.Id) <= 500025072800)) && <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Id, 5, true)}>EQUIP L2 SS1 BACK</div>}
                                                        {(ss === 1 && item.Col === 1 && (Number(item.Id) >= 612000102550 && Number(item.Id) <= 612025601000)) && <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Id, 6, true)}>EQUIP L2 SS1 SHOES</div>}
                                                        {(ss === 1 && item.Col === 2 && (Number(item.Id) >= 700000118800 && Number(item.Id) <= 700025072800)) && <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Id, 7, true)}>EQUIP L2 SS1 WEAPON</div>}
                                                        <div style={{alignSelf: "center", background: "gray", marginTop: "5px"}} className="pixel button" onClick={() => transferNFT(item.Col, item.Id)}>TRANSFER</div>
                                                    </>
                                                }
                                            </div> :
                                            <div style={{height: "41px"}}></div>
                                        }
                                    </div>
                                }
                            </>
                        ))}
                        </> :
                        <div style={{background: "#2f1a52", boxShadow: "none", border: 0, color: "#fff", justifyContent: "center", padding: "20px", margin: "10px", height: "500px"}} className="nftCard">
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
                </div> :
                <div style={{marginTop: "40px", width: "1640px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", height: "500px"}}> 
                    <div className="nftCard" style={{background: "#2f1a52", boxShadow: "none", border: 0, color: "#fff", justifyContent: "center"}}>
                        <ThreeDots fill="#fff" />
                        <div className="bold" style={{marginTop: "80px"}}>Loading NFTs...</div>
                    </div>
                </div>
            }
        </div>
    </>
    )
}

export default Memeticorbit