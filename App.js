import {getFormatedDate} from "react-native-modern-datepicker";
import React, {useState} from 'react';
import axios from "axios";
import PhotosPage from "./photosPage";
import HomePage from "./homePage";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import PhotoPage from "./photoPage";

const Stack = createStackNavigator();

export default function App() {
    const today = new Date();
    const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY-MM-DD');
    const [date, setDate] = useState(startDate);
    const [photos, setPhotos] = useState([]);
    const [camera, setCamera] = useState('fhaz');
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const handleSelectPhoto = (photo) => {
        setSelectedPhoto(photo);
    };

    const changeCamera = (itemValue) => {
        setCamera(itemValue)
    };

    const changeDate = (propDate) => {
        setDate(propDate)
    }

    const fetchPhotos = async () => {
        const apiKey = 'DEMO_KEY';
        const url =
            `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&camera=${camera}&api_key=${apiKey}`;
        try {
            const response = await axios.get(url);
            setPhotos(response.data.photos)
        } catch (e) {
            console.error(e)
        }
    };

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }} initialRouteName='first'>
                <Stack.Screen name='first'>
                    {(props) => <HomePage
                        {...props}
                        camera={camera}
                        changeCamera={changeCamera}
                        date={date}
                        changeDate={changeDate}
                        fetchPhotos={fetchPhotos}
                        photos={photos}
                    />}
                </Stack.Screen>
                <Stack.Screen name='second'>
                    {(props) => <PhotosPage
                        {...props}
                        onSelectPhoto={handleSelectPhoto}
                        camera={camera}
                        date={date}
                        photos={photos}
                    />}
                </Stack.Screen>
                <Stack.Screen name='third'>
                    {(props) => <PhotoPage
                        selectedPhoto={selectedPhoto}
                        {...props}
                    />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

