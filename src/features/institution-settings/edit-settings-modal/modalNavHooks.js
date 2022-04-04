import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import modalReducer, {
  openModal,
} from '../../../app/common/modals/modalReducer';

export default function ModalNavHook() {
  const dispatch = useDispatch();
  const { typeParam } = useParams();
  const { modalOpen } = useSelector((state) => state.modal);
  console.log('modal nav hook got type param: ' + typeParam);
  //   if (!typeParam || typeParam.length === 0) {
  //   dispatch(closeModal());
  // } else
  if (
    typeParam &&
    ['logo', 'academic', 'enduser'].includes(typeParam) & !modalOpen
  ) {
    console.log('typeparam: ' + typeParam);
    dispatch(
      openModal({
        modalCategory: 'EditSettingsModal',
        modalProps: {
          type: typeParam,
        },
      })
    );
  }
}
