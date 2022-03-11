import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { getAuth } from "firebase/auth";

export { RouteGuard };

function RouteGuard({ children }) {

    console.log("calling route guard");
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    const authCheck = useCallback((url) => {
        // redirect to login page if accessing a private page and not logged in 
        const publicPaths = ['/logIn', '/forgotPassword', '/signUp'];
        const path = url.split('?')[0];

        const auth = getAuth();
        const user = auth.currentUser;

        if (user == null && !publicPaths.includes(path)) {
            console.log("not logged in ")
            // No user is signed in.
            router.push({
                pathname: '/logIn',
                query: { returnUrl: router.asPath }
            });
        } else {
            console.log("authorized!")
            setAuthorized(true);
        }
    }, [router])
    useEffect(() => {
        authCheck(router.asPath);
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }
    }, [authCheck, router.asPath, router.events]);

    return authorized && <div>{children}</div>
}