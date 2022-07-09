import { auth } from 'modules/firebase';
import { userStateAtom } from 'modules/state';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userDataAtom } from './userData';

const useHandleSubmit = () => {
  const [data, setData] = useRecoilState(userDataAtom);
  const [userData, setUserData] = useRecoilState(userStateAtom);
  const navigate = useNavigate();

  const handleSubmit = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        const user = res.user;
        updateProfile(user, { displayName: data.name });
        setData({ name: '', email: '', password: '' });
        setUserData(true);
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  };

  return [handleSubmit];
};

export default useHandleSubmit;
