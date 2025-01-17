import React from 'react';
import { ethers } from 'ethers';
import LootAvatar from '../loot';
import useWalletProvider, { PROVIDER } from '../web3-wallet/wallet-provider';
import network from '../web3-wallet/network';
import { simpleAdress } from '../web3-wallet/connect-wallet';
import Modal from '../web3-wallet/modal';

export default function JoinResult({ onClose }) {
  const { address, provider } = useWalletProvider({ network });
  const [providers, setProviders] = React.useState<ethers.providers.Web3Provider>();
  const [showAirdropModal, setShowAirdropModal] = React.useState(false);

  const closeModal = React.useCallback(() => {
    setShowAirdropModal(false);
  }, [null]);

  const showModal = React.useCallback(() => {
    setShowAirdropModal(true);
  }, [null]);

  React.useEffect(() => {
    if (!address) return;

    if (provider === PROVIDER.METAMASK) {
      // @ts-ignore
      setProviders(new ethers.providers.Web3Provider(window.ethereum));
    }
  }, [address, provider]);

  const shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `I have claimed my #loot avatar passport that is qualified to win #NFT airdrops and have fun at #ShanghaiMetaverseWeek @NFT4Metaverse`,
  )}`;

  return (
    <div className="pt-24 fixed w-screen h-screen top-0	left-0 bg-black z-10 overflow-auto">
      <div className="flex flex-col justify-center items-center pb-10">
        <div className="absolute right-4 top-10 text-white border px-2 py-1">
          {simpleAdress(address, 6, 4)}
        </div>
        <div
          onClick={onClose}
          className="absolute left-4 top-10 text-white border px-2 py-1 cursor-pointer"
        >
          Close
        </div>
        <div className="text-white text-2xl	fonts-times-new-roman ">Congrats! </div>
        <div className="text-white text-2xl	fonts-times-new-roman">here’s your M7E passport</div>

        <div className="mt-14">
          <LootAvatar address={address} providers={providers} />
          <div className="text-gray-400 text-right mt-1">
            powered by{' '}
            <a href="https://twitter.com/stephancill" className="underline">
              @stephancill
            </a>
          </div>
        </div>

        <button className="h-14 w-60 px-4 py-2 bg-white text-black mb-4 mt-10 sm:mt-20">
          set as <span className="underline">Dataverse</span> avatar 👀
        </button>
        <button className="h-14 w-60 px-4 py-2 bg-white text-black mb-4" onClick={showModal}>
          get airdrop 🦄
        </button>
        <a
          href={shareLink}
          target="_blank"
          className="h-14 w-60 px-4 py-2 bg-white text-black flex items-center justify-center"
        >
          share 🕺
        </a>
      </div>

      <Modal visible={showAirdropModal} onClose={closeModal}>
        <div className="mt-10">
          <a
            href="https://twitter.com/intent/follow?screen_name=goatnftio"
            target="_blank"
            className="hover:text-gray-200 mb-4 h-14 w-64 px-4 py-2 bg-black text-white flex items-center justify-center"
          >
            Follow GOATNFT on twitter
          </a>
          <a
            href="https://twitter.com/intent/follow?screen_name=imTokenOfficial"
            target="_blank"
            className="hover:text-gray-200 mb-4 h-14 w-64 px-4 py-2 bg-black text-white flex items-center justify-center"
          >
            Follow imToken on twitter
          </a>
          <a
            href="https://twitter.com/intent/follow?screen_name=OwnershipLabs"
            target="_blank"
            className="hover:text-gray-200 mb-4 h-14 w-64 px-4 py-2 bg-black text-white flex items-center justify-center"
          >
            Follow DataVerse on twitter
          </a>
          <a
            href="https://twitter.com/intent/follow?screen_name=NFT4Metaverse"
            target="_blank"
            className="hover:text-gray-200 mb-4 h-14 w-64 px-4 py-2 bg-black text-white flex items-center justify-center"
          >
            Follow NFT4Metaverse on twitter
          </a>
        </div>
      </Modal>
    </div>
  );
}
