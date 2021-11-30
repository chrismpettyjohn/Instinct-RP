import {createContext} from 'react';
import {
  BusinessEditorContext,
  defaultBusinessEditorContext,
} from './BusinessEditor.types';

export const businessEditorContext = createContext<BusinessEditorContext>(
  defaultBusinessEditorContext
);
