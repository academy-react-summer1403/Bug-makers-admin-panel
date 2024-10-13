import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserLocation } from '../../../redux/userSlice';
import { Button } from 'reactstrap';

const customIcon = new L.Icon({
  iconUrl: '../../../assets/images/icons/map.png', 
  iconSize: [25, 41], 
  iconAnchor: [12, 41],
  popupAnchor: [1, -34], 
});

const LocationPicker = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.selectUser);

  const [location, setLocation] = useState({
    id: user?.id || null,
    fName: user?.fName || null,
    lName: user?.lName || null,
    userName: user?.userName || null,
    gmail: user?.gmail || null,
    phoneNumber: user?.phoneNumber || null,
    active: user?.active ? true : false,
    isDelete: user?.isDelete || false,
    isTecher: user?.isTecher || false,
    isStudent: user?.isStudent || false,
    recoveryEmail: user?.recoveryEmail || null,
    userAbout: user?.userAbout || null,
    telegramLink: user?.telegramLink || null,
    homeAdderess: user?.homeAdderess || null,
    nationalCode: user?.nationalCode || null,
    gender: user?.gender || false,
    latitude: parseFloat(user?.latitude) || 35.6892,
    longitude: parseFloat(user?.longitude) || 51.3890,
    insertDate: user?.insertDate || null,
    birthDay: user?.birthDay || null,
  });

  useEffect(() => {
    if (user) {
      setLocation({
        id: user.id,
        fName: user.fName || null,
        lName: user.lName || null,
        userName: user.userName || null,
        gmail: user.gmail || null,
        phoneNumber: user.phoneNumber || null,
        active: user.active ? true : false,
        isDelete: user.isDelete || false,
        isTecher: user.isTecher || false,
        isStudent: user.isStudent || false,
        recoveryEmail: user.recoveryEmail || null,
        userAbout: user.userAbout || null,
        telegramLink: user.telegramLink || null,
        homeAdderess: user.homeAdderess || null,
        nationalCode: user.nationalCode || null,
        gender: user.gender || false,
        latitude: parseFloat(user.latitude) || 35.6892,
        longitude: parseFloat(user.longitude) || 51.3890,
        insertDate: user.insertDate || null,
        birthDay: user.birthDay || null,
      });
    }
  }, [user]);

  const handleLocationChange = (latlng) => {
    setLocation((prevLocation) => ({
      ...prevLocation,
      latitude: latlng.lat,
      longitude: latlng.lng,
    }));
  };

  const handleSaveLocation = () => {
    if (location.id) {
      const params = {
        ...location,
        latitude: location.latitude.toString(),
        longitude: location.longitude.toString(),
      };
      dispatch(updateUserLocation(params));
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        handleLocationChange(e.latlng);
      },
    });

    return location ? (
      <Marker position={[location.latitude, location.longitude]} icon={customIcon} />
    ) : null;
  };

  return (
    <div>
      <h3>موقعیت مکانی خود را انتخاب کنید</h3>
      <MapContainer
        center={[location.latitude, location.longitude]}
        zoom={13}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
      <div style={{ marginTop: '10px' }}>
        <Button color='primary' onClick={handleSaveLocation}>ذخیره موقعیت مکانی</Button>
      </div>
    </div>
  );
};

export default LocationPicker;
