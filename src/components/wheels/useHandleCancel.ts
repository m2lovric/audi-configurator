import { visibleAtom, visibleAtomA } from '@/modules/state';
import { useRecoilState } from 'recoil';

const useHandleCancel = () => {
  const [visible, setVisible] = useRecoilState(visibleAtom);
  const [visibleA, setVisibleA] = useRecoilState(visibleAtomA);

  const handleCancel = () => {
    setVisible({ ...visible, wheels: false });
    setVisibleA({ ...visibleA, wheels: false });
  };
  return [handleCancel];
};

export default useHandleCancel;
