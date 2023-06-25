import { View, TouchableOpacity, ScrollView, Text, Image } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import * as SecureStore from 'expo-secure-store';
import { Link, useRouter } from 'expo-router';

import Icon from '@expo/vector-icons/Feather'
import Logo from '../src/assets/nlw-spacetime-logo.svg';




export default function Memories() {

    const { bottom, top } = useSafeAreaInsets();
    const router = useRouter();

    async function signOut() {

        await SecureStore.deleteItemAsync('token');
        router.push('/');
    }


    return (
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}>
            {/*===========HEADER=========== */}
            <View className="flex-row mt-4 items-center justify-between px-4">
                <Logo />
                <View className="flex-row gap-4">
                    <Link href="/new" asChild>
                        <TouchableOpacity className="h-11 w-11 items-center justify-center rounded-full bg-green-500">
                            <Icon name="plus" size={16} color="#000" />
                        </TouchableOpacity>
                    </Link>
                    <TouchableOpacity className="h-11 w-11 items-center justify-center rounded-full bg-red-500" onPress={signOut}>
                        <Icon name="log-out" size={16} color="#000" />
                    </TouchableOpacity>
                </View>

            </View>

            <View className="mt-6 space-y-10">
                <View className="space-y-4">
                    <View className="flex-row items-center gap-2">
                        <View className="h-px w-5 bg-gray-50"/>
                        <Text className="font-body text-xs text-gray-100">12 de Abril de 2023</Text>
                    </View>
                    <View className="space-y-4 px-8">
                        <Image
                            className="aspect-video w-full rounded-lg"
                            source={{ uri: "http://192.168.1.115:3333/uploads/aaf83bad-6c34-447f-a1b3-f8d9ad5412e2.jpg" }}
                            alt="" />
                        <Text className="font-body text-base leading-relaxed text-gray-100">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium autem at asperiores,
                            porro explicabo iste laborum eum quos officiis error amet placeat sunt similique
                            consequuntur perferendis aliquid unde eos nulla.
                        </Text>
                        <Link href="/memories/id" asChild>
                            <TouchableOpacity className="flex-row items-center gap-2">
                                <Text className="font-body text-sm text-gray-200">Ler mais</Text>
                                <Icon name="arrow-right" size={16} color="#9e9ea0" />
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </View>
        </ScrollView >
    )
}