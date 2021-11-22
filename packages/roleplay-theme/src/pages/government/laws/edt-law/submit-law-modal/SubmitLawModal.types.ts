export interface SubmitLawModalProps {
  onSubmit(): Promise<void>;
  skipCheck: boolean;
}
