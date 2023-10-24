import React from 'react'
import { ethers } from 'ethers'
import { useParams, useNavigate } from 'react-router-dom'
import Headbar from './Headbar'

import Fields from './Fields'
import FieldsAncientForrest from './Fields-AncientForrest'
import FishingField from './Fields-TunaLake'
import RatHuntingField from './Fields-OldWarehouse'
import Labs from './Labs'
import Dungeon from './Dungeon'
import Npcblacksmith from './Dungeon-Blacksmith'
import NpcEvolutionary from './Dungeon-Evolutionary'
import Coppermine from './Dungeon-CopperMine'
import Jaspercave from './Dungeon-JasperCave'
import Community from './Community'
import CmCityCenter from './Community-CmCityCenter'
import QuesterOasis from './Community-QuesterOasis'
import DungeonArena from './Community-DungeonArena'
import DumpsterHill from './Community-DumpsterHill'
import Mall from './Mall'
import Mkp from  './Mkp'
import GameSwap from  './GameSwap'

import { jbcL1 } from './chains/jbcL1.ts'
import { erc20ABI, erc721ABI } from 'wagmi'
import aurora721ABI from './jsons/aurora721ABI.json'
import tunaFieldABI from './jsons/tunaFieldABI.json'
import woodFieldABI from './jsons/woodFieldABI.json'

import kycABI from './jsons/kycABI.json'
import ctunaLabABI from './jsons/ctunaLabABI.json'
import sx31LabABI from './jsons/sx31LabABI.json'
import bbqLab01ABI from './jsons/bbqLab01ABI.json'
import bbqLab02ABI from './jsons/bbqLab02ABI.json'
import pzaLabABI from './jsons/pzaLabABI.json'

import dunJasperABI from './jsons/dunJasperABI.json'
import dunJasperL2ABI from './jsons/dunJasperL2ABI.json'
import dunCopperABI from './jsons/dunCopperABI.json'
import mintStOPTABI from './jsons/mintStOPTABI.json'

import cmdaoMerchantABI from './jsons/cmdaoMerchantABI.json'
import cmdaoMerchantV2ABI from './jsons/cmdaoMerchantV2ABI.json'
import cmdaoMerchantKYCABI from './jsons/cmdaoMerchantKYCABI.json'
import cmdaoGasha02ABI from './jsons/cmdaoGasha02ABI.json'
import cmdaoMkpABI from './jsons/cmdaoMkpABI.json'
import ammyABI from './jsons/ammyABI.json'
import ammyStdABI from './jsons/ammyStdABI.json'
import enchantNABI from './jsons/enchantNABI.json'
import enchantRABI from './jsons/enchantRABI.json'
import osABI from './jsons/osABI.json'
import evolutionaryABI from './jsons/evolutionaryABI.json'
import fusionABI from './jsons/fusionABI.json'
import salonABI from './jsons/salonABI.json'
import starterCMDSABI from './jsons/starterCMDSABI.json'
import uplevelCMDSABI from './jsons/uplevelCMDSABI.json'
import sx31voteABI from './jsons/sx31voteABI.json'
import faucetABI from './jsons/faucetABI.json'
import pvp01ABI from './jsons/pvp01ABI.json'
import quest01ABI from './jsons/quest01ABI.json'
import questAmbassABI from './jsons/questAmbassABI.json'
import questBBQABI from './jsons/questBBQABI.json'
import dumpster1ABI from './jsons/dumpster1ABI.json'
import dumpster2ABI from './jsons/dumpster2ABI.json'

import exchangeABI from './jsons/exchangeABI.json'
import exchangeJulpABI from './jsons/exchangeJulpABI.json'
import swapABI from './jsons/swapcallABI.json'
import swapJulpABI from './jsons/swapcallJulpABI.json'
import farmJdaoABI from './jsons/masterchefJdaoABI.json'
import bkcOracleABI from './jsons/bkcOracleABI.json'

import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const providerBKC = new ethers.getDefaultProvider('https://rpc.bitkubchain.io')

