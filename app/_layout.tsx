import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";


function RouteGuard({children}: {children: React.ReactNode}) {
  const router = useRouter();
  const {user, isLoadingUser} = useAuth();
  const segments = useSegments();
    const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate initialization or wait until layout mounts
    setIsReady(true);
  }, []);



  useEffect(() => {
    const inAuthGroup = segments[0] === "auth"

    if (!user && isReady && !inAuthGroup && !isLoadingUser) {
     // Redirect to auth screen or show login modal
     router.replace("/auth")
  } else if (user && isReady && inAuthGroup && !isLoadingUser) {
    // If the user is authenticated and tries to access the auth group, redirect to home
    router.replace("/");
  }
}, [user, isReady, router, segments]);
      return <>{children}</>;
 

  }

  


export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
    <AuthProvider>
      <SafeAreaProvider>
        <RouteGuard>
          <Stack >
            <Stack.Screen name="(tabs)" options={{ headerShown :false }} />
          </Stack>
        </RouteGuard>
      </SafeAreaProvider>
    </AuthProvider>
    </GestureHandlerRootView>
    );
}
