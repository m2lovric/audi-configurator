import React from 'react';
import { totalPriceAtom, userConfigurationAtom } from '@/../modules/state';
import { useRecoilState } from 'recoil';

const useColorChange = () => {
  const [selectedValues, setSelectedValues] = useRecoilState(
    userConfigurationAtom
  );

  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceAtom);

  const onColorChange = (el: { name: string; url: string; price: number }) => {
    const currentColorPrice = selectedValues.accessories.color.price;
    setSelectedValues({
      ...selectedValues,
      accessories: {
        ...selectedValues.accessories,
        color: { name: el.name, price: el.price },
      },
    });

    setTotalPrice(totalPrice - currentColorPrice + el.price);
  };

  return [onColorChange];
};

export default useColorChange;
