import { styled } from "nativewind";
import { ImageBackground } from "react-native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

// ASSETS
import blurBg from '../src/assets/bg-blur.png';
import Stripes from '../src/assets/stripes.svg';

// FONTS
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_100Thin } from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree';




const StyledStripes = styled(Stripes);


export default function Layout() {

    const [hasLoadedFonts] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        BaiJamjuree_700Bold,
    });

    if (!hasLoadedFonts) {
        return <SplashScreen />;
    }


    return (
        <ImageBackground
            source={blurBg}
            className="relative bg-gray-900 flex-1"
            imageStyle={{ position: "absolute", left: "-50%" }}
        >
            <StyledStripes className="absolute left-2" />
            <StatusBar style="light" translucent />
            <Stack 
                screenOptions={
                                { 
                                    headerShown: false,  
                                    contentStyle: { backgroundColor: "transparent" }
                                }
                              }/>
        </ImageBackground>
    )
}