import { visibleAtom } from '@/modules/state';
import { useRecoilState } from 'recoil';

const useHandleCancel = () => {
  const [visible, setVisible] = useRecoilState(visibleAtom);

  const handleCancel = () => {
    setVisible({ ...visible, colors: false });
  };
  return [handleCancel];
};

export default useHandleCancel;
