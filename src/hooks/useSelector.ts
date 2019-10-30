import * as i from 'types';
import { useSelector as ReduxUseSelector, TypedUseSelectorHook } from 'react-redux';

export const useSelector: TypedUseSelectorHook<i.ReduxState> = ReduxUseSelector;