const Main = () => {
    const { chains, provider } = configureChains(
        [jbcL1],
        [publicProvider()]
    )

    const client = createClient({
        autoConnect: true,
        connectors: [
            new MetaMaskConnector({ chains }),
        ],
        provider
    })

    const navigate = useNavigate()
    const { modeText, subModeText, intrasubModetext } = useParams()
    let preset = 0
    if (modeText !== undefined) {
        if (modeText.toUpperCase() === "FIELDS") {
            if (subModeText !== undefined) {
                if (modeText.toUpperCase() === "FIELDS" && subModeText.toUpperCase() === "TUNA-LAKE") {
                    preset = 11
                    document.title = "Tuna Lake | CommuDAO"
                } else if (modeText.toUpperCase() === "FIELDS" && subModeText.toUpperCase() === "OLD-WAREHOUSE") {
                    preset = 12
                    document.title = "Old Warehouse | CommuDAO"
                } else if (modeText.toUpperCase() === "FIELDS" && subModeText.toUpperCase() === "ANCIENT-FORREST") {
                    preset = 13
                    document.title = "Ancient Forrest | CommuDAO"
                }
            } else {
                preset = 1
                document.title = "Fields | CommuDAO"
            }
        } else if (modeText.toUpperCase() === "LABS") {
            preset = 2
            document.title = "Labs | CommuDAO"
        } else if (modeText.toUpperCase() === "DUNGEON") {
            if (subModeText !== undefined) {
                if (modeText.toUpperCase() === "DUNGEON" && subModeText.toUpperCase() === "JASPER-CAVE") {
                    preset = 31
                    document.title = "Jasper Cave | CommuDAO"
                } else if (modeText.toUpperCase() === "DUNGEON" && subModeText.toUpperCase() === "COPPER-MINE") {
                    preset = 33
                    document.title = "Copper Mine | CommuDAO"
                } else if (modeText.toUpperCase() === "DUNGEON" && subModeText.toUpperCase() === "BLACKSMITH-HOUSE") {
                    preset = 32
                    document.title = "Blacksmith House | CommuDAO"
                } else if (modeText.toUpperCase() === "DUNGEON" && subModeText.toUpperCase() === "EVOLUTIONARY-PLANET") {
                    preset = 34
                    document.title = "Evotionary Planet | CommuDAO"
                }
            } else {
                preset = 3
                document.title = "Dungeon | CommuDAO"
            }
        } else if (modeText.toUpperCase() === "COMMUNITY") {
            if (subModeText !== undefined) {
                if (modeText.toUpperCase() === "COMMUNITY" && subModeText.toUpperCase() === "CMCITY-CITYCENTER") {
                    preset = 41
                    document.title = "CM City - City Center | CommuDAO"
                } else if (modeText.toUpperCase() === "COMMUNITY" && subModeText.toUpperCase() === "DUNGEON-ARENA") {
                    preset = 42
                    document.title = "Dungeon Arena | CommuDAO"
                } else if (modeText.toUpperCase() === "COMMUNITY" && subModeText.toUpperCase() === "DUMPSTER-HILL") {
                    preset = 43
                    document.title = "Dumpster Hill | CommuDAO"
                } else if (modeText.toUpperCase() === "COMMUNITY" && subModeText.toUpperCase() === "QUESTER-OASIS") {
                    preset = 44
                    document.title = "Quester Oasis | CommuDAO"
                }
            } else {
                preset = 4
                document.title = "Community | CommuDAO"
            }
        } else if (modeText.toUpperCase() === "MALL") {
            preset = 5
            document.title = "Mall | CommuDAO"
        } else if (modeText.toUpperCase() === "MARKETPLACE") {
            preset = 6
            document.title = "Marketplace | CommuDAO"
        } else if (modeText.toUpperCase() === "GAMESWAP") {
            preset = 7
            document.title = "GameSwap | CommuDAO"
        } else {
            preset = null
            document.title = "404 | CommuDAO"
        }
    } else {
        document.title = "Home | CommuDAO"
    }

    const [mode, setMode] = React.useState(preset) 
    const callMode = (_mode) => { setMode(_mode) }

    const [isLoading, setisLoading] = React.useState(false)
    const [txupdate, setTxupdate] = React.useState(null)

    const [tvl, setTVL] = React.useState(0)

    React.useEffect(() => {
        const thefetch = async () => {
            const oracleTHB = new ethers.Contract("0x4A6947323A1c14Cf69Dd128A2cf854364239d044", bkcOracleABI, providerBKC)
            const usdtToTHB = await oracleTHB.latestAnswer()
            const kusdt = new ethers.Contract("0x7d984C24d2499D840eB3b7016077164e15E5faA6", erc20ABI, providerBKC)
            const Balance = await kusdt.balanceOf("0x8622049edEcC20ADA5aDEeaf2Caa53447e68Ae63")
            
            return [
                ((ethers.utils.formatEther(usdtToTHB) * (10**10) * ethers.utils.formatEther(Balance)).toFixed(0))
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
            setTVL("฿ " + Number(result[0]).toLocaleString())
        })
    }, [])

  return (
    <>
        {isLoading === true ?
            <div className="centermodal">
                <div className="wrapper">
                    <div className="bold" style={{fontSize: "40px", letterSpacing: "3px"}}>LOADING...</div>
                </div>
            </div> :
            <></>
        }
        <WagmiConfig client={client}>
            <Headbar callMode={callMode} navigate={navigate} txupdate={txupdate} erc20ABI={erc20ABI} />
            {mode === 0 ?
                <div style={{width: "95%", overflow: "scroll", padding: "50px 0", textAlign: "left", fontSize: "16px"}} className="collection noscroll welcome pixel">
                    <div className="welcomeText">
                        <div style={{letterSpacing: "1px", color: "#000"}} className="motto">Collect, Play, Build<br></br>on <span className="emp">CommuDAO</span></div>
                        <div style={{marginTop: "20px"}}>The Web3 Multiverse of Crypto-community is now ALPHA on JBC L1!</div>
                        <div style={{minWidth: "500px", height: "80px", marginTop: "30px", border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f", background: "linear-gradient(139.73deg,#e5fdff,#f3efff)", flexDirection: "column"}} className="items">
                            <div style={{fontSize: "28px", color: "#4637a9", letterSpacing: "1px"}} className="bold">{tvl}</div>
                            <div style={{fontSize: "12px", marginTop: "5px"}}>Total Value Locked on Ecosystem</div>
                        </div>
                        <div style={{marginTop: "20px"}}>Explore the world of CommuDAO</div>
                        <div style={{margin: "20px 0", width: "500px", maxWidth: "90%", display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}}>
                            <div className="emp hashtag" onClick={() => {callMode(13); navigate('/fields/ancient-forrest');}}>
                                <img src="/../items/wood.png" height="20" alt="$WOOD"/>
                                &nbsp;Ancient Forest
                            </div>
                            <div className="emp pixel hashtag" onClick={() => {callMode(11); navigate('/fields/tuna-lake');}}>
                                <img src="/../items/tuna.png" height="20" alt="$TUNA"/>
                                &nbsp;Tuna Lake
                            </div>
                            <div className="emp pixel hashtag" onClick={() => {callMode(12); navigate('/fields/old-warehouse');}}>
                                <img src="/../items/mice.png" height="20" alt="$MICE"/>
                                &nbsp;Old Warehouse
                            </div>
                            <div className="emp pixel hashtag" onClick={() => {callMode(33); navigate('/dungeons/copper-mine');}}>
                                <img src="/../items/copper.png" height="20" alt="$COPPER"/>
                                &nbsp;Copper Mine
                            </div>
                            <div className="emp pixel hashtag" onClick={() => {callMode(31); navigate('/dungeons/jasper-cave');}}>
                                <img src="/../items/jasper.png" height="20" alt="$JASPER"/>
                                &nbsp;Jasper Cave
                            </div>
                        </div>
                    </div>
                    <div style={{background: "linear-gradient(139.73deg,#e5fdff,#f3efff)", width: "500px", height: "fit-content", margin: 0, padding: 0, overflow: "hidden"}} className="nftCard">
                        <img src="https://bafybeidmedlvbae3t7gffvgakbulid4zpr7eqenx2rdsbbvkb6ol3xplpq.ipfs.nftstorage.link/23.png" width="100%" alt="NFT_GENESIS" />
                        <div style={{width: "90%", height: "fit-content", margin: "15px 0"}}>The Genesis NFT -- "CM Hexa Cat Meaw JIB JIB"</div>
                    </div>
                </div> :
                <></>
            }
            {mode === 1 ?
                <Fields callMode={callMode} navigate={navigate} /> :
                <></>
            }
            {mode === 11 ?
                <FishingField setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} aurora721ABI={aurora721ABI} tunaFieldABI={tunaFieldABI} /> :
                <></>
            }
            {mode === 12 ?
                <RatHuntingField setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} aurora721ABI={aurora721ABI} tunaFieldABI={tunaFieldABI} /> :
                <></>
            }
            {mode === 13 ?
                <FieldsAncientForrest setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} erc721ABI={erc721ABI} aurora721ABI={aurora721ABI} starterCMDSABI={starterCMDSABI} uplevelCMDSABI={uplevelCMDSABI} woodFieldABI={woodFieldABI} /> :
                <></>
            }
            {mode === 2 ?
                <Labs setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} ctunaLabABI={ctunaLabABI} sx31LabABI={sx31LabABI} bbqLab01ABI={bbqLab01ABI} bbqLab02ABI={bbqLab02ABI} pzaLabABI={pzaLabABI} erc20ABI={erc20ABI} kycABI={kycABI} /> :
                <></>
            }
            {mode === 3 ?
                <Dungeon callMode={callMode} navigate={navigate} /> :
                <></>
            }
            {mode === 33 ?
                <Coppermine intrasubModetext={intrasubModetext} navigate={navigate} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} erc721ABI={erc721ABI} erc20ABI={erc20ABI} dunCopperABI={dunCopperABI} mintStOPTABI={mintStOPTABI} salonABI={salonABI} /> :
                <></>
            }
            {mode === 31 ?
                <Jaspercave intrasubModetext={intrasubModetext} navigate={navigate} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} erc721ABI={erc721ABI} erc20ABI={erc20ABI} dunJasperABI={dunJasperABI} dunJasperL2ABI={dunJasperL2ABI} mintStOPTABI={mintStOPTABI} salonABI={salonABI} /> :
                <></>
            }
            {mode === 32 ?
                <Npcblacksmith setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} enchantNABI={enchantNABI} enchantRABI={enchantRABI} osABI={osABI} erc721ABI={erc721ABI} erc20ABI={erc20ABI} /> :
                <></>
            }
            {mode === 34 ?
                <NpcEvolutionary setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} evolutionaryABI={evolutionaryABI} fusionABI={fusionABI} salonABI={salonABI} erc721ABI={erc721ABI} erc20ABI={erc20ABI} /> :
                <></>
            }
            {mode === 4 ?
                <Community callMode={callMode} navigate={navigate} /> :
                <></>
            }
            {mode === 41 ?
                <CmCityCenter setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} erc20ABI={erc20ABI} sx31voteABI={sx31voteABI} faucetABI={faucetABI} /> :
                <></>
            }
            {mode === 42 ?
                <DungeonArena navigate={navigate} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} erc20ABI={erc20ABI} erc721ABI={erc721ABI} questAmbassABI={questAmbassABI} dunJasperABI={dunJasperABI} pvp01ABI={pvp01ABI} salonABI={salonABI} /> :
                <></>
            }
            {mode === 43 ?
                <DumpsterHill navigate={navigate} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} erc20ABI={erc20ABI} erc721ABI={erc721ABI} dumpster1ABI={dumpster1ABI} dumpster2ABI={dumpster2ABI} /> :
                <></>
            }
            {mode === 44 ?
                <QuesterOasis setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} erc20ABI={erc20ABI} kycABI={kycABI} quest01ABI={quest01ABI} pvp01ABI={pvp01ABI} questBBQABI={questBBQABI} questAmbassABI={questAmbassABI} bbqLab01ABI={bbqLab01ABI} dunCopperABI={dunCopperABI} dunJasperABI={dunJasperABI} /> :
                <></>
            }
            {mode === 5 ?
                <Mall setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} kycABI={kycABI} ctunaLabABI={ctunaLabABI} cmdaoMerchantABI={cmdaoMerchantABI} cmdaoMerchantV2ABI={cmdaoMerchantV2ABI} cmdaoMerchantKYCABI={cmdaoMerchantKYCABI} cmdaoGasha02ABI={cmdaoGasha02ABI} ammyABI={ammyABI} ammyStdABI={ammyStdABI} erc20ABI={erc20ABI} /> :
                <></>
            }
            {mode === 6 ?
                <Mkp setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} erc721ABI={erc721ABI} erc20ABI={erc20ABI} cmdaoMkpABI={cmdaoMkpABI} /> :
                <></>
            }
            {mode === 7 ?
                <GameSwap setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} erc20ABI={erc20ABI} exchangeABI={exchangeABI} exchangeJulpABI={exchangeJulpABI} farmJdaoABI={farmJdaoABI} swapABI={swapABI} swapJulpABI={swapJulpABI} bkcOracleABI={bkcOracleABI} /> :
                <></>
            }
            {mode === null ?
                <div style={{paddingTop: "100px"}} className="collection">
                    <div className="nftCard" style={{justifyContent: "center"}}>
                        <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-database"></i>
                        <div className="emp bold">404 not found</div>
                    </div>
                </div> :
                <></>
            }
        </WagmiConfig>
        <footer style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <div className="inFooterLeft">
                <div style={{marginBottom: "10px"}}>© CommuDAO 2023 - Alpha</div>
                <a style={{marginBottom: "10px", color: "#5f6476", textDecoration: "none"}} href="https://docs.commudao.xyz" target="_blank" rel="noreferrer">Docs</a>
                <a style={{color: "#5f6476", textDecoration: "none"}} href="https://github.com/coshi-labs/CommuDAO" target="_blank" rel="noreferrer">Github</a>
            </div>
            <div className="inFooterRight">
                <a style={{marginBottom: "10px", color: "#5f6476", textDecoration: "none"}} href="https://zealy.io/c/commudao/questboard" target="_blank" rel="noreferrer">Quests on Zealy</a>
                <a style={{color: "#5f6476", textDecoration: "none"}} href="https://discord.gg/k92ReT5EYy" target="_blank" rel="noreferrer">Discord</a>
            </div>
        </footer>
    </>
  )
}

export default Main