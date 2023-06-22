import { Text, TouchableOpacity, View } from 'react-native';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store'
import { useRouter } from 'expo-router'
import { useEffect } from 'react';

import Logo from '../src/assets/nlw-spacetime-logo.svg';
import { api } from '../src/lib/api';

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/5f12a2c88b4762c41881',
};

export default function App() {

  const router = useRouter();

  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: '5f12a2c88b4762c41881',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime'
      }),
    },
    discovery,
  );

  async function handleGitHubOAuthCode(code: string) {
    const response = await api.post("/register", {
      code,
    })

    const { token } = response.data;

    await SecureStore.setItemAsync("token", token)

    router.push('/memories')

  }

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;

      handleGitHubOAuthCode(code);

    }
  }, [response]);





  return (
    <View className="px-8 py-10 flex-1 items-center" >
      <View className="flex-1 items items-center justify-center gap-6">
        <Logo />
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
    </View>
  )
}
