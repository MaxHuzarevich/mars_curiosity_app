import {Image, Modal, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Picker} from "@react-native-picker/picker";
import {StatusBar} from "expo-status-bar";
import DatePicker from 'react-native-modern-datepicker';
import React, {useState} from "react";
import {useFonts} from "expo-font";
import PhotoPage from "./photoPage";


export const styles = StyleSheet.create({
    container: {
        display: 'inline-flex',
        minHeight: 812,
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 375,
        backgroundColor: '#DCCEBE'
    },
    navbar: {
        maxWidth: 375,
        height: 88,
        paddingTop: 42,
        paddingRight: 56,
        paddingBottom: 0,
        paddingLeft: 56,
        display: 'flex',
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
    formWrapper: {
        marginTop: 167,
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 16,
    },
    input: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 7
    },
    legend: {
        fontFamily: 'dosis-400',
        color: `#000`,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    viewPicker: {
        width: 327,
        height: 60,
        borderRadius: 10,
        opacity: 0.5,
        backgroundColor: '#FFF'
    },
    viewDate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 327,
        height: 60,
        borderRadius: 10,
        opacity: 0.5,
        backgroundColor: '#FFF'
    },
    button: {
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 40,
        backgroundColor: '#BF2E0E',
        width: 327,
        height: 60,
        flexShrink: 0
    },
    titleButton: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 18,
        letterSpacing: 0.36,
        fontFamily: 'dosis-600'
    },
    imageCalendar: {
        marginRight: 12
    },
    dateText: {
        marginLeft: 12,
        color: '#000',
        fontFamily: 'dosis-400',
        fontSize: 18,
        letterSpacing: 0.36
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    imageCuriosity: {
        minWidth: 523,
        maxHeight: 346
    }
})

export default function HomePage({camera, changeCamera, date, changeDate, fetchPhotos, navigation}) {

    const [open, setOpen] = useState(false);

    const handleOnPress = () => {
        setOpen(!open)
    };
    const setCamera = (itemValue) => {
        changeCamera(itemValue);
    };
    const setDate = (propDate) => {
        changeDate(propDate.replace(/\//g, "-"));
    };
    const getPhotos = () => {
        fetchPhotos();
        navigation.navigate('second')
    };
    const [fontsLoaded] = useFonts({
        'dosis-200': require('./assets/fonts/Dosis-ExtraLight.ttf'),
        'dosis-400': require('./assets/fonts/Dosis-Regular.ttf'),
        'dosis-600': require('./assets/fonts/Dosis-SemiBold.ttf'),
    });
    if (!fontsLoaded) {
        return null;
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <View style={styles.titleNavbarWrapper}>
                        <Text style={styles.titleNavbar}>
                            Select Camera and Date
                        </Text>
                    </View>
                </View>
                <View style={styles.formWrapper}>
                    <View style={styles.input}>
                        <Text style={styles.legend}>Rover Camera</Text>
                        <View style={styles.viewPicker}>
                            <Picker
                                selectedValue={camera}
                                onValueChange={setCamera}
                            >
                                <Picker.Item label='Front Hazard Avoidance Camera (FHAZ)' value={"FHAZ"}/>
                                <Picker.Item label='Rear Hazard Avoidance Camera (RHAZ)' value={"RHAZ"}/>
                                <Picker.Item label='Mast Camera (MAST)' value={"MAST"}/>
                                <Picker.Item label='Chemistry and Camera Complex (CHEMCAM)' value={"CHEMCAM"}/>
                                <Picker.Item label='Mars Hand Lens Imager (MAHLI)' value={"MAHLI"}/>
                                <Picker.Item label='Mars Descent Imager (MARDI)' value={"MARDI"}/>
                                <Picker.Item label='Navigation Camera (NAVCAM)' value={"NAVCAM"}/>
                            </Picker>
                        </View>
                    </View>
                    <View marginTop={16} style={styles.input}>
                        <Text style={styles.legend}>Date</Text>
                        <View style={styles.viewDate}>
                            <Text style={styles.dateText}>
                                {date}
                            </Text>
                            <Pressable onPress={handleOnPress}>
                                <Image style={styles.imageCalendar} source={require('./calendar.png')}/>
                            </Pressable>
                            <Modal
                                animationType='slide'
                                transparent={true}
                                visible={open}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <DatePicker
                                            mode='calendar'
                                            selected={date}
                                            onDateChange={setDate}
                                        />
                                        <Pressable onPress={handleOnPress}>
                                            <Image source={require('./close.png')}/>
                                        </Pressable>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    </View>
                    <Pressable onPress={getPhotos} style={styles.button}>
                        <Text style={styles.titleButton}>
                            Explore
                        </Text>
                    </Pressable>
                </View>
                <Image style={styles.imageCuriosity} source={require('./curiosity.png')}/>
            </View>
            <StatusBar style='auto'/>
        </ScrollView>
    );
}
