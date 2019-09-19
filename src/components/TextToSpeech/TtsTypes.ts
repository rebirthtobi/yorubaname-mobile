export interface TtsContextProps {
    hasChecked: boolean;
    isTtsSupported: boolean;
    speak: (name: string) => () => void;
}
