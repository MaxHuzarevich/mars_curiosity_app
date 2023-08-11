import {Image, Pressable, ScrollView, Text, View, StyleSheet, TouchableOpacity, FlatList} from "react-native";

const styles = StyleSheet.create({
    container: {
        display: 'inline-flex',
        minHeight: 812,
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 375,
        backgroundColor: '#DCCEBE',
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
        flexShrink: 0
    },
    titleNavbar: {
        fontWeight: '600',
        fontFamily: 'dosis-600',
        color: '#000',
        textAlign: 'center',
        fontSize: 18,
        fontStyle: 'normal',
        lineHeight: 22
    },
    date: {
        fontWeight: '400',
        fontFamily: 'dosis-400',
        color: '#000',
        textAlign: 'center',
        fontSize: 13,
        fontStyle: 'normal',
        lineHeight: 22
    },
    backLeft: {
        width: 24,
        height: 24,
        marginRight: 16,
    },
    backRight: {
        width: 24,
        height: 24,
        marginLeft: 16
    },
    photosWrapper: {
        margin: 16,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        gap: 8
    },
    photo: {
        display: 'flex',
        width: 109,
        height: 109,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default function PhotosPage({camera, date, photos, navigation, onSelectPhoto}) {
    const backToHomePage = () => {
        navigation.goBack()
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <Pressable onPress={backToHomePage}>
                        <Image style={styles.backLeft} source={require('./back.png')}/>
                    </Pressable>
                    <View style={styles.titleNavbarWrapper}>
                        <Text style={styles.titleNavbar}>
                            {camera}
                        </Text>
                        <Text style={styles.date}>
                            {date}
                        </Text>
                    </View>
                    <Pressable>
                        <Image style={styles.backRight}/>
                    </Pressable>
                </View>
                <View style={styles.photosWrapper}>
                    {photos.map((image) => (
                        <TouchableOpacity
                            key={image.id}
                            onPress={() => {
                                onSelectPhoto(image)
                                navigation.navigate('third')
                            }}
                        >
                            <Image
                                source={{uri: image.img_src}}
                                style={styles.photo}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScrollView>
    )
}
