import { visibleInteriorAtom } from '@/modules/state';
import { useRecoilState } from 'recoil';

const useHandleCancel = () => {
  const [visibleInterior, setVisibleInterior] =
    useRecoilState(visibleInteriorAtom);

  const handleCancel = () => {
    setVisibleInterior(false);
  };
  return [handleCancel];
};

export default useHandleCancel;
