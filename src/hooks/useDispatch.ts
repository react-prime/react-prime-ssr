import * as i from 'types';
import { useDispatch as useReduxDispatch } from 'react-redux';

export function useDispatch(): i.ThunkDispatch {
  return useReduxDispatch<i.ThunkDispatch>();
}
