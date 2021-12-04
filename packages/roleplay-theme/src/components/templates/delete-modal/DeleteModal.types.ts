import {ReactNode} from 'react';

export interface DeleteModalProps {
  header: ReactNode;
  children: ReactNode;
  onDelete(): Promise<void>;
}
