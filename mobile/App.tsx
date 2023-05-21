import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_100Thin } from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree';

import blurBg from './src/assets/bg-blur.png';
import Stripes from './src/assets/stripes.svg';
import Logo from './src/assets/nlw-spacetime-logo.svg';

import { styled } from 'nativewind';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { useEffect } from 'react';
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/5f12a2c88b4762c41881',
};


const StyledStripes = styled(Stripes);

export default function App() {

  const [request, response, signInWithGithub] = useAuthRequest(
    {
      clientId: '5f12a2c88b4762c41881',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime'
      }),
    },
    discovery
  );


  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;

      console.log(code);
    }
  }, [response]);

  
  if (!hasLoadedFonts) {
    return null;
  }

  

  return (
    <ImageBackground 
      source={blurBg} 
      className="relative px-8 py-10 bg-gray-900 flex-1 items-center"
      imageStyle={{ position: "absolute", left: "-50%"}}
    >
      <StyledStripes className="absolute left-1"/>
      <View className="flex-1 items items-center justify-center gap-6">
        <Logo/>
        <View className="space-y-2">
          <Text className="text-gray-50 font-title text-2xl text-center leading-tight">Sua cápsula do tempo</Text>
          <Text className="text-gray-100 font-body text-base text-center leading-relaxed">Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!</Text>
        </View>
        <TouchableOpacity 
          className="bg-green-500 px-5 py-3 rounded-full" 
          activeOpacity={0.7} 
          onPress={() => signInWithGithub()}>
          <Text className="font-alt text-sm text-black ">COMEÇAR A CADASTRAR</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>

      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}
