import { Model } from '@/modules/interfaces/model';
import {
  colorsAtom,
  interiorAtom,
  selectModelAtom,
  userConfigurationAtom,
  wheelsAtom,
} from '@/modules/state';
import { useRecoilState } from 'recoil';

const useUpdate = () => {
  const [selectModels, setSelectModels] =
    useRecoilState<Model[]>(selectModelAtom);
  const [selectedValues, setSelectedValues] = useRecoilState(
    userConfigurationAtom
  );
  const [colorsState, setColorState] = useRecoilState(colorsAtom);
  const [wheelsState, setWheelsState] = useRecoilState(wheelsAtom);
  const [interiorState, setInteriorState] = useRecoilState(interiorAtom);

  const handleUpdate = (data: any) => {
    console.log(data.model);
    const car = selectModels.filter(
      (el) => el.model == data.model.split(' ')[1]
    )[0];

    setSelectedValues({
      ...selectedValues,
      fullName: data.model,
      model: data.model.split(' ')[1],
      accessories: {
        color: { ...car.default.color },
        interior: { ...car.default.interior },
        wheel: { ...car.default.wheels },
      },
      price: car.price,
    });
    setColorState([]);
    setWheelsState([]);
    setInteriorState([]);
  };
  return [handleUpdate];
};

export default useUpdate;
