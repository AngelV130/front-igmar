interface User {
    id: number;
    name: string;
    email: string;
    rol: string;
}
interface SesionContextType {
    user: User | null | undefined;
    verifyToken: () => void;
    loading: boolean;
}