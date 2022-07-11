import React from 'react';
import { totalPriceAtom, userConfigurationAtom } from '@/../modules/state';
import { useRecoilState } from 'recoil';

const useInteriorChange = () => {
  const [selectedValues, setSelectedValues] = useRecoilState(
    userConfigurationAtom
  );

  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceAtom);

  const onInteriorChange = (el: {
    name: string;
    url: string;
    price: number;
  }) => {
    const currentInteriorPrice = selectedValues.accessories.interior.price;
    setSelectedValues({
      ...selectedValues,
      accessories: {
        ...selectedValues.accessories,
        interior: { name: el.name, price: el.price },
      },
    });

    setTotalPrice(totalPrice - currentInteriorPrice + el.price);
  };

  return [onInteriorChange];
};

export default useInteriorChange;
