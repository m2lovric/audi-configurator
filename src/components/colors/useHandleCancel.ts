import React from 'react';
import { visibleAtom, visibleAtomA } from '@/../modules/state';
import { useRecoilState } from 'recoil';

const useHandleCancel = () => {
  const [visible, setVisible] = useRecoilState(visibleAtom);
  const [visibleA, setVisibleA] = useRecoilState(visibleAtomA);

  const handleCancel = () => {
    setVisible({ ...visible, colors: false });
    setVisibleA({ ...visibleA, colors: false });
  };
  return [handleCancel];
};

export default useHandleCancel;
