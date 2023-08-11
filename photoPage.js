import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";

const styles = StyleSheet.create({
    container: {
        display: 'inline-flex',
        minHeight: 812,
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 375,
        backgroundColor: '#000',
        gap: 16
    },
    navbar: {
        maxWidth: 375,
        height: 88,
        paddingTop: 42,
        paddingRight: 56,
        paddingLeft: 56,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0
    },
    titleNavbarWrapper: {
        display: 'flex',
        width: 263,
        height: 46,
        flexDirection: 'column',
        justifyContent: 'center',
        flexShrink: 0,
    },
    titleNavbar: {
        fontWeight: '600',
        fontFamily: 'dosis-600',
        textAlign: 'center',
        fontSize: 18,
        fontStyle: 'normal',
        lineHeight: 22,
        color: '#FFF'
    },
    id: {
        fontWeight: '400',
        fontFamily: 'dosis-400',
        textAlign: 'center',
        fontSize: 13,
        fontStyle: 'normal',
        lineHeight: 22,
        color: '#FFF'
    },
    backLeft: {
        width: 24,
        height: 24,
        marginRight: 16,
    },
    share: {
        width: 24,
        height: 24,
        marginLeft: 16
    },
    photo: {
        width: 343,
        height: 674,
        borderRadius: 8,
        backgroundColor: 'white',
    }
})

export default function PhotoPage({navigation, selectedPhoto}) {

    const backToPhotosPage = () => {
        navigation.goBack();
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <Pressable onPress={backToPhotosPage}>
                        <Image style={styles.backLeft} source={require('./backInPhotoComponent.png')}/>
                    </Pressable>
                    <View style={styles.titleNavbarWrapper}>
                        <Text style={styles.titleNavbar}>
                            PhotoID
                        </Text>
                        <Text style={styles.id}>
                            {selectedPhoto.id}
                        </Text>
                    </View>
                    <Pressable>
                        <Image style={styles.share} source={require('./share.png')}/>
                    </Pressable>
                </View>
                {selectedPhoto && (
                    <Image source={{uri: selectedPhoto.img_src}} style={styles.photo}/>)
                }
            </View>
        </ScrollView>
    );
}
