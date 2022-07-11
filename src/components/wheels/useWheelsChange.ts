import React from 'react';
import { totalPriceAtom, userConfigurationAtom } from '@/../modules/state';
import { useRecoilState } from 'recoil';

const useWheelsChange = () => {
  const [selectedValues, setSelectedValues] = useRecoilState(
    userConfigurationAtom
  );

  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceAtom);

  const onWheelChange = (el: { name: string; url: string; price: number }) => {
    const currentWheelPrice = selectedValues.accessories.wheel.price;
    setSelectedValues({
      ...selectedValues,
      accessories: {
        ...selectedValues.accessories,
        wheel: { name: el.name.split(' ')[1], price: el.price },
      },
    });

    setTotalPrice(totalPrice - currentWheelPrice + el.price);
  };

  return [onWheelChange];
};

export default useWheelsChange;
