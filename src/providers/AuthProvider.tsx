import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";


type AuthData = {
    session: Session | null;
    loading: boolean;
};

const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
});

export default function AuthProvider({ children }: PropsWithChildren) {

    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the user ssession from Supabase
        const fetchSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
            setLoading(false);
        }

        fetchSession();
    }, []);
 
    return <AuthContext.Provider value={{session, loading}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);