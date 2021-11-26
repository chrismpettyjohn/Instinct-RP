import {ReactNode} from 'react';

export interface EditModalProps {
  header: ReactNode;
  children: ReactNode;
  onSubmit(): Promise<void>;
}
