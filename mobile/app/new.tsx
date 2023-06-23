import { useState } from 'react';
import { View, Text, Switch, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
 
import Icon from '@expo/vector-icons/Feather'
import Logo from '../src/assets/nlw-spacetime-logo.svg';



export default function NewMemory() {

    const { bottom, top } = useSafeAreaInsets();
    const [isPublic, setIsPublic] = useState(false);

    return (
        <ScrollView className="flex-1 px-8" contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}>
            {/*===========HEADER=========== */}
            <View className="flex-row mt-4 items-center justify-between">
                <Logo/>
                <Link href="/memories" asChild>
                    <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
                        <Icon name="arrow-left" size={16} color="#FFF"/>
                    </TouchableOpacity>
                </Link>
            </View>
            {/*===========SWITCH AND PHOTO PICKER=========== */}
            <View className="mt-6 space-y-6">
                <View className="flex-row items-center gap-2">
                    <Switch
                        value={isPublic} 
                        onValueChange={setIsPublic}
                        trackColor={{ false: '#767577', true: '#372560'}}
                        thumbColor={isPublic ? '#9b79ea' : '#9e9ea0'}
                    />
                    <Text className="font-body text-lg text-gray-200">
                        Tornar memória pública
                    </Text>
                </View>
                <TouchableOpacity 
                    className="h-32 justify-center items-center rounded-lg border border-dashed border-gray-500" 
                    activeOpacity={0.7}
                >
                    <View className="flex-row items-center gap-2">
                        <Icon name="image" color="#FFF"/>
                        <Text className="font-body text-sm text-gray-200">
                            Adicionar foto ou vídeo de capa
                        </Text>
                    </View>
                </TouchableOpacity>
                <TextInput 
                    multiline 
                    className="p-0 font-body text-lg text-gray-50"
                    placeholderTextColor="#56565a"
                    placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre"
                    textAlignVertical="top"
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="items-center self-end rounded-full bg-green-500 px-5 py-2"
                >
                    <Text className="font-alt text-sm uppercase text-black">
                        Salvar
                    </Text>
                </TouchableOpacity>
            
            </View>
        </ScrollView>
    )
}