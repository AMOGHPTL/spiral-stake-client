import { useEffect, useState } from "react";

import PoolFactory from "../contract-hooks/PoolFactory";
import { Ybt } from "../types";
import Loader from "../components/low-level/Loader";

import YbtDropdown from "../components/low-level/YbtDropdown";
import tokenIcon from "../assets/icons/GroupDark.svg";
import PageTitle from "../components/low-level/PageTitle";

const Pools = ({ ybts, poolFactory }: { ybts: Ybt[]; poolFactory: PoolFactory | undefined }) => {
  const [selectedYbt, setSelectedYbt] = useState<Ybt>();
  const [ybtPoolAddresses, setYbtPoolAddresses] = useState<Record<string, string[]>>();

  useEffect(() => {
    if (!poolFactory || ybts.length === 0) return;

    const fetchPoolAddresses = async () => {
      const _ybtPoolAddresses: Record<string, string[]> = {};

      const _allPoolAddresses = await Promise.all(
        ybts.map((ybt) => poolFactory.getSpiralPoolsForSYToken(ybt.syToken.address))
      );

      _allPoolAddresses.forEach((ybtPoolAddresses, index) => {
        _ybtPoolAddresses[ybts[index].symbol] = ybtPoolAddresses;
      });

      setYbtPoolAddresses(_ybtPoolAddresses);
    };

    fetchPoolAddresses();
  }, [poolFactory]);

  const handleYbtChange = (_ybt: Ybt | undefined) => {
    setSelectedYbt(_ybt);
  };

  return (
    <div className="">
      <div className="py-16">
        <PageTitle
          title={"Spiral Pools"}
          subheading={`Stake your frxETH in fast, transparent pools and earn passive rewards.
Secure, flexible, and low entry—start with just 0.10 frxETH! `}
        />
      </div>
      {ybtPoolAddresses ? (
        <div className="h-fit">
          {ybts.map((ybt: Ybt) => (
            <YbtDropdown
              key={ybt.symbol}
              ybt={ybt}
              selectedYbt={selectedYbt}
              tagMsg={`${ybtPoolAddresses[ybt.symbol].length} Pools`}
              tokenIcon={tokenIcon}
              poolAddresses={ybtPoolAddresses[ybt.symbol]}
              handleYbtChange={handleYbtChange}
            />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Pools;
